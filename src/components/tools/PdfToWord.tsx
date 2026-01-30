import { useState, useCallback } from "react";
import { Upload, FileText, Download, X, Loader2, CheckCircle2, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { motion } from "framer-motion";
import useFileHandler from "@/hooks/useFileHandler";

const PdfToWordTool = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const {
    file,
    isLoading,
    progress,
    downloadUrl,
    handleUpload,
    reset
  } = useFileHandler('/api/convert/pdf-to-word');

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
      toast.error("Invalid file type", {
        description: "Please upload a valid PDF document."
      });
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
    <div className="w-full p-6 md:p-12">
      {!file ? (
        /* Upload State */
        <div
          className={`relative border-2 border-dashed rounded-3xl p-12 md:p-20 text-center transition-all duration-300 cursor-pointer group ${isDragOver
              ? "border-blue-500 bg-blue-50 scale-[0.99]"
              : "border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400"
            }`}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => onFileChange(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-blue-500/10 flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110">
            <Upload className="w-10 h-10 text-blue-600" />
          </div>

          <h3 className="text-2xl font-black mb-3 text-slate-900">
            Drop your PDF here
          </h3>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">
            or click to browse from your device. <br />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 block">Max file size: 50MB</span>
          </p>

          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 rounded-2xl text-lg font-bold shadow-xl shadow-blue-500/20 pointer-events-none">
            Select Files
          </Button>
        </div>
      ) : (
        /* Active/Processing/Finished State */
        <div className="space-y-8">
          <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[32px] border border-slate-100">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg truncate max-w-[200px] sm:max-w-md">
                  {file.name}
                </p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            {!isLoading && !downloadUrl && (
              <Button variant="ghost" size="icon" onClick={reset} className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-full p-2">
                <X className="w-6 h-6" />
              </Button>
            )}
          </div>

          {isLoading && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <p className="text-lg font-black text-slate-900 tracking-tight">Processing Conversion...</p>
                  <p className="text-sm font-medium text-slate-500">Optimizing structural layout vectors via Neural Engine</p>
                </div>
                <span className="text-4xl font-black text-blue-600 tabular-nums">{progress}%</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-blue-600 rounded-full"
                />
              </div>
            </div>
          )}

          {downloadUrl && (
            <div className="text-center space-y-8 animate-in zoom-in-95 duration-500 py-4">
              <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Ready for Download!</h3>
                <p className="text-slate-500 font-medium text-lg">Your high-fidelity Word document is successfully processed.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 px-12 py-8 text-xl font-black rounded-[24px] shadow-2xl shadow-blue-500/20 group">
                  <a href={downloadUrl} download>
                    <Download className="mr-3 w-6 h-6 group-hover:translate-y-1 transition-transform" />
                    Download Word
                  </a>
                </Button>
                <Button variant="outline" size="lg" onClick={reset} className="px-12 py-8 text-xl font-black rounded-[24px] border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
                  Reset Tool
                </Button>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest max-w-sm mx-auto">
                <Shield className="w-4 h-4 text-blue-500" /> Secure Link Expiring in 60m
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PdfToWordTool;
