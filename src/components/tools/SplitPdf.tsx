import { useState, useCallback, useEffect } from "react";
import {
  FileText,
  Download,
  X,
  Loader2,
  Scissors,
  CheckCircle2,
  Shield,
  Settings2,
  AlertCircle,
  FileDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SplitPdfTool = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitMode, setSplitMode] = useState<"range" | "all">("range");
  const [rangeInput, setRangeInput] = useState("");
  const [resultBlob, setResultBlob] = useState<{ url: string; name: string } | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const loadPdfInfo = async (selectedFile: File) => {
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setPageCount(pdfDoc.getPageCount());
    } catch (error) {
      console.error("Error loading PDF:", error);
      toast.error("Failed to read PDF pages. The file might be corrupted.");
      setFile(null);
    }
  };

  const onFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const selectedFile = files[0];
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }
    setFile(selectedFile);
    setResultBlob(null);
    loadPdfInfo(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onFileChange(e.dataTransfer.files);
  };

  const parseRange = (input: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = input.split(",");

    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [start, end] = trimmed.split("-").map(n => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end)) {
          const s = Math.min(start, end);
          const e = Math.max(start, end);
          for (let i = s; i <= e; i++) {
            if (i >= 1 && i <= maxPages) pages.add(i - 1);
          }
        }
      } else {
        const page = parseInt(trimmed);
        if (!isNaN(page) && page >= 1 && page <= maxPages) {
          pages.add(page - 1);
        }
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  const validateRange = (input: string): boolean => {
    if (!input.trim()) return false;
    // Only numbers, commas, hyphens and spaces
    if (!/^[0-9,\-\s]+$/.test(input)) {
      toast.error("Range contains invalid characters. Use only numbers, commas, and hyphens.");
      return false;
    }

    // Check for out of bounds numbers
    const numbers = input.match(/\d+/g);
    if (numbers) {
      for (const numStr of numbers) {
        const num = parseInt(numStr);
        if (num < 1 || num > pageCount) {
          toast.error(`Page ${num} is out of range. This document has ${pageCount} pages.`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSplit = async () => {
    if (!file) return;

    if (splitMode === "range") {
      if (!validateRange(rangeInput)) return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();

      if (splitMode === "range") {
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const newPdf = await PDFDocument.create();
        const pagesToExtract = parseRange(rangeInput, pageCount);

        if (pagesToExtract.length === 0) {
          toast.error("No valid pages selected.");
          setIsProcessing(false);
          return;
        }

        const copiedPages = await newPdf.copyPages(pdfDoc, pagesToExtract);
        copiedPages.forEach(page => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setResultBlob({ url, name: file.name.replace(".pdf", "_split.pdf") });
        toast.success("Document split successfully!");
      } else {
        // Extract All
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const zip = new JSZip();

        for (let i = 0; i < pageCount; i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(page);
          const pdfBytes = await newPdf.save();
          zip.file(`${file.name.replace(".pdf", "")}_page_${i + 1}.pdf`, pdfBytes);
        }

        const zipContent = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(zipContent);
        setResultBlob({ url, name: file.name.replace(".pdf", "_all_pages.zip") });
        toast.success("All pages extracted to ZIP!");
      }
    } catch (error) {
      console.error("Split error:", error);
      toast.error("Failed to process PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPageCount(0);
    setResultBlob(null);
    setRangeInput("");
    setIsProcessing(false);
  };

  return (
    <div className="w-full p-6 md:p-12 space-y-10">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          className={`relative border-2 border-dashed rounded-[44px] p-12 md:p-24 text-center transition-all duration-500 cursor-pointer group ${isDragOver ? "border-blue-500 bg-blue-50 scale-[0.98] shadow-2xl" : "border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300"
            }`}
        >
          <input type="file" accept=".pdf" onChange={(e) => onFileChange(e.target.files)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="w-32 h-32 bg-blue-600/10 rounded-[32px] flex items-center justify-center mx-auto mb-10 transition-all group-hover:scale-110 group-hover:rotate-12 group-hover:bg-blue-600 group-hover:text-white group-active:scale-95 text-blue-600">
            <Scissors className="w-14 h-14" />
          </div>
          <h3 className="text-3xl font-black mb-4 text-slate-900 tracking-tight">Precise PDF Splitter</h3>
          <p className="text-slate-500 font-semibold mb-10 max-w-md mx-auto leading-relaxed">Extract specific ranges or save every page as an individual file. 100% Client-Side Private.</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-8 rounded-[24px] text-xl font-black shadow-2xl shadow-blue-500/30">
            Choose PDF
          </Button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
          {/* File Info Card */}
          <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 gap-6">
            <div className="flex items-center gap-6 text-left">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600">
                <FileText className="w-10 h-10" />
              </div>
              <div className="min-w-0">
                <p className="font-black text-slate-900 text-xl truncate max-w-sm">{file.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{formatFileSize(file.size)}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{pageCount} Pages Loaded</span>
                </div>
              </div>
            </div>
            {!isProcessing && !resultBlob && (
              <Button variant="ghost" size="icon" onClick={reset} className="h-12 w-12 rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50">
                <X className="w-6 h-6" />
              </Button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!resultBlob ? (
              <motion.div
                key="config"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 p-8 md:p-12 rounded-[44px] text-white shadow-2xl space-y-10"
              >
                <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                  <Settings2 className="w-8 h-8 text-blue-400" />
                  <h3 className="text-2xl font-black">Configure Extraction</h3>
                </div>

                <RadioGroup
                  value={splitMode}
                  onValueChange={(v: any) => setSplitMode(v)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <Label
                    htmlFor="mode-range"
                    className={`relative flex flex-col p-6 rounded-3xl border-2 transition-all cursor-pointer ${splitMode === "range" ? "border-blue-500 bg-blue-500/10" : "border-white/5 bg-white/5 hover:border-white/10"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                        <Scissors className="w-5 h-5" />
                      </div>
                      <RadioGroupItem value="range" id="mode-range" className="sr-only" />
                      {splitMode === "range" && <CheckCircle2 className="w-6 h-6 text-blue-400" />}
                    </div>
                    <span className="text-lg font-black block mb-1">Split by Range</span>
                    <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Custom page selection</span>
                  </Label>

                  <Label
                    htmlFor="mode-all"
                    className={`relative flex flex-col p-6 rounded-3xl border-2 transition-all cursor-pointer ${splitMode === "all" ? "border-blue-500 bg-blue-500/10" : "border-white/5 bg-white/5 hover:border-white/10"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                        <FileDown className="w-5 h-5" />
                      </div>
                      <RadioGroupItem value="all" id="mode-all" className="sr-only" />
                      {splitMode === "all" && <CheckCircle2 className="w-6 h-6 text-blue-400" />}
                    </div>
                    <span className="text-lg font-black block mb-1">Extract All</span>
                    <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Every page as a PDF</span>
                  </Label>
                </RadioGroup>

                {splitMode === "range" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between px-1">
                      <Label className="text-[10px] font-black uppercase text-white/40 tracking-widest">Enter Page Range</Label>
                      <span className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Available: 1-{pageCount}</span>
                    </div>
                    <Input
                      placeholder="e.g. 1-5, 8, 10-12"
                      value={rangeInput}
                      onChange={(e) => setRangeInput(e.target.value)}
                      className="bg-white/5 border-white/10 h-16 rounded-2xl text-xl font-bold focus:ring-blue-500 focus:border-blue-500 placeholder:text-white/10"
                    />
                    <div className="flex items-start gap-2 text-white/40 p-1">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p className="text-xs font-medium">Use commas for separate pages and hyphens for sequences. Non-existent pages will be ignored.</p>
                    </div>
                  </motion.div>
                )}

                <Button
                  onClick={handleSplit}
                  disabled={isProcessing || (splitMode === "range" && !rangeInput.trim())}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-10 rounded-[28px] text-2xl font-black text-white h-auto shadow-2xl shadow-blue-500/40 relative overflow-hidden group"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-4">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <span>Optimizing PDF Buffers...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Scissors className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                      <span>Run Structural Split</span>
                    </div>
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center bg-white p-12 md:p-20 rounded-[44px] shadow-2xl shadow-slate-200/50 border border-slate-100"
              >
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Split Successful!</h3>
                <p className="text-slate-500 text-lg font-medium mb-12">Your document has been processed with banking-grade precision.</p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 px-12 py-8 text-xl font-black rounded-3xl shadow-xl shadow-blue-500/30 group h-auto">
                    <a href={resultBlob.url} download={resultBlob.name}>
                      <Download className="mr-3 w-6 h-6 group-hover:translate-y-1 transition-transform" />
                      {splitMode === "all" ? "Download ZIP" : "Download PDF"}
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" onClick={reset} className="px-12 py-8 text-xl font-black rounded-3xl border-slate-200 h-auto hover:bg-slate-50">
                    Split Another
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 py-4">
            <div className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
              <Shield className="w-4 h-4 text-blue-500" /> End-to-End Local Processing • No Data Retention
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitPdfTool;
