import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById("tools");
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-[85vh] flex items-center justify-center relative overflow-hidden pt-24 pb-16 bg-gradient-to-b from-white to-blue-50/30">
      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-indigo-400/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-blue-100 text-blue-600 text-xs font-bold tracking-wider uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Next-Gen Document AI Suite</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
          >
            The Intelligent Way to <br className="hidden md:block" />
            <span className="text-blue-600">Manage Documents.</span>
          </motion.h1>

          {/* Subheadline - Long & Descriptive for SEO */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Fix broken formatting, convert PDFs, and optimize images with enterprise-grade AI.
            ToolifyHubs provides a secure, private, and 100% free workflow for students,
            freelancers, and businesses worldwide. No registration required.
          </motion.p>

          {/* Key CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => window.location.href = '/word-formatter'}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-lg font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all font-sans"
              >
                Try AI Word Formatter
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={scrollToTools}
                size="lg"
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-slate-200 text-slate-700 hover:bg-slate-50 px-10 py-7 text-lg font-bold rounded-2xl font-sans"
              >
                Explore All Tools
              </Button>
            </motion.div>
          </motion.div>

          {/* Professional Credentials Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: "100% Free", icon: Zap },
              { label: "Zero Logs", icon: Shield },
              { label: "AI Precision", icon: Sparkles },
              { label: "Secure SSL", icon: Shield }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 bg-white/50 py-2 rounded-xl border border-slate-100 px-4">
                <item.icon className="w-4 h-4 text-blue-500" />
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-blue-200 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-2.5 bg-blue-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
