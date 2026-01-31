import { useState, useCallback } from "react";
import { Upload, FileText, Download, X, Loader2, Settings2, List, Sparkles, AlertCircle, Eye, EyeOff, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

const WordFormatterTool = () => {
  const [mainDocument, setMainDocument] = useState<UploadedFile | null>(null);
  const [requirementFile, setRequirementFile] = useState<UploadedFile | null>(null);
  const [formattingInstructions, setFormattingInstructions] = useState("");
  const [isDragOverMain, setIsDragOverMain] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isDragOverReq, setIsDragOverReq] = useState(false);

  // TOC options
  const [tocEnabled, setTocEnabled] = useState(false);
  const [tocPosition, setTocPosition] = useState<'beginning' | 'after-title' | 'custom'>('beginning');
  const [tocCustomPage, setTocCustomPage] = useState(1);
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

  const processFormatting = async () => {
    if (!mainDocument) {
      toast.error("Please upload a main document.");
      return;
    }
    setIsProcessing(true);
    setProgress(20);
    setStatusText("Analyzing neural document structure...");

    try {
      const formData = new FormData();
      formData.append("file", mainDocument.file);
      formData.append("instructions", formattingInstructions);

      const response = await fetch("http://localhost:5000/api/convert/word-cleaner", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) throw new Error(data.error || "Formatting engine error");

      setProgress(80);
      setStatusText("Injecting high-fidelity XML styles...");

      // Use the downloadUrl from the server
      const downloadLink = `http://localhost:5000${data.downloadUrl}`;
      const a = document.createElement("a");
      a.href = downloadLink;
      a.download = `toolify-formatted-${mainDocument.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setProgress(100);
      toast.success("Formatting perfect!");
      setMainDocument(null);
    } catch (error) {
      toast.error("AI Formatting failed.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

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
                  <p className="font-bold text-slate-900">Upload messy document</p>
                  <p className="text-xs text-slate-500 mt-1 uppercase font-black tracking-tighter">Draft, unformatted, or raw text</p>
                </label>
              </div>
            ) : (
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-[28px] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <p className="font-black text-slate-900 text-sm truncate max-w-[150px]">{mainDocument.name}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMainDocument(null)} className="h-10 w-10 text-slate-300 hover:text-red-500 rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            )}
          </section>

          <section className="space-y-4">
            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Formatting Prompt / Method</Label>
            <div className="bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm space-y-6">
              <Textarea
                placeholder="e.g. Use Times New Roman 12pt, 1.5 spacing, justify all paragraphs, and center all Level 1 headers."
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
                <input type="file" onChange={(e) => handleRequirementFileSelect(e.target.files)} className="hidden" id="req-upload" />
                {requirementFile ? (
                  <p className="font-bold text-blue-600 text-xs">Styles loaded from {requirementFile.name}</p>
                ) : (
                  <label htmlFor="req-upload" className="cursor-pointer text-[10px] font-black text-slate-500 uppercase">Upload Reference Guide (APA/MLA)</label>
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
                <h3 className="text-xl font-black">AI Auto-Pilot</h3>
              </div>
              <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest">Active</div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="space-y-1">
                  <Label className="font-bold text-sm">Table of Contents</Label>
                  <p className="text-[10px] text-white/40 uppercase font-black">Generate auto-links</p>
                </div>
                <Switch checked={tocEnabled} onCheckedChange={setTocEnabled} />
              </div>

              <AnimatePresence>
                {tocEnabled && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 pt-2">
                    <Select value={tocPosition} onValueChange={(v: any) => setTocPosition(v)}>
                      <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-blue-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 text-white border-white/10">
                        <SelectItem value="beginning">Beginning</SelectItem>
                        <SelectItem value="after-title">After Title</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Formatting Engine Checklist</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Margins', 'Typography', 'Pagination', 'Indents'].map(check => (
                    <div key={check} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-[10px] font-black text-white/80">{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={processFormatting}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 py-8 rounded-[24px] text-xl font-black text-white h-auto shadow-xl"
            >
              {isProcessing ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <Sparkles className="w-6 h-6 mr-3" />}
              {isProcessing ? "AI Running..." : "Run AI Formatting"}
            </Button>
          </section>

          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-inner">
              <Shield className="w-3.5 h-3.5 text-blue-500" /> No Personal Data Shared
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordFormatterTool;