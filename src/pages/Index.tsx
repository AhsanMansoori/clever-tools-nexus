import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Lock,
  Globe,
  FileText,
  Image as ImageIcon,
  Scissors,
  Files,
  Archive,
  Layers,
  ChevronDown,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const faqs = [
    {
      question: "Is ToolifyHubs actually free?",
      answer: "Yes, 100%. Our platform is supported by non-intrusive advertisements, allowing us to provide enterprise-grade document tools like our AI Formatter and PDF Suite at zero cost to the user."
    },
    {
      question: "Do I need to create an account to process files?",
      answer: "No registration is required. We believe in high-velocity productivity, so you can upload, process, and download your files instantly without sharing your personal information."
    },
    {
      question: "How secure are my uploaded documents?",
      answer: "We use banking-standard 256-bit SSL encryption for all transfers. Furthermore, our 'Zero-Log' policy ensures that all files are automatically purged from our ephemeral servers within 60 minutes."
    },
    {
      question: "Does the AI Formatter work with APA/MLA styles?",
      answer: "Absolutely. Our neural engine recognizes structural markers for APA, MLA, Chicago, and custom institutional formats, ensuring your margins, citations, and headers are pixel-perfect."
    }
  ];

  const toolCategories = [
    {
      title: "Popular PDF Tools",
      items: [
        { name: "AI Word Formatter", path: "/word-formatter", icon: Sparkles, badge: "New", color: "text-blue-600 bg-blue-50" },
        { name: "Merge PDF", path: "/pdf/merge-pdf", icon: Files, color: "text-slate-600 bg-slate-50" },
        { name: "Split PDF", path: "/pdf/split-pdf", icon: Scissors, color: "text-slate-600 bg-slate-50" },
        { name: "Compress PDF", path: "/pdf/compress-pdf", icon: Archive, color: "text-slate-600 bg-slate-50" },
        { name: "PDF to JPG", path: "/pdf/pdf-to-jpg", icon: FileText, color: "text-slate-600 bg-slate-50" },
      ]
    },
    {
      title: "Image Optimization",
      items: [
        { name: "Image Compressor", path: "/image-compressor", icon: ImageIcon, color: "text-slate-600 bg-slate-50" },
        { name: "Image Resizer", path: "/image-resizer", icon: Layers, color: "text-slate-600 bg-slate-50" },
        { name: "Format Converter", path: "/format-converter", icon: Globe, color: "text-slate-600 bg-slate-50" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      <Helmet>
        <title>ToolifyHubs | AI-Powered Document Management Suite</title>
        <meta name="description" content="Streamline your workflow with our flagship AI Word Formatter and secure PDF tools. Enterprise-grade precision and total privacy for digital workers." />
      </Helmet>

      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold uppercase tracking-wider mb-10"
            >
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Document AI</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter mb-10">
              Master Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Documents with AI.</span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-12">
              Format, convert, and compress files instantly with high-fidelity neural processing.
              Enterprise-grade security, 100% free forever.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button
                size="lg"
                onClick={() => scrollToSection('tools')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-8 rounded-2xl text-lg font-bold shadow-xl shadow-blue-500/30 group transition-all"
              >
                Explore Tools
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/about')}
                className="px-10 py-8 rounded-2xl text-lg font-bold border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Learn More
              </Button>
            </div>

            {/* Feature Row (Visual Proof) */}
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-16">
              {[
                "No Sign-up Required",
                "Files Deleted in 1 Hour",
                "100% Free Forever"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-600 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  {text}
                </div>
              ))}
            </div>

            {/* Trust Strip Icons */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {[
                { icon: Globe, text: "Browser-based" },
                { icon: CheckCircle2, text: "SSL Encrypted" },
                { icon: ShieldCheck, text: "Open XML native" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  <item.icon className="w-4 h-4 text-slate-400" />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hero Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl -z-10 -mr-48 -mt-24" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl -z-10 -ml-48 -mb-24" />
      </section>

      {/* 2. Why Choose Us Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Precision Meets Productivity",
                desc: "Our neural engine doesn't just process text; it understands structure. Achieve pixel-perfect formatting for APA, MLA, and professional standards in seconds.",
                icon: Zap,
                color: "bg-blue-50 text-blue-600"
              },
              {
                title: "Privacy You Can Trust",
                desc: "Security isn't an option—it's our foundation. With banking-grade encryption and an automated 60-minute purge policy, your data never leaves your control.",
                icon: Shield,
                color: "bg-green-50 text-green-600"
              },
              {
                title: "Built for the Modern Workflow",
                desc: "Zero installations. Zero registration. ToolifyHubs is 100% browser-based, designed to fit seamlessly into the life of the modern digital nomad.",
                icon: Globe,
                color: "bg-indigo-50 text-indigo-600"
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-8`}>
                  <card.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Tool Dashboard Section */}
      <section id="tools" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Document & <span className="text-blue-600">Media</span> Management
              </h2>
              <p className="text-lg text-slate-600">
                A comprehensive suite of intelligence tools designed for professional precision.
              </p>
            </div>
          </div>

          <div className="space-y-20">
            {toolCategories.map((category, catIdx) => (
              <div key={catIdx}>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
                  {category.title}
                  <div className="h-px bg-slate-100 flex-1" />
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {category.items.map((tool, toolIdx) => (
                    <Link
                      key={toolIdx}
                      to={tool.path}
                      className="group relative p-6 md:p-8 rounded-[24px] bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-blue-500 active:scale-[0.98]"
                    >
                      <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                        <tool.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-900 truncate">{tool.name}</h4>
                          {tool.badge && (
                            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-5 h-5 text-blue-600" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Privacy & Security Bar */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Privacy & Security First</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Lock, title: "No Account", desc: "Start processing instantly." },
              { icon: Zap, title: "Local Processing", desc: "Your data stays in control." },
              { icon: ShieldCheck, title: "HTTPS Secure", desc: "256-bit SSL encryption." },
              { icon: Clock, title: "No Storage", desc: "All files purged in 1 hour." }
            ].map((feat, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-2 text-blue-400">
                  <feat.icon className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-xl">{feat.title}</h4>
                <p className="text-slate-400 text-sm max-w-[160px] mx-auto">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* 5. FAQ Accordion Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-slate-900 mb-12 text-center tracking-tight">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-100 overflow-hidden transition-all hover:border-blue-100 group"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left group-hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-bold text-slate-900">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === idx ? 180 : 0 }}
                      className="text-slate-400 group-hover:text-blue-600 transition-colors"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="py-32 bg-slate-50/50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="grid md:grid-cols-2 gap-16 text-left">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Get in Touch</h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Have a suggestion for a new AI tool or need technical support?
                  Our team of engineers is ready to assist you. Report bugs or request enterprise features directly.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                    <a href="mailto:toolifyhubs@gmail.com" className="font-bold text-slate-900 hover:text-blue-600">toolifyhubs@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
              <form className="space-y-4">
                <Input placeholder="Full Name" className="rounded-xl border-slate-200 py-6" />
                <Input placeholder="Email Address" type="email" className="rounded-xl border-slate-200 py-6" />
                <Textarea placeholder="How can we help?" className="rounded-xl border-slate-200 min-h-[150px]" />
                <Button className="w-full bg-slate-900 hover:bg-black text-white py-8 rounded-xl font-bold flex gap-2">
                  Send Message
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <Footer />

      {/* Scroll Top */}
      {showScrollTop && (
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          size="icon"
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl animate-in fade-in zoom-in duration-300"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      {/* Organization Schema for AdSense Visibility */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ToolifyHubs",
            "url": "https://www.toolifyhubs.com",
            "logo": "https://www.toolifyhubs.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "toolifyhubs@gmail.com",
              "contactType": "customer service"
            }
          })
        }}
      />
    </div>
  );
};

export default Index;
