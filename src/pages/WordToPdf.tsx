import { FileText } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import WordToPdfTool from "@/components/tools/WordToPdf";
import { toolContent } from "@/data/toolContent";

const WordToPdfPage = () => {
  const content = toolContent["word-to-pdf"];

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
      <WordToPdfTool />
    </ToolLayout>
  );
};

export default WordToPdfPage;
