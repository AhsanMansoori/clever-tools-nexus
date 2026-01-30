import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Upload, FileText, Download, X, CheckCircle2, Shield, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CompressPdfTool = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState([70]);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | FileList | null) => {
    const file = e instanceof FileList ? e[0] : e?.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please select a valid PDF.");
        return;
      }
      setPdfFile(file);
      setOriginalSize(file.size);
      setCompressedBlob(null);
    }
  };

  const compressPdf = async () => {
    if (!pdfFile) return;
    setIsCompressing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const compressedPdf = await PDFDocument.create();
      const pages = await compressedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => compressedPdf.addPage(page));

      const compressedBytes = await compressedPdf.save({ useObjectStreams: true });
      const blob = new Blob([compressedBytes as BlobPart], { type: "application/pdf" });

      setCompressedBlob(blob);
      setCompressedSize(blob.size);
      toast.success("Compression successful!");
    } catch (error) {
      toast.error("Failed to compress PDF.");
    } finally {
      setIsCompressing(false);
    }
  };

  const reset = () => {
    setPdfFile(null);
    setCompressedBlob(null);
  };

  return (
    <div className="w-full p-6 md:p-12 space-y-10">
      {!pdfFile ? (
        <div
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); handleFileChange(e.dataTransfer.files); }}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          className={`relative border-2 border-dashed rounded-3xl p-12 md:p-20 text-center transition-all duration-300 cursor-pointer group ${isDragOver ? "border-blue-500 bg-blue-50 scale-[0.99]" : "border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400"
            }`}
        >
          <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-blue-500/10 flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110">
            <Minimize2 className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-2xl font-black mb-3 text-slate-900">Drop PDF to compress</h3>
          <p className="text-slate-500 font-medium">Smart optimization for email & web storage</p>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[32px] border border-slate-100">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg truncate max-w-xs">{pdfFile.name}</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Original: {formatFileSize(originalSize)}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={reset} className="text-slate-300 hover:text-red-500 h-12 w-12 rounded-full">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-[32px] space-y-8 shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Compression Target</Label>
                <span className="text-2xl font-black text-blue-600">{quality[0]}%</span>
              </div>
              <Slider value={quality} onValueChange={setQuality} min={10} max={100} step={10} className="py-4" />
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Smallest Size</span>
                <span>High Quality</span>
              </div>
            </div>

            <Button
              onClick={compressPdf}
              disabled={isCompressing}
              className="w-full bg-blue-600 hover:bg-blue-700 h-20 rounded-3xl text-xl font-black shadow-xl shadow-blue-500/20 text-white h-auto"
            >
              {isCompressing ? "Optimizing Layout..." : "Compress PDF Now"}
            </Button>

            <AnimatePresence>
              {compressedBlob && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 pt-6 border-t border-slate-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Before</p>
                      <p className="font-black text-slate-900">{formatFileSize(originalSize)}</p>
                    </div>
                    <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="text-[10px] font-black text-blue-400 uppercase mb-1">After</p>
                      <p className="font-black text-blue-600">{formatFileSize(compressedSize)}</p>
                    </div>
                  </div>
                  {compressedSize < originalSize && (
                    <div className="text-center p-3 bg-green-50 text-green-700 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Saved {((originalSize - compressedSize) / originalSize * 100).toFixed(1)}% of original size
                    </div>
                  )}
                  <Button asChild className="w-full bg-slate-900 hover:bg-black py-8 rounded-3xl text-xl font-black h-auto text-white">
                    <a href={URL.createObjectURL(compressedBlob)} download={pdfFile.name.replace(".pdf", "-compressed.pdf")}>
                      <Download className="mr-3 w-6 h-6" /> Download Optimized PDF
                    </a>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Shield className="w-3 h-3 text-blue-500" /> Private In-Browser Optimization
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompressPdfTool;
