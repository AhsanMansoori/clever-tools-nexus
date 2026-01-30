import { useState, useCallback } from "react";
import { Upload, FileText, Download, X, Loader2, Scissors, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PDFDocument } from "pdf-lib";

interface PdfFile {
  id: string;
  file: File;
  name: string;
  size: string;
  pageCount: number;
}

const SplitPdfTool = () => {
  const [pdfFile, setPdfFile] = useState<PdfFile | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitMode, setSplitMode] = useState<"all" | "range">("all");
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pageCount = pdf.getPageCount();

      setPdfFile({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: formatFileSize(file.size),
        pageCount,
      });
      setEndPage(pageCount);
      toast.success(`PDF Loaded: ${pageCount} Pages`);
    } catch (error) {
      toast.error("Could not load PDF file.");
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const splitAllPages = async () => {
    if (!pdfFile) return;
    setIsSplitting(true);
    try {
      const arrayBuffer = await pdfFile.file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pageCount = pdf.getPageCount();

      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${pdfFile.name.replace(".pdf", "")}_page_${i + 1}.pdf`;
        a.click();
        await new Promise(r => setTimeout(r, 100)); // Browser spacing
      }
      toast.success("All pages extracted successfully!");
      setPdfFile(null);
    } catch (error) {
      toast.error("Splitting failed.");
    } finally {
      setIsSplitting(false);
    }
  };

  const splitByRange = async () => {
    if (!pdfFile) return;
    setIsSplitting(true);
    try {
      const arrayBuffer = await pdfFile.file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const newPdf = await PDFDocument.create();
      const pageIndices = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage - 1 + i);
      const copiedPages = await newPdf.copyPages(pdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${pdfFile.name.replace(".pdf", "")}_range_${startPage}-${endPage}.pdf`;
      a.click();
      toast.success("Range extracted successfully!");
      setPdfFile(null);
    } catch (error) {
      toast.error("Range extraction failed.");
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div className="w-full p-6 md:p-12 space-y-10">
      {!pdfFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          className={`relative border-2 border-dashed rounded-3xl p-12 md:p-20 text-center transition-all duration-300 cursor-pointer group ${isDragOver ? "border-blue-500 bg-blue-50 scale-[0.99]" : "border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400"
            }`}
        >
          <input type="file" accept=".pdf" onChange={(e) => handleFileSelect(e.target.files)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-blue-500/10 flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110">
            <Scissors className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-2xl font-black mb-3 text-slate-900">Drop PDF to extract pages</h3>
          <p className="text-slate-500 font-medium">Split documents with neural-engine precision</p>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[32px] border border-slate-100">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="font-black text-slate-900 text-lg truncate max-w-xs">{pdfFile.name}</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{pdfFile.pageCount} Pages • {pdfFile.size}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setPdfFile(null)} className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full h-12 w-12">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={splitMode === "all" ? "default" : "outline"}
                onClick={() => setSplitMode("all")}
                className={`h-auto py-6 rounded-2xl text-lg font-black ${splitMode === "all" ? "bg-blue-600 shadow-xl shadow-blue-500/20" : "border-slate-200"}`}
              >
                Split All Pages
              </Button>
              <Button
                variant={splitMode === "range" ? "default" : "outline"}
                onClick={() => setSplitMode("range")}
                className={`h-auto py-6 rounded-2xl text-lg font-black ${splitMode === "range" ? "bg-blue-600 shadow-xl shadow-blue-500/20" : "border-slate-200"}`}
              >
                Extract Range
              </Button>
            </div>

            <AnimatePresence>
              {splitMode === "range" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100"
                >
                  <div className="flex-1 space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Start Page</Label>
                    <Input type="number" value={startPage} onChange={(e) => setStartPage(Number(e.target.value))} className="h-14 rounded-xl border-slate-200 font-bold text-center" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">End Page</Label>
                    <Input type="number" value={endPage} onChange={(e) => setEndPage(Number(e.target.value))} className="h-14 rounded-xl border-slate-200 font-bold text-center" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              onClick={splitMode === "all" ? splitAllPages : splitByRange}
              disabled={isSplitting}
              className="w-full bg-slate-900 hover:bg-black py-8 rounded-2xl text-xl font-black text-white h-auto"
            >
              {isSplitting ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <Scissors className="w-6 h-6 mr-3" />}
              {isSplitting ? "Processing..." : splitMode === "all" ? "Split All Pages" : "Extract Selected Range"}
            </Button>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <Shield className="w-3 h-3 text-blue-500" /> Secure Processing No Cloud Leak
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitPdfTool;
