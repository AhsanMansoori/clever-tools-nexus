import { RefreshCcw } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import ImageFormatConverterTool from "@/components/tools/ImageFormatConverter";
import { toolContent } from "@/data/toolContent";

const FormatConverterPage = () => {
  const content = toolContent["format-converter"];

  return (
    <ToolLayout
      title={content.heroTitle}
      description={content.heroDesc}
      icon={RefreshCcw}
      faqs={content.faqs}
      seoContent={content.richText}
      seoTitle={`${content.heroTitle} | ToolifyHubs`}
      seoDescription={content.heroDesc}
    >
      <ImageFormatConverterTool />
    </ToolLayout>
  );
};

export default FormatConverterPage;
