import { FileText } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import PdfToWordTool from "@/components/tools/PdfToWord";
import { toolContent } from "@/data/toolContent";

const PdfToWordPage = () => {
  const content = toolContent["pdf-to-word"];

  return (
    <ToolLayout
      title={content.heroTitle}
      description={content.heroDesc}
      icon={FileText}
      faqs={content.faqs}
      seoContent={content.richText}
      seoTitle={`${content.heroTitle} | ToolifyHubs`}
      seoDescription={content.heroDesc}
    >
      <PdfToWordTool />
    </ToolLayout>
  );
};

export default PdfToWordPage;
