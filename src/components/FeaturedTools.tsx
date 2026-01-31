import { CreditCard, FileText, FileImage, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const featuredTools = [
  {
    icon: Sparkles,
    title: "AI Word Formatter",
    description: "AI-powered document formatting",
    link: "/word-formatter",
  },
  {
    icon: FileText,
    title: "Merge PDF",
    description: "Combine PDFs in seconds",
    link: "/pdf/merge-pdf",
  },
  {
    icon: FileImage,
    title: "PDF to Word",
    description: "Extract text from PDF to Word",
    link: "/pdf/pdf-to-word",
    comingSoon: true,
  },
  {
    icon: FileImage,
    title: "Image Compressor",
    description: "Shrink files without quality loss",
    link: "/image-compressor",
  },
  {
    icon: FileImage,
    title: "PDF to JPG",
    description: "Convert PDF pages to images",
    link: "/pdf/pdf-to-jpg",
  },
  {
    icon: Sparkles,
    title: "Word to PDF",
    description: "Convert Word docs to PDF",
    link: "/pdf/word-to-pdf",
    comingSoon: true,
  },
];

const FeaturedTools = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
            Popular Tools
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Most-used tools by our community — start in seconds.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {featuredTools.map((tool) => (
            <button
              key={tool.title}
              onClick={() => !tool.comingSoon && navigate(tool.link)}
              disabled={tool.comingSoon}
              className={`group relative bg-card/80 backdrop-blur-sm border border-border/50 p-4 rounded-xl text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${tool.comingSoon
                ? "opacity-60 cursor-default grayscale-[0.2] pointer-events-none"
                : "hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
                }`}
            >
              {tool.comingSoon && (
                <div className="absolute top-2 right-2 bg-yellow-400/90 text-[8px] font-black text-yellow-950 px-1.5 py-0.5 rounded-full z-10 uppercase">
                  Soon
                </div>
              )}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${tool.comingSoon ? "bg-muted" : "bg-primary/10 group-hover:bg-primary/20"
                }`}>
                <tool.icon className={`w-5 h-5 ${tool.comingSoon ? "text-muted-foreground" : "text-primary"}`} />
              </div>
              <h3 className={`font-semibold text-sm mb-0.5 transition-colors ${tool.comingSoon ? "text-muted-foreground" : "text-foreground group-hover:text-primary"
                }`}>
                {tool.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {tool.description}
              </p>
            </button>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => {
              const toolsSection = document.getElementById("tools");
              if (toolsSection) toolsSection.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors group"
          >
            View all 20+ tools
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
