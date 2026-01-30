import { Image as ImageIcon } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ImageCompressorTool from "@/components/tools/ImageCompressor";
import { toolContent } from "@/data/toolContent";

const ImageCompressorPage = () => {
  const content = toolContent["image-compressor"];

  return (
    <ToolLayout
      title={content.heroTitle}
      description={content.heroDesc}
      icon={ImageIcon}
      faqs={content.faqs}
      seoContent={content.richText}
      seoTitle={`${content.heroTitle} | ToolifyHubs`}
      seoDescription={content.heroDesc}
    >
      <ImageCompressorTool />
    </ToolLayout>
  );
};

export default ImageCompressorPage;
