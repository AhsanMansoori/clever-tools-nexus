import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Sparkles, Shield, Rocket, FileCheck, Users, Lock } from "lucide-react";

const stats = [
  { label: "Files Processed", value: "2M+", icon: FileCheck },
  { label: "Active Users", value: "50k+", icon: Users },
  { label: "Servers Secure", value: "99.9%", icon: Lock },
];

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as never });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Our Mission | ToolifyHubs - Intelligent Document AI</title>
        <meta name="description" content="Learn about ToolifyHubs' mission to democratize professional document tools through AI. Secure, private, and always free." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-10"
            >
              <Rocket className="w-3.5 h-3.5 fill-current" />
              <span>Moving Intelligence Forward</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-tight mb-8 tracking-tighter">
              Our Mission: <br />
              <span className="text-blue-600">Democratizing Documents.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-16">
              We believe that professional-grade AI document management should be a right, not a luxury.
              ToolifyHubs provides high-performance precision tools that respect your privacy and stay free forever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-20 border-y border-slate-100 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-transparent hover:border-blue-100"
              >
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-4xl font-black text-slate-900 mb-2">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-slate-900 mb-6 flex items-center justify-center gap-4">
                  <Sparkles className="w-10 h-10 text-blue-600" />
                  The AI Evolution
                </h2>
                <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
              </div>

              <div className="prose prose-slate prose-xl max-w-none">
                <p className="text-slate-600 leading-relaxed font-medium">
                  ToolifyHubs began as a directory of simple web tools, but we quickly realized the digital world was changing.
                  Professionals and students were struggling with "broken" documents—mangled formatting and privacy compromises.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We rebuilt ToolifyHubs from the ground up as a **privacy-first, AI-driven platform**.
                  Our goal is to eliminate the need for expensive subscriptions while providing
                  security and precision for everyone, everywhere.
                </p>
              </div>

              <div className="p-12 rounded-[40px] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                  <Shield className="w-64 h-64" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Our Integrity Guarantee</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                  We operate on a "Zero-Log" philosophy. Your files are processed in ephemeral
                  environments and are purged automatically within 1 hour. We don't train our models
                  on your data, period.
                </p>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-3 text-sm font-bold text-blue-400 uppercase tracking-widest">
                    <Lock className="w-5 h-5" /> 256-bit Encryption
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-blue-400 uppercase tracking-widest">
                    <Shield className="w-5 h-5" /> GDPR & CCPA Compliance
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
