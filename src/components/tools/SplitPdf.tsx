import { useState, useCallback } from "react";
import { Upload, FileText, Download, X, Loader2, Scissors, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import useFileHandler from "@/hooks/useFileHandler";

const SplitPdfTool = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const {
    file,
    isLoading,
    progress,
    downloadUrl,
    handleUpload,
    reset
  } = useFileHandler('/api/convert/split-pdf');

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const onFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const selectedFile = files[0];
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    handleUpload(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onFileChange(e.dataTransfer.files);
  };

  return (
    <div className="w-full p-6 md:p-12 space-y-10">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          className={`relative border-2 border-dashed rounded-3xl p-12 md:p-20 text-center transition-all duration-300 cursor-pointer group ${isDragOver ? "border-blue-500 bg-blue-50 scale-[0.99]" : "border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400"
            }`}
        >
          <input type="file" accept=".pdf" onChange={(e) => onFileChange(e.target.files)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-blue-500/10 flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110">
            <Scissors className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-2xl font-black mb-3 text-slate-900">Drop PDF to extract pages</h3>
          <p className="text-slate-500 font-medium pb-2">Split documents with neural-engine precision</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 rounded-2xl text-lg font-bold shadow-xl shadow-blue-500/20 pointer-events-none">
            Select PDF File
          </Button>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[32px] border border-slate-100">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="font-black text-slate-900 text-lg truncate max-w-xs">{file.name}</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{formatFileSize(file.size)}</p>
              </div>
            </div>
            {!isLoading && !downloadUrl && (
              <Button variant="ghost" size="icon" onClick={reset} className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full h-12 w-12">
                <X className="w-6 h-6" />
              </Button>
            )}
          </div>

          {isLoading && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <p className="text-lg font-black text-slate-900">Processing PDF Split...</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Isolating structural vectors</p>
                </div>
                <span className="text-4xl font-black text-blue-600 tabular-nums">{progress}%</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-blue-600 rounded-full" />
              </div>
            </div>
          )}

          {downloadUrl && (
            <div className="text-center space-y-8 py-4 animate-in zoom-in-95">
              <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900">Splitting Complete!</h3>
                <p className="text-slate-500 font-medium">All pages have been individualised into a secure ZIP archive.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 px-12 py-8 text-xl font-black rounded-3xl shadow-2xl shadow-blue-500/20 group h-auto">
                  <a href={downloadUrl} download={file.name.replace(/\.[^/.]+$/, "") + "_split.zip"}>
                    <Download className="mr-3 w-6 h-6 group-hover:translate-y-1 transition-transform" />
                    Download ZIP
                  </a>
                </Button>
                <Button variant="outline" size="lg" onClick={reset} className="px-12 py-8 text-xl font-black rounded-3xl border-slate-200 h-auto">
                  Next Document
                </Button>
              </div>
            </div>
          )}

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Shield className="w-3 h-3 text-blue-500" /> Secure Processing No Cloud Leak
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitPdfTool;
