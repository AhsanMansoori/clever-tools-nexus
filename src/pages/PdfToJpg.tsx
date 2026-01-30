import { Images } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import PdfToJpgTool from "@/components/tools/PdfToJpg";
import { toolContent } from "@/data/toolContent";

const PdfToJpgPage = () => {
  const content = toolContent["pdf-to-jpg"];

  return (
    <ToolLayout
      title={content.heroTitle}
      description={content.heroDesc}
      icon={Images}
      faqs={content.faqs}
      seoContent={content.richText}
      seoTitle={`${content.heroTitle} | ToolifyHubs`}
      seoDescription={content.heroDesc}
    >
      <PdfToJpgTool />
    </ToolLayout>
  );
};

export default PdfToJpgPage;
