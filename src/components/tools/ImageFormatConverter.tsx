import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { RefreshCcw, Download, X, CheckCircle2, Shield, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ImageFormatConverterTool = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [format, setFormat] = useState("png");
  const [preview, setPreview] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);

  const formats = ["png", "jpeg", "webp"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | FileList | null) => {
    const file = e instanceof FileList ? e[0] : e?.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const convertImage = () => {
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
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `toolify-converted.${format}`;
          a.click();
          URL.revokeObjectURL(url);
          toast.success(`Successly converted to ${format.toUpperCase()}`);
        }
      }, `image/${format}`, 0.95);
    };
    img.src = preview;
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview("");
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
            <RefreshCcw className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-2xl font-black mb-3 text-slate-900">Drop image to convert</h3>
          <p className="text-slate-500 font-medium">Switch between PNG, JPG, and WebP instantly</p>
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
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Image Source Detected</p>
              </div>
            </div>
            <Button variant="ghost" onClick={reset} className="text-slate-300 hover:text-red-500 rounded-full h-12 w-12">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-[32px] space-y-8 shadow-sm">
            <div className="space-y-3 font-bold">
              <div className="flex justify-between items-center mb-1">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Target Format</Label>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 rounded-full">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  <span className="text-[8px] font-black text-blue-600 uppercase tracking-tighter">lossless optimized</span>
                </div>
              </div>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="h-16 rounded-2xl border-slate-100 text-lg font-black focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                  {formats.map((fmt) => (
                    <SelectItem key={fmt} value={fmt} className="py-3 font-bold">
                      {fmt.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={convertImage}
              className="w-full bg-blue-600 hover:bg-blue-700 py-8 rounded-[24px] text-xl font-black shadow-xl shadow-blue-500/20 group h-auto text-white"
            >
              <Download className="mr-3 w-6 h-6 group-hover:translate-y-1 transition-transform" />
              Convert & Download
            </Button>
          </div>

          <div className="text-center py-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Shield className="w-3 h-3 text-blue-500" /> Secure Local Processing
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageFormatConverterTool;
