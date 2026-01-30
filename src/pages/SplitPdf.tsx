import { Scissors } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import SplitPdfTool from "@/components/tools/SplitPdf";
import { toolContent } from "@/data/toolContent";

const SplitPdfPage = () => {
  const content = toolContent["split-pdf"];

  return (
    <ToolLayout
      title={content.heroTitle}
      description={content.heroDesc}
      icon={Scissors}
      faqs={content.faqs}
      seoContent={content.richText}
      seoTitle={`${content.heroTitle} | ToolifyHubs`}
      seoDescription={content.heroDesc}
    >
      <SplitPdfTool />
    </ToolLayout>
  );
};

export default SplitPdfPage;
