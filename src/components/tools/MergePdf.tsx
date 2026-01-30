import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, X, GripVertical, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PdfFile {
  id: string;
  file: File;
  name: string;
}

const MergePdfTool = () => {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: PdfFile[] = Array.from(files)
        .filter((file) => file.type === "application/pdf")
        .map((file) => ({
          id: crypto.randomUUID(),
          file,
          name: file.name,
        }));

      if (newFiles.length !== files.length) {
        toast.error("Only PDF files are allowed.");
      }

      if (newFiles.length > 0) {
        setPdfFiles((prev) => [...prev, ...newFiles]);
        toast.success(`Added ${newFiles.length} file(s)`);
      }
    }
    e.target.value = "";
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files) {
      const newFiles: PdfFile[] = Array.from(files)
        .filter((file) => file.type === "application/pdf")
        .map((file) => ({
          id: crypto.randomUUID(),
          file,
          name: file.name,
        }));

      if (newFiles.length > 0) {
        setPdfFiles((prev) => [...prev, ...newFiles]);
        toast.success(`Added ${newFiles.length} file(s)`);
      } else {
        toast.error("Only PDF files are allowed.");
      }
    }
  }, []);

  const removeFile = (id: string) => {
    setPdfFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const mergePdfs = async () => {
    if (pdfFiles.length < 2) {
      toast.error("Add at least 2 PDFs to merge");
      return;
    }

    setIsMerging(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of pdfFiles) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `merged_${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("PDFs merged successfully!");
      setPdfFiles([]);
    } catch (error) {
      toast.error("Failed to merge PDFs.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="w-full p-6 md:p-12 space-y-10">
      {/* Enhanced Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        className={`relative border-2 border-dashed rounded-3xl p-10 md:p-16 text-center transition-all duration-300 cursor-pointer group ${isDragOver
          ? "border-blue-500 bg-blue-50 scale-[0.99]"
          : "border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400"
          }`}
      >
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="w-20 h-20 bg-white rounded-2xl shadow-xl shadow-blue-500/10 flex items-center justify-center mx-auto mb-6 transform transition-transform group-hover:scale-110">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">Combine multiple PDFs into one</h3>
        <p className="text-sm text-slate-500 font-medium">Click to browse or drag & drop files here</p>
      </div>

      {/* File List Section */}
      <AnimatePresence>
        {pdfFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-2">
              <Label className="text-sm font-black text-slate-400 uppercase tracking-widest">
                Files to merge ({pdfFiles.length})
              </Label>
              <Button variant="ghost" size="sm" onClick={() => setPdfFiles([])} className="text-red-500 font-bold hover:bg-red-50">
                Clear All
              </Button>
            </div>

            <div className="grid gap-3">
              {pdfFiles.map((pdfFile, index) => (
                <motion.div
                  layout
                  key={pdfFile.id}
                  className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-blue-200 transition-all group"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black text-xs shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 truncate">{pdfFile.name}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Ready to consolidate</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(pdfFile.id)}
                    className="h-10 w-10 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="pt-6">
              <Button
                onClick={mergePdfs}
                disabled={pdfFiles.length < 2 || isMerging}
                className="w-full bg-blue-600 hover:bg-blue-700 py-8 rounded-2xl text-xl font-black shadow-xl shadow-blue-500/20 group h-auto"
              >
                {isMerging ? (
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                )}
                {isMerging ? "Merging Docs..." : "Merge These PDFs"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);

export default MergePdfTool;
