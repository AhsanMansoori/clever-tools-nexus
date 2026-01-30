import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { LucideIcon, HelpCircle, Shield, Zap, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolFAQ, { FAQItem } from "@/components/ToolFAQ";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface RelatedTool {
  name: string;
  path: string;
  icon: LucideIcon;
}

interface FloatingIconConfig {
  icon: LucideIcon;
  position: string;
  delay?: string;
}

interface ContentSection {
  title: string;
  content: ReactNode;
}

interface ToolPageLayoutProps {
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  floatingIcons?: FloatingIconConfig[];
  toolComponent: ReactNode;
  contentSections: ContentSection[];
  faqs?: FAQItem[];
  relatedTools?: RelatedTool[];
  heroCTA?: string;
  toolTitle?: string;
}

export default function ToolPageLayout({
  heroTitle,
  heroHighlight,
  heroDescription,
  floatingIcons = [],
  toolComponent,
  contentSections,
  faqs = [],
  relatedTools = [],
  toolTitle
}: ToolPageLayoutProps) {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/30">
      <Navbar />

      {/* Hero & Tool Area (Top Section) */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden border-b border-slate-100 relative">
        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          {floatingIcons.map((iconConfig, index) => {
            const IconComponent = iconConfig.icon;
            return (
              <IconComponent
                key={index}
                className={`absolute ${iconConfig.position} w-16 h-16 text-primary animate-float`}
                style={{ animationDelay: iconConfig.delay || "0s" }}
              />
            );
          })}
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase mb-6"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Free Document AI</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              {heroTitle} <br />
              <span className="text-blue-600">{heroHighlight}</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {heroDescription}
            </p>
          </div>

          {/* Centered Tool Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100 p-2 md:p-4">
              <div className="bg-slate-50/50 rounded-[24px] border border-dashed border-slate-200 p-6 md:p-12">
                {toolTitle && (
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-3">
                    <Zap className="w-6 h-6 text-blue-600" />
                    {toolTitle}
                  </h2>
                )}
                {toolComponent}
              </div>
            </div>

            {/* Quick Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" /> Secure Processing
              </div>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" /> No Registration
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" /> High Precision AI
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area (Bottom Section - Two Column) */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-10 gap-12">

            {/* Left Column (70%) - Educational SEO Content */}
            <div className="lg:col-span-7 space-y-16">
              {contentSections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="prose prose-slate prose-lg max-w-none"
                >
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-base font-bold">
                      {idx + 1}
                    </div>
                    {section.title}
                  </h2>
                  <div className="text-slate-600 leading-relaxed">
                    {section.content}
                  </div>
                </motion.div>
              ))}

              {/* FAQ within main column for SEO depth */}
              {faqs && faqs.length > 0 && (
                <div className="pt-8 border-t border-slate-100">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-blue-600" />
                    Frequently Asked Questions
                  </h2>
                  <ToolFAQ faqs={faqs} />
                </div>
              )}
            </div>

            {/* Right Column (30%) - Sticky Sidebar */}
            <aside className="lg:col-span-3">
              <div className="sticky top-32 space-y-6">
                {/* Stats/Quick Info Card */}
                <div className="bg-slate-900 rounded-[24px] p-6 text-white relative overflow-hidden">
                  <h3 className="text-lg font-bold mb-4 relative z-10">Quick Stats</h3>
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/10">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Avg Speed</span>
                      <span className="text-sm font-bold text-blue-400">0.8s</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/10">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Privacy</span>
                      <span className="text-sm font-bold text-blue-400">100% Secure</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/10">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Accuracy</span>
                      <span className="text-sm font-bold text-blue-400">99.9%</span>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Zap className="w-24 h-24" />
                  </div>
                </div>

                {/* Related Tools Card */}
                {relatedTools.length > 0 && (
                  <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      Related Tools
                    </h3>
                    <div className="space-y-3">
                      {relatedTools.map((tool, idx) => (
                        <Link
                          key={idx}
                          to={tool.path}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                            <tool.icon className="w-4 h-4 text-blue-600 group-hover:text-white" />
                          </div>
                          <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{tool.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Banner/Support Card */}
                <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <h3 className="font-bold text-slate-900 mb-3">Professional Grade AI</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    ToolifyHubs uses neural structural analysis to ensure your documents retain their visual integrity.
                  </p>
                  <Link to="/privacy-policy">
                    <Button variant="outline" className="w-full rounded-xl border-slate-200 text-slate-700 text-xs font-bold py-5">
                      View Privacy Policy
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
