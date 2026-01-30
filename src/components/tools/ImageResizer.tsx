import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Scaling, Download, X, CheckCircle2, Shield, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

const ImageResizerTool = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [resizedPreview, setResizedPreview] = useState<string>("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | FileList | null) => {
    const file = e instanceof FileList ? e[0] : e?.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setWidth(img.width.toString());
          setHeight(img.height.toString());
        };
        img.src = e.target?.result as string;
        setPreview(e.target?.result as string);
        setResizedPreview("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (value: string) => {
    setWidth(value);
    if (maintainRatio && originalDimensions.width) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(parseInt(value) * ratio).toString());
    }
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    if (maintainRatio && originalDimensions.height) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(parseInt(value) * ratio).toString());
    }
  };

  const resize = () => {
    if (!selectedFile || !preview) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = parseInt(width);
      canvas.height = parseInt(height);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL("image/png");
      setResizedPreview(dataURL);
      toast.success("Resizing preview ready!");
    };
    img.src = preview;
  };

  const download = () => {
    if (!resizedPreview) return;
    const a = document.createElement("a");
    a.href = resizedPreview;
    a.download = `resized-${width}x${height}.png`;
    a.click();
    toast.success("Resized image downloaded!");
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview("");
    setResizedPreview("");
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
            <Scaling className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-2xl font-black mb-3 text-slate-900">Drop image to resize</h3>
          <p className="text-slate-500 font-medium">Precision dimension control with pixel-perfect filtering</p>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-lg truncate max-w-xs">{selectedFile.name}</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Original: {originalDimensions.width} x {originalDimensions.height}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={reset} className="text-slate-300 hover:text-red-500 rounded-full h-12 w-12">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-[32px] space-y-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-6 rounded-full relative transition-colors cursor-pointer ${maintainRatio ? 'bg-blue-600' : 'bg-slate-200'}`} onClick={() => setMaintainRatio(!maintainRatio)}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${maintainRatio ? 'left-5' : 'left-1'}`} />
                </div>
                <Label className="text-sm font-black text-slate-900 cursor-pointer" onClick={() => setMaintainRatio(!maintainRatio)}>Lock Aspect Ratio</Label>
              </div>
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Pro Controls</div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3 font-bold">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Width (px)</Label>
                <Input type="number" value={width} onChange={(e) => handleWidthChange(e.target.value)} className="h-16 rounded-2xl border-slate-100 text-xl font-black focus-visible:ring-blue-500 focus-visible:border-blue-500" />
              </div>
              <div className="space-y-3 font-bold">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Height (px)</Label>
                <Input type="number" value={height} onChange={(e) => handleHeightChange(e.target.value)} className="h-16 rounded-2xl border-slate-100 text-xl font-black focus-visible:ring-blue-500 focus-visible:border-blue-500" />
              </div>
            </div>

            <Button
              onClick={resize}
              disabled={!width || !height}
              className="w-full bg-slate-900 hover:bg-black py-8 rounded-[24px] text-xl font-black text-white h-auto shadow-xl"
            >
              <Maximize2 className="mr-3 w-6 h-6" />
              Apply Dimensions
            </Button>

            {resizedPreview && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-8 border-t border-slate-50 space-y-6">
                <div className="relative group rounded-3xl overflow-hidden border border-slate-100 bg-slate-50">
                  <img src={resizedPreview} alt="Resized Preview" className="max-h-64 mx-auto object-contain" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-slate-900 border border-slate-200">RESIZED PREVIEW</div>
                </div>
                <Button onClick={download} className="w-full bg-blue-600 hover:bg-blue-700 py-8 rounded-[24px] text-xl font-black shadow-xl shadow-blue-500/20 h-auto group text-white">
                  <Download className="mr-3 w-6 h-6 group-hover:translate-y-1 transition-transform" />
                  Download Final PNG
                </Button>
              </motion.div>
            )}
          </div>

          <div className="text-center py-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Shield className="w-3 h-3 text-blue-500" /> End-to-End Browser Privacy
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageResizerTool;
