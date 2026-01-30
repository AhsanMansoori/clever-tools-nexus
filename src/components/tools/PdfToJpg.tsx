import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Upload, FileText, Download, X, CheckCircle2, Shield, Images } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConvertedImage {
  pageNumber: number;
  dataUrl: string;
  blob: Blob;
}

const PdfToJpgTool = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [quality, setQuality] = useState([85]);
  const [scale, setScale] = useState([2]);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | FileList | null) => {
    const file = e instanceof FileList ? e[0] : e?.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please select a valid PDF.");
        return;
      }
      setPdfFile(file);
      setConvertedImages([]);
    }
  };

  const convertPdf = async () => {
    if (!pdfFile) return;
    setIsConverting(true);
    setConvertedImages([]);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const images: ConvertedImage[] = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: scale[0] });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) continue;
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport: viewport }).promise;

        const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/jpeg", quality[0] / 100));
        images.push({ pageNumber: pageNum, dataUrl: canvas.toDataURL("image/jpeg", quality[0] / 100), blob });
      }

      setConvertedImages(images);
      toast.success(`Success! Converted ${numPages} pages.`);
    } catch (error) {
      toast.error("Failed to convert PDF.");
    } finally {
      setIsConverting(false);
    }
  };

  const downloadImage = (image: ConvertedImage) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(image.blob);
    link.download = `page-${image.pageNumber}.jpg`;
    link.click();
  };

  const reset = () => {
    setPdfFile(null);
    setConvertedImages([]);
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
            <Images className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-2xl font-black mb-3 text-slate-900">Drop PDF to extract visuals</h3>
          <p className="text-slate-500 font-medium">Turn PDF pages into high-fidelity image assets</p>
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
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest tracking-widest">PDF Source Verified</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={reset} className="text-slate-300 hover:text-red-500 h-12 w-12 rounded-full">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-[32px] space-y-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Image Quality</Label>
                  <span className="text-xl font-black text-blue-600">{quality[0]}%</span>
                </div>
                <Slider value={quality} onValueChange={setQuality} min={10} max={100} step={5} className="py-2" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Resolution Scale</Label>
                  <span className="text-xl font-black text-blue-600">{scale[0]}x</span>
                </div>
                <Slider value={scale} onValueChange={setScale} min={1} max={4} step={0.5} className="py-2" />
              </div>
            </div>

            <Button
              onClick={convertPdf}
              disabled={isConverting}
              className="w-full bg-blue-600 hover:bg-blue-700 h-20 rounded-3xl text-xl font-black shadow-xl shadow-blue-500/20 text-white h-auto"
            >
              {isConverting ? "Extracting Pages..." : "Convert to JPG Gallery"}
            </Button>

            <AnimatePresence>
              {convertedImages.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-8 border-t border-slate-50 space-y-6 text-white text-center">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-slate-900 font-black">Visual Assets ({convertedImages.length})</h4>
                    <Button variant="outline" className="rounded-full border-slate-200 text-slate-600 font-bold hover:bg-slate-50 text-white">Download ZIP bundle (soon)</Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {convertedImages.map((img) => (
                      <div key={img.pageNumber} className="group relative aspect-[3/4] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:border-blue-200 transition-all">
                        <img src={img.dataUrl} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                          <p className="text-white font-black mb-3">Page {img.pageNumber}</p>
                          <Button size="sm" onClick={() => downloadImage(img)} className="bg-white text-slate-900 hover:bg-blue-50 rounded-full font-black text-[10px] uppercase">
                            <Download className="w-3.5 h-3.5 mr-1" /> Save Image
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Shield className="w-3 h-3 text-blue-500" /> Private Sandbox Processing
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfToJpgTool;
