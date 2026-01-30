import { Files } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import MergePdfTool from "@/components/tools/MergePdf";
import { toolContent } from "@/data/toolContent";

const MergePdfPage = () => {
  const content = toolContent["merge-pdf"];

  return (
    <ToolLayout
      title={content.heroTitle}
      description={content.heroDesc}
      icon={Files}
      faqs={content.faqs}
      seoContent={content.richText}
      seoTitle={`${content.heroTitle} | ToolifyHubs`}
      seoDescription={content.heroDesc}
    >
      <MergePdfTool />
    </ToolLayout>
  );
};

export default MergePdfPage;
