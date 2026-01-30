import { Minimize2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import CompressPdfTool from "@/components/tools/CompressPdf";
import { toolContent } from "@/data/toolContent";

const CompressPdfPage = () => {
  const content = toolContent["compress-pdf"];

  return (
    <ToolLayout
      title={content.heroTitle}
      description={content.heroDesc}
      icon={Minimize2}
      faqs={content.faqs}
      seoContent={content.richText}
      seoTitle={`${content.heroTitle} | ToolifyHubs`}
      seoDescription={content.heroDesc}
    >
      <CompressPdfTool />
    </ToolLayout>
  );
};

export default CompressPdfPage;
