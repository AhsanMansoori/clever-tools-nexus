import { useState, useCallback, useRef } from "react";
import { FileText, X, Loader2, Sparkles, Shield, CheckCircle2, Eye, Download, ArrowLeft, FileDown, Columns, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import mammoth from "mammoth";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  convertInchesToTwip,
  Header,
  Footer,
  PageNumber,
} from "docx";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

interface FormattingRules {
  fontFamily: string;
  fontSize: string;
  headingStyles: {
    h1: { fontSize: string; fontWeight: string; alignment: string };
    h2: { fontSize: string; fontWeight: string; alignment: string };
    h3: { fontSize: string; fontWeight: string; alignment: string };
    h4: { fontSize: string; fontWeight: string; alignment: string };
  };
  paragraphSpacing: string;
  lineSpacing: string;
  alignment: string;
  margins: { top: string; right: string; bottom: string; left: string };
  indentation: string;
  citationStyle?: string;
}

const WordFormatterTool = () => {
  const [mainDocument, setMainDocument] = useState<UploadedFile | null>(null);
  const [requirementFile, setRequirementFile] = useState<UploadedFile | null>(null);
  const [formattingInstructions, setFormattingInstructions] = useState("");
  const [isDragOverMain, setIsDragOverMain] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [isDragOverReq, setIsDragOverReq] = useState(false);

  // Preview mode state
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState<string>("");
  const [originalContent, setOriginalContent] = useState<string>("");
  const [previewRules, setPreviewRules] = useState<FormattingRules | null>(null);
  const [previewSummary, setPreviewSummary] = useState<string>("");
  const [comparisonView, setComparisonView] = useState<'side-by-side' | 'formatted-only'>('side-by-side');
  const previewBlobRef = useRef<Blob | null>(null);

  // TOC options
  const [tocEnabled, setTocEnabled] = useState(false);
  const [tocPosition, setTocPosition] = useState<'beginning' | 'after-title'>('beginning');
  const [tocHeadingLevels, setTocHeadingLevels] = useState<number[]>([1, 2, 3]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleMainFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'docx' && ext !== 'doc') {
      toast.error("Please upload a .docx or .doc file");
      return;
    }
    setMainDocument({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: formatFileSize(file.size),
    });
  }, []);

  const handleRequirementFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setRequirementFile({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: formatFileSize(file.size),
    });
  }, []);

  const extractDocumentContent = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    return result.value;
  };

  const extractTextContent = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const parseFormattingRules = (rules: FormattingRules) => {
    const parseSize = (size: string): number => {
      const num = parseFloat(size.replace(/[^\d.]/g, ''));
      return isNaN(num) ? 12 : num;
    };

    const parseAlignment = (align: string): typeof AlignmentType[keyof typeof AlignmentType] => {
      switch (align?.toLowerCase()) {
        case 'center': return AlignmentType.CENTER;
        case 'right': return AlignmentType.RIGHT;
        case 'justify': return AlignmentType.BOTH;
        default: return AlignmentType.LEFT;
      }
    };

    return { parseSize, parseAlignment };
  };

  const createFormattedDocument = async (
    formattedHtml: string,
    rules: FormattingRules,
    includeToc: boolean,
    tocPos: 'beginning' | 'after-title'
  ): Promise<Blob> => {
    const { parseSize, parseAlignment } = parseFormattingRules(rules);
    
    // Parse HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(formattedHtml, 'text/html');
    const elements = Array.from(doc.body.children);

    const children: Paragraph[] = [];
    let foundTitle = false;
    let tocInserted = false;

    // Create TOC paragraph placeholder (actual TOC is generated by Word on open)
    const createTocParagraph = (): Paragraph => {
      return new Paragraph({
        text: "[Table of Contents - Update field in Word to generate]",
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      });
    };

    // Insert TOC at beginning if needed
    if (includeToc && tocPos === 'beginning' && !tocInserted) {
      children.push(new Paragraph({
        text: "Table of Contents",
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 400 },
      }));
      children.push(createTocParagraph());
      children.push(new Paragraph({ text: "", spacing: { after: 400 } }));
      tocInserted = true;
    }

    const processElement = (element: Element) => {
      const tagName = element.tagName.toLowerCase();
      const text = element.textContent?.trim() || '';

      if (!text && tagName !== 'br') return null;

      let heading: (typeof HeadingLevel)[keyof typeof HeadingLevel] | undefined;
      let fontSize = parseSize(rules.fontSize);
      let bold = false;
      let alignment = parseAlignment(rules.alignment);

      switch (tagName) {
        case 'h1':
          heading = HeadingLevel.HEADING_1;
          fontSize = parseSize(rules.headingStyles.h1.fontSize);
          bold = rules.headingStyles.h1.fontWeight === 'bold';
          alignment = parseAlignment(rules.headingStyles.h1.alignment);
          if (!foundTitle) {
            foundTitle = true;
            // Insert TOC after title if configured
            if (includeToc && tocPos === 'after-title' && !tocInserted) {
              const para = new Paragraph({
                children: [new TextRun({ text, bold, size: fontSize * 2, font: rules.fontFamily })],
                heading,
                alignment,
                spacing: { after: 400 },
              });
              children.push(para);
              children.push(new Paragraph({
                text: "Table of Contents",
                heading: HeadingLevel.HEADING_2,
                spacing: { after: 200, before: 400 },
              }));
              children.push(createTocParagraph());
              children.push(new Paragraph({ text: "", spacing: { after: 400 } }));
              tocInserted = true;
              return null; // Already added
            }
          }
          break;
        case 'h2':
          heading = HeadingLevel.HEADING_2;
          fontSize = parseSize(rules.headingStyles.h2.fontSize);
          bold = rules.headingStyles.h2.fontWeight === 'bold';
          alignment = parseAlignment(rules.headingStyles.h2.alignment);
          break;
        case 'h3':
          heading = HeadingLevel.HEADING_3;
          fontSize = parseSize(rules.headingStyles.h3.fontSize);
          bold = rules.headingStyles.h3.fontWeight === 'bold';
          alignment = parseAlignment(rules.headingStyles.h3.alignment);
          break;
        case 'h4':
          heading = HeadingLevel.HEADING_4;
          fontSize = parseSize(rules.headingStyles.h4.fontSize);
          bold = rules.headingStyles.h4.fontWeight === 'bold';
          alignment = parseAlignment(rules.headingStyles.h4.alignment);
          break;
        case 'strong':
        case 'b':
          bold = true;
          break;
      }

      // Parse line spacing
      const lineSpacing = parseFloat(rules.lineSpacing) || 1.5;
      const lineSpacingValue = Math.round(lineSpacing * 240); // Convert to twips

      // Parse indentation
      const indentMatch = rules.indentation?.match(/([\d.]+)/);
      const indentInches = indentMatch ? parseFloat(indentMatch[1]) : 0.5;

      return new Paragraph({
        children: [
          new TextRun({
            text,
            bold,
            size: fontSize * 2, // docx uses half-points
            font: rules.fontFamily || 'Times New Roman',
          }),
        ],
        heading,
        alignment,
        indent: heading ? undefined : { firstLine: convertInchesToTwip(indentInches) },
        spacing: {
          line: lineSpacingValue,
          after: parseInt(rules.paragraphSpacing?.replace(/[^\d]/g, '') || '200'),
        },
      });
    };

    // Process all elements
    elements.forEach(element => {
      const para = processElement(element);
      if (para) children.push(para);
    });

    // Create document with proper margins
    const marginTop = parseFloat(rules.margins?.top?.replace(/[^\d.]/g, '') || '1');
    const marginRight = parseFloat(rules.margins?.right?.replace(/[^\d.]/g, '') || '1');
    const marginBottom = parseFloat(rules.margins?.bottom?.replace(/[^\d.]/g, '') || '1');
    const marginLeft = parseFloat(rules.margins?.left?.replace(/[^\d.]/g, '') || '1');

    const document = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(marginTop),
              right: convertInchesToTwip(marginRight),
              bottom: convertInchesToTwip(marginBottom),
              left: convertInchesToTwip(marginLeft),
            },
          },
        },
        headers: {
          default: new Header({
            children: [new Paragraph({ text: "" })],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: [PageNumber.CURRENT],
                  }),
                ],
              }),
            ],
          }),
        },
        children,
      }],
      styles: {
        default: {
          document: {
            run: {
              font: rules.fontFamily || 'Times New Roman',
              size: parseSize(rules.fontSize) * 2,
            },
          },
        },
      },
    });

    return await Packer.toBlob(document);
  };

  const processFormatting = async () => {
    if (!mainDocument) {
      toast.error("Please upload a main document.");
      return;
    }
    setIsProcessing(true);
    setProgress(10);
    setStatusText("Extracting document content...");

    try {
      // Extract content from main document
      const documentContent = await extractDocumentContent(mainDocument.file);
      // Store original content for comparison
      setOriginalContent(documentContent);
      setProgress(25);
      setStatusText("Analyzing document structure...");

      // Extract requirement content if provided
      let requirementContent = '';
      if (requirementFile) {
        try {
          requirementContent = await extractTextContent(requirementFile.file);
        } catch {
          // If extraction fails, read as text
          requirementContent = await requirementFile.file.text();
        }
      }

      setProgress(40);
      setStatusText("AI is formatting your document...");

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('format-word-document', {
        body: {
          documentContent,
          formattingInstructions,
          requirementContent,
          tocEnabled,
          tocPosition,
          tocHeadingLevels,
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to format document');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Formatting failed');
      }

      setProgress(70);
      setStatusText("Generating preview...");

      // Create the formatted .docx file and store for later download
      const blob = await createFormattedDocument(
        data.formattedContent,
        data.formattingRules,
        tocEnabled,
        tocPosition
      );
      previewBlobRef.current = blob;

      setProgress(100);
      
      // Set preview content and show preview mode
      setPreviewContent(data.formattedContent);
      setPreviewRules(data.formattingRules);
      setPreviewSummary(data.summary || "Document formatted successfully");
      setShowPreview(true);
      
      toast.success("Preview ready! Review your formatted document.");
    } catch (error) {
      console.error('Formatting error:', error);
      toast.error(error instanceof Error ? error.message : "AI Formatting failed. Please try again.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setStatusText("");
    }
  };

  const handleDownload = () => {
    if (!previewBlobRef.current || !mainDocument) {
      toast.error("No document to download");
      return;
    }
    
    const url = URL.createObjectURL(previewBlobRef.current);
    const a = document.createElement('a');
    a.href = url;
    const baseName = mainDocument.name.replace(/\.(docx?|doc)$/i, '');
    a.download = `${baseName}-formatted.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Document downloaded!");
  };

  const handleBackToEdit = () => {
    setShowPreview(false);
    setPreviewContent("");
    setOriginalContent("");
    setPreviewRules(null);
    setPreviewSummary("");
    setComparisonView('side-by-side');
    previewBlobRef.current = null;
  };

  const handleFinish = () => {
    handleDownload();
    setShowPreview(false);
    setPreviewContent("");
    setOriginalContent("");
    setPreviewRules(null);
    setPreviewSummary("");
    setComparisonView('side-by-side');
    previewBlobRef.current = null;
    setMainDocument(null);
    setRequirementFile(null);
    setFormattingInstructions('');
  };

  // Preview Mode UI
  if (showPreview) {
    return (
      <div className="w-full p-6 md:p-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header with actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <Eye className="w-6 h-6 text-blue-600" />
                Preview Formatted Document
              </h2>
              <p className="text-sm text-slate-500">{previewSummary}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-slate-100 rounded-full p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setComparisonView('side-by-side')}
                  className={`rounded-full px-3 h-8 text-xs font-bold transition-all ${
                    comparisonView === 'side-by-side' 
                      ? 'bg-white shadow-sm text-slate-900' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Columns className="w-3.5 h-3.5 mr-1.5" />
                  Compare
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setComparisonView('formatted-only')}
                  className={`rounded-full px-3 h-8 text-xs font-bold transition-all ${
                    comparisonView === 'formatted-only' 
                      ? 'bg-white shadow-sm text-slate-900' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <LayoutList className="w-3.5 h-3.5 mr-1.5" />
                  Formatted
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={handleBackToEdit}
                className="rounded-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Edit
              </Button>
              <Button
                onClick={handleFinish}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              >
                <FileDown className="w-4 h-4 mr-2" />
                Download & Finish
              </Button>
            </div>
          </div>

          <div className={`grid gap-6 ${comparisonView === 'side-by-side' ? 'lg:grid-cols-2 xl:grid-cols-5' : 'lg:grid-cols-3'}`}>
            {/* Original Document - Only show in side-by-side view */}
            {comparisonView === 'side-by-side' && (
              <div className="xl:col-span-2 bg-white border border-slate-200 rounded-[32px] shadow-lg overflow-hidden">
                <div className="bg-amber-50 px-6 py-3 border-b border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs font-black uppercase text-amber-600 tracking-widest">Original</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-300" />
                    <div className="w-3 h-3 rounded-full bg-amber-200" />
                    <div className="w-3 h-3 rounded-full bg-amber-100" />
                  </div>
                </div>
                <ScrollArea className="h-[500px]">
                  <div 
                    className="p-8 prose prose-slate max-w-none prose-sm"
                    dangerouslySetInnerHTML={{ __html: originalContent }}
                  />
                </ScrollArea>
              </div>
            )}

            {/* Formatted Document */}
            <div className={`${comparisonView === 'side-by-side' ? 'xl:col-span-2' : 'lg:col-span-2'} bg-white border border-slate-200 rounded-[32px] shadow-lg overflow-hidden`}>
              <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-black uppercase text-emerald-600 tracking-widest">Formatted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-300" />
                  <div className="w-3 h-3 rounded-full bg-emerald-200" />
                  <div className="w-3 h-3 rounded-full bg-emerald-100" />
                </div>
              </div>
              <ScrollArea className={comparisonView === 'side-by-side' ? 'h-[500px]' : 'h-[600px]'}>
                <div 
                  className="p-8 prose prose-slate max-w-none"
                  style={{
                    fontFamily: previewRules?.fontFamily || 'Times New Roman',
                    fontSize: previewRules?.fontSize || '12pt',
                    lineHeight: previewRules?.lineSpacing || '1.5',
                  }}
                  dangerouslySetInnerHTML={{ __html: previewContent }}
                />
              </ScrollArea>
            </div>

            {/* Formatting Rules Panel */}
            <div className={`${comparisonView === 'side-by-side' ? 'xl:col-span-1 lg:col-span-2' : ''} space-y-4`}>
              <div className="bg-slate-900 p-6 rounded-[28px] text-white space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <h3 className="font-black text-lg">Applied Formatting</h3>
                </div>
                
                {previewRules && (
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/60">Font</span>
                      <span className="font-bold text-blue-400">{previewRules.fontFamily}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/60">Size</span>
                      <span className="font-bold text-blue-400">{previewRules.fontSize}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/60">Line Spacing</span>
                      <span className="font-bold text-blue-400">{previewRules.lineSpacing}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/60">Alignment</span>
                      <span className="font-bold text-blue-400 capitalize">{previewRules.alignment}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/60">Indentation</span>
                      <span className="font-bold text-blue-400">{previewRules.indentation}</span>
                    </div>
                    {previewRules.citationStyle && (
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-white/60">Citation Style</span>
                        <span className="font-bold text-blue-400">{previewRules.citationStyle}</span>
                      </div>
                    )}
                    <div className="pt-2">
                      <span className="text-white/60 text-xs uppercase tracking-wider">Margins</span>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="bg-white/5 px-3 py-2 rounded-lg">
                          <span className="text-[10px] text-white/40">Top</span>
                          <p className="text-blue-400 font-bold text-xs">{previewRules.margins?.top}</p>
                        </div>
                        <div className="bg-white/5 px-3 py-2 rounded-lg">
                          <span className="text-[10px] text-white/40">Right</span>
                          <p className="text-blue-400 font-bold text-xs">{previewRules.margins?.right}</p>
                        </div>
                        <div className="bg-white/5 px-3 py-2 rounded-lg">
                          <span className="text-[10px] text-white/40">Bottom</span>
                          <p className="text-blue-400 font-bold text-xs">{previewRules.margins?.bottom}</p>
                        </div>
                        <div className="bg-white/5 px-3 py-2 rounded-lg">
                          <span className="text-[10px] text-white/40">Left</span>
                          <p className="text-blue-400 font-bold text-xs">{previewRules.margins?.left}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 p-6 rounded-[28px] space-y-4">
                <h4 className="font-black text-slate-900 text-sm">Heading Styles</h4>
                {previewRules?.headingStyles && (
                  <div className="space-y-2">
                    {Object.entries(previewRules.headingStyles).map(([key, style]) => (
                      <div key={key} className="flex items-center justify-between text-xs">
                        <span className="uppercase font-bold text-slate-400">{key}</span>
                        <span className="text-slate-600">{style.fontSize}, {style.fontWeight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                onClick={handleDownload}
                variant="outline"
                className="w-full rounded-full border-slate-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Only
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 md:p-12 space-y-10">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left Column: Logic & Uploads */}
        <div className="space-y-8">
          <section className="space-y-4">
            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Main Document (Required)</Label>
            {!mainDocument ? (
              <div
                onDrop={(e) => { e.preventDefault(); setIsDragOverMain(false); handleMainFileSelect(e.dataTransfer.files); }}
                onDragOver={(e) => { e.preventDefault(); setIsDragOverMain(true); }}
                onDragLeave={() => setIsDragOverMain(false)}
                className={`border-2 border-dashed rounded-[32px] p-10 text-center transition-all cursor-pointer group ${isDragOverMain ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/50"
                  }`}
              >
                <input type="file" accept=".docx,.doc" onChange={(e) => handleMainFileSelect(e.target.files)} className="hidden" id="main-upload" />
                <label htmlFor="main-upload" className="cursor-pointer">
                  <FileText className="w-10 h-10 mx-auto mb-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-slate-900">Upload your document</p>
                  <p className="text-xs text-slate-500 mt-1 uppercase font-black tracking-tighter">.docx or .doc files</p>
                </label>
              </div>
            ) : (
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-[28px] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-black text-slate-900 text-sm truncate max-w-[200px]">{mainDocument.name}</p>
                    <p className="text-xs text-slate-400">{mainDocument.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMainDocument(null)} className="h-10 w-10 text-slate-300 hover:text-red-500 rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            )}
          </section>

          <section className="space-y-4">
            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Formatting Instructions</Label>
            <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm space-y-6">
              <Textarea
                placeholder="e.g. Use Times New Roman 12pt, 1.5 spacing, justify all paragraphs, and center all Level 1 headers. Apply APA formatting style."
                className="min-h-[120px] rounded-2xl border-slate-200 font-medium placeholder:text-slate-300"
                value={formattingInstructions}
                onChange={(e) => setFormattingInstructions(e.target.value)}
              />

              <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex-1 h-px bg-slate-100" /> OR <div className="flex-1 h-px bg-slate-100" />
              </div>

              <div
                onDrop={(e) => { e.preventDefault(); setIsDragOverReq(false); handleRequirementFileSelect(e.dataTransfer.files); }}
                onDragOver={(e) => { e.preventDefault(); setIsDragOverReq(true); }}
                onDragLeave={() => setIsDragOverReq(false)}
                className={`border border-dashed p-6 rounded-2xl text-center transition-all ${isDragOverReq ? "bg-blue-50 border-blue-400" : "bg-slate-50 border-slate-200"}`}
              >
                <input type="file" accept=".docx,.doc,.txt,.pdf" onChange={(e) => handleRequirementFileSelect(e.target.files)} className="hidden" id="req-upload" />
                {requirementFile ? (
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-blue-600 text-xs">Loaded: {requirementFile.name}</p>
                    <Button variant="ghost" size="sm" onClick={() => setRequirementFile(null)} className="h-6 text-slate-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <label htmlFor="req-upload" className="cursor-pointer text-[10px] font-black text-slate-500 uppercase">
                    Upload Reference Guide (APA/MLA/Style Guide)
                  </label>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: AI Controls & Meta */}
        <div className="space-y-8">
          <section className="bg-slate-900 p-8 md:p-10 rounded-[44px] text-white space-y-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-black">AI Formatter</h3>
              </div>
              <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest">Gemini AI</div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="space-y-1">
                  <Label className="font-bold text-sm">Table of Contents</Label>
                  <p className="text-[10px] text-white/40 uppercase font-black">Auto-generate TOC</p>
                </div>
                <Switch checked={tocEnabled} onCheckedChange={setTocEnabled} />
              </div>

              <AnimatePresence>
                {tocEnabled && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 pt-2">
                    <Select value={tocPosition} onValueChange={(v: 'beginning' | 'after-title') => setTocPosition(v)}>
                      <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-blue-400">
                        <SelectValue placeholder="TOC Position" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 text-white border-white/10">
                        <SelectItem value="beginning">At Beginning</SelectItem>
                        <SelectItem value="after-title">After Title</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">AI Capabilities</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Heading Styles', 'Typography', 'Spacing', 'Margins'].map(check => (
                    <div key={check} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-[10px] font-black text-white/80">{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-xs text-white/60 text-center">{statusText}</p>
              </div>
            )}

            <Button
              onClick={processFormatting}
              disabled={isProcessing || !mainDocument}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 py-8 rounded-[24px] text-xl font-black text-white h-auto shadow-xl transition-all"
            >
              {isProcessing ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <Sparkles className="w-6 h-6 mr-3" />}
              {isProcessing ? "Formatting..." : "Format with AI"}
            </Button>
          </section>

          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-inner">
              <Shield className="w-3.5 h-3.5 text-blue-500" /> Processed Securely
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordFormatterTool;
