import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Upload, Image as ImageIcon, Download, X, CheckCircle2, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ImageCompressorTool = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | FileList | null) => {
    const file = e instanceof FileList ? e[0] : e?.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }
      setSelectedFile(file);
      setOriginalSize(file.size);
      setCompressedSize(0);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const compressImage = () => {
    if (!selectedFile || !preview) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          setCompressedSize(blob.size);
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `optimized-${selectedFile.name.split('.')[0]}.jpg`;
          a.click();
          URL.revokeObjectURL(url);
          toast.success("Image optimized successfully!");
        }
      }, "image/jpeg", quality[0] / 100);
    };
    img.src = preview;
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview("");
    setCompressedSize(0);
  };

  return (
    <div className="w-full p-6 md:p-12 space-y-8">
      {!selectedFile ? (
        <div
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); handleFileChange(e.dataTransfer.files); }}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          className={`relative border-2 border-dashed rounded-3xl p-12 md:p-20 text-center transition-all duration-300 cursor-pointer group ${isDragOver ? "border-blue-500 bg-blue-50 scale-[0.99]" : "border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400"
            }`}
        >
          <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-blue-500/10 flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110">
            <ImageIcon className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-2xl font-black mb-3 text-slate-900">Drop image to compress</h3>
          <p className="text-slate-500 font-medium">Smart lossy compression with pixel-perfection</p>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] border border-slate-100">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg truncate max-w-xs">{selectedFile.name}</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{formatFileSize(originalSize)}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={reset} className="text-slate-300 hover:text-red-500 h-12 w-12 rounded-full">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-[32px] space-y-6 shadow-sm">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h4 className="font-black text-slate-900">Compression Quality</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Lower quality = Smaller file size</p>
              </div>
              <span className="text-3xl font-black text-blue-600 tabular-nums">{quality[0]}%</span>
            </div>

            <Slider
              min={10}
              max={100}
              step={5}
              value={quality}
              onValueChange={setQuality}
              className="py-4"
            />

            {compressedSize > 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-green-50 rounded-2xl border border-green-100 text-center">
                <p className="text-green-800 font-black text-xl">
                  Optimized to {formatFileSize(compressedSize)}!
                </p>
                <p className="text-green-600 text-xs font-bold uppercase tracking-widest mt-1">
                  {Math.round((1 - compressedSize / originalSize) * 100)}% Data Saved
                </p>
              </motion.div>
            )}

            <Button
              onClick={compressImage}
              className="w-full bg-blue-600 hover:bg-blue-700 h-20 rounded-3xl text-xl font-black shadow-xl shadow-blue-500/20 group h-auto"
            >
              <Download className="mr-3 w-6 h-6 group-hover:translate-y-1 transition-transform" />
              Compress & Download
            </Button>
          </div>

          <div className="text-center py-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Shield className="w-3 h-3 text-blue-500" /> Pure Browser-Side Optimization
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCompressorTool;
