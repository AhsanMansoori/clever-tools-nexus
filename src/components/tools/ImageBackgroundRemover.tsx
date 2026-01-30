import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

const BACKGROUND_COLORS = [
  { name: "Transparent", value: "transparent" },
  { name: "White", value: "#FFFFFF" },
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#EF4444" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Purple", value: "#A855F7" },
  { name: "Yellow", value: "#EAB308" },
];

const ImageBackgroundRemover = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [processedImage, setProcessedImage] = useState<string>("");
  const [maskData, setMaskData] = useState<Float32Array | null>(null);
  const [originalCanvas, setOriginalCanvas] = useState<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [edgeSmooth, setEdgeSmooth] = useState(2);
  const [backgroundBlur, setBackgroundBlur] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setProcessedImage("");
      setMaskData(null);
      setOriginalCanvas(null);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const resizeImageIfNeeded = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    let width = image.naturalWidth;
    let height = image.naturalHeight;

    if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
      if (width > height) {
        height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
        width = MAX_IMAGE_DIMENSION;
      } else {
        width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
        height = MAX_IMAGE_DIMENSION;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
  };

  const removeBackground = async () => {
    if (!selectedFile || !preview) {
      toast.error("Please select an image first");
      return;
    }

    try {
      setLoading(true);
      toast.info("Processing image... This may take a moment");

      const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
        device: 'webgpu',
      });

      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        resizeImageIfNeeded(canvas, ctx, img);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);

        const result = await segmenter(imageData);

        if (!result || !Array.isArray(result) || result.length === 0) {
          throw new Error('Invalid segmentation result');
        }

        // Find all foreground/subject segments and combine them
        const backgroundLabels = ['wall', 'floor', 'ceiling', 'sky', 'grass', 'ground', 'road', 'pavement'];
        const subjectLabels = ['person', 'people', 'human', 'man', 'woman', 'child', 'face', 'body',
          'dog', 'cat', 'bird', 'animal', 'pet',
          'car', 'vehicle', 'bicycle', 'motorcycle',
          'bottle', 'cup', 'vase', 'plant', 'flower', 'chair', 'table', 'book', 'phone'];

        // Create combined mask
        const maskSize = canvas.width * canvas.height;
        const combinedMask = new Float32Array(maskSize);

        // Combine all non-background segments
        for (const segment of result) {
          if (!segment.mask) continue;
          const label = segment.label.toLowerCase();
          const isBackground = backgroundLabels.some(bg => label.includes(bg));
          const isSubject = subjectLabels.some(subj => label.includes(subj));

          // Prioritize known subjects, but also include any high-confidence non-background
          if (isSubject || (!isBackground && segment.score > 0.3)) {
            for (let i = 0; i < segment.mask.data.length; i++) {
              combinedMask[i] = Math.max(combinedMask[i], segment.mask.data[i]);
            }
          }
        }

        // If mask is mostly empty, use the largest non-background segment
        let maskSum = 0;
        for (let i = 0; i < combinedMask.length; i++) maskSum += combinedMask[i];

        if (maskSum < maskSize * 0.1) {
          let largestSegment = result[0];
          for (const segment of result) {
            if (segment.mask && segment.score > largestSegment.score) {
              largestSegment = segment;
            }
          }
          for (let i = 0; i < largestSegment.mask.data.length; i++) {
            combinedMask[i] = largestSegment.mask.data[i];
          }
        }

        // Store mask and canvas for adjustments
        setMaskData(combinedMask);
        setOriginalCanvas(canvas);

        // Apply initial rendering
        applyMaskWithSettings(canvas, combinedMask, backgroundColor, edgeSmooth);
        toast.success("Background removed successfully!");
        setLoading(false);
      };
      img.src = preview;
    } catch (error) {
      toast.error("Failed to remove background");
      setLoading(false);
    }
  };

  const applyMaskWithSettings = (
    sourceCanvas: HTMLCanvasElement,
    mask: Float32Array,
    bgColor: string,
    smoothing: number
  ) => {
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    if (!outputCtx) return;

    // Apply background color or keep transparent
    if (bgColor !== "transparent") {
      outputCtx.fillStyle = bgColor;
      outputCtx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
    }

    outputCtx.drawImage(sourceCanvas, 0, 0);
    const outputImageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const data = outputImageData.data;

    // Apply mask with edge smoothing
    const width = outputCanvas.width;
    const smoothRadius = Math.max(1, smoothing);

    for (let y = 0; y < outputCanvas.height; y++) {
      for (let x = 0; x < outputCanvas.width; x++) {
        const i = y * width + x;
        let alpha = 1 - mask[i];

        // Apply edge smoothing
        if (smoothing > 0) {
          let sum = 0;
          let count = 0;
          for (let dy = -smoothRadius; dy <= smoothRadius; dy++) {
            for (let dx = -smoothRadius; dx <= smoothRadius; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx >= 0 && nx < width && ny >= 0 && ny < outputCanvas.height) {
                sum += 1 - mask[ny * width + nx];
                count++;
              }
            }
          }
          alpha = sum / count;
        }

        data[i * 4 + 3] = Math.round(alpha * 255);
      }
    }

    outputCtx.putImageData(outputImageData, 0, 0);
    setProcessedImage(outputCanvas.toDataURL('image/png'));
  };

  const updateBackground = (bgColor: string) => {
    if (!maskData || !originalCanvas) return;
    setBackgroundColor(bgColor);
    applyMaskWithSettings(originalCanvas, maskData, bgColor, edgeSmooth);
  };

  const updateEdgeSmooth = (value: number[]) => {
    if (!maskData || !originalCanvas) return;
    setEdgeSmooth(value[0]);
    applyMaskWithSettings(originalCanvas, maskData, backgroundColor, value[0]);
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const a = document.createElement("a");
    a.href = processedImage;
    a.download = "no-background.png";
    a.click();
    toast.success("Image downloaded!");
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="bg-remove-file">Select Image</Label>
        <input
          id="bg-remove-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mt-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>

      {preview && (
        <div className="border border-border rounded-lg p-4">
          <img src={preview} alt="Preview" className="max-h-48 mx-auto" />
        </div>
      )}

      <Button
        onClick={removeBackground}
        disabled={!selectedFile || loading}
        className="w-full"
      >
        {loading ? "Processing..." : "Remove Background"}
      </Button>

      {processedImage && (
        <div className="space-y-4 animate-fade-in-up">
          <Tabs defaultValue="result" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="result">Result</TabsTrigger>
              <TabsTrigger value="background">Background</TabsTrigger>
              <TabsTrigger value="adjust">Adjust</TabsTrigger>
            </TabsList>

            <TabsContent value="result" className="space-y-4">
              <div className="border border-border rounded-lg p-4 bg-checkered">
                <img src={processedImage} alt="Processed" className="max-h-64 mx-auto" />
              </div>
            </TabsContent>

            <TabsContent value="background" className="space-y-4">
              <div className="border border-border rounded-lg p-4 bg-checkered">
                <img src={processedImage} alt="Processed" className="max-h-64 mx-auto" />
              </div>
              <div>
                <Label className="mb-2 block">Background Color</Label>
                <div className="grid grid-cols-4 gap-2">
                  {BACKGROUND_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateBackground(color.value)}
                      className={`h-12 rounded-lg border-2 transition-all ${backgroundColor === color.value
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                        }`}
                      style={{
                        backgroundColor: color.value === "transparent" ? "transparent" : color.value,
                        backgroundImage:
                          color.value === "transparent"
                            ? "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)"
                            : "none",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0 0, 10px 10px",
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="adjust" className="space-y-4">
              <div className="border border-border rounded-lg p-4 bg-checkered">
                <img src={processedImage} alt="Processed" className="max-h-64 mx-auto" />
              </div>
              <div className="space-y-2">
                <Label>Edge Smoothing: {edgeSmooth}</Label>
                <Slider
                  value={[edgeSmooth]}
                  onValueChange={updateEdgeSmooth}
                  min={0}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Smooth the edges of the cutout for a cleaner look
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button onClick={downloadImage} className="w-full">
            Download Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageBackgroundRemover;
