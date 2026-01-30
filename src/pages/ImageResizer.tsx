import { Scaling } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ImageResizerTool from "@/components/tools/ImageResizer";
import { toolContent } from "@/data/toolContent";

const ImageResizerPage = () => {
  const content = toolContent["image-resizer"];

  return (
    <ToolLayout
      title={content.heroTitle}
      description={content.heroDesc}
      icon={Scaling}
      faqs={content.faqs}
      seoContent={content.richText}
      seoTitle={`${content.heroTitle} | ToolifyHubs`}
      seoDescription={content.heroDesc}
    >
      <ImageResizerTool />
    </ToolLayout>
  );
};

export default ImageResizerPage;
