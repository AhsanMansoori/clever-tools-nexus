import * as React from "react";
import {
  ImageIcon,
  Maximize,
  FileImage,
  ArrowRight,
  Sparkles,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
interface ToolItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  onClick: () => void;
  delay?: number;
  comingSoon?: boolean;
}

const ToolItem: React.FC<ToolItemProps> = ({ icon: Icon, title, description, onClick, delay = 0, comingSoon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.4, delay }}
    {...(!comingSoon && { whileHover: { y: -4 } })}
    onClick={comingSoon ? undefined : onClick}
    className={`group relative ${comingSoon ? "cursor-default opacity-60 pointer-events-none" : "cursor-pointer"}`}
  >
    {comingSoon && (
      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full z-10 uppercase tracking-tighter">
        Coming Soon
      </div>
    )}
    <div className={`tool-card p-4 h-full ${comingSoon ? "border-dashed" : ""}`}>
      <div className="flex items-center gap-3">
        <motion.div
          {...(!comingSoon && {
            whileHover: { scale: 1.1, rotate: 5 },
            transition: { type: "spring", stiffness: 400, damping: 17 }
          })}
          className={`w-10 h-10 ${comingSoon ? "bg-muted" : "bg-primary/10"} rounded-lg flex items-center justify-center flex-shrink-0`}
        >
          <Icon className={`w-5 h-5 ${comingSoon ? "text-muted-foreground" : "text-primary"}`} />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium ${comingSoon ? "text-muted-foreground" : "text-foreground group-hover:text-primary"} text-sm transition-colors truncate`}>
            {title}
          </h4>
          <p className="text-xs text-muted-foreground truncate">{description}</p>
        </div>
        {!comingSoon && <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />}
      </div>
    </div>
  </motion.div>
);

interface CategorySectionProps {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  children: ReactNode;
}

const CategorySection = ({ id, icon: Icon, title, subtitle, children }: CategorySectionProps) => (
  <div id={id} className="mb-10 scroll-mt-24">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3 mb-4"
    >
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </motion.div>
    {children}
  </div>
);

const ToolsSection = () => {
  const navigate = useNavigate();

  const pdfTools = [
    { icon: Sparkles, title: "AI Word Formatter", description: "Apply professional structural cleaning with AI.", link: "/word-formatter" },
    { icon: FileText, title: "Merge PDF", description: "Combine multiple PDF documents into a single file.", link: "/pdf/merge-pdf" },
    { icon: FileText, title: "Split PDF", description: "Extract specific pages or split your PDF into parts.", link: "/pdf/split-pdf" },
    { icon: FileText, title: "Compress PDF", description: "Reduce PDF file size without losing document quality.", link: "/pdf/compress-pdf" },
    { icon: FileText, title: "PDF to JPG", description: "Convert PDF pages into high-quality JPG images.", link: "/pdf/pdf-to-jpg" },
  ];

  const imageTools = [
    { icon: FileImage, title: "Image Compressor", description: "Shrink image file size while maintaining visual clarity.", link: "/image-compressor" },
    { icon: Maximize, title: "Image Resizer", description: "Resize images to exact dimensions for any platform.", link: "/image-resizer" },
    { icon: ImageIcon, title: "Format Converter", description: "Convert images between PNG, JPG, and WebP formats.", link: "/format-converter" },
  ];

  return (
    <section id="tools" className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Document & Media Management
          </h2>
          <div className="section-divider mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            Professional-grade tools for your digital daily workflow.
          </p>
        </motion.div>


        {/* PDF & Document Tools */}
        <CategorySection id="pdf-tools" icon={FileText} title="Popular PDF Tools" subtitle="AI Formatting, Merge, Split & Convert">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pdfTools.map((tool, i) => (
              <ToolItem
                key={tool.title}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                onClick={() => navigate(tool.link)}
                delay={i * 0.05}
                comingSoon={(tool as any).comingSoon}
              />
            ))}
          </div>
        </CategorySection>

        {/* Image Tools */}
        <CategorySection id="image-tools" icon={ImageIcon} title="Image Optimization" subtitle="Compress, Resize & Convert">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageTools.map((tool, i) => (
              <ToolItem
                key={tool.title}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                onClick={() => navigate(tool.link)}
                delay={i * 0.05}
                comingSoon={(tool as any).comingSoon}
              />
            ))}
          </div>
        </CategorySection>
      </div>
    </section>
  );
};

export default ToolsSection;
