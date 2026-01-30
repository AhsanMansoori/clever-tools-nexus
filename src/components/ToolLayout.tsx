import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { LucideIcon, Shield, Zap, CheckCircle2, ArrowLeft, MessageCircleQuestion } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface FAQ {
    question: string;
    answer: string;
}

interface ToolLayoutProps {
    title: string;
    description: string;
    icon: LucideIcon;
    children: ReactNode;
    seoContent?: ReactNode;
    faqs?: FAQ[];
    seoTitle?: string;
    seoDescription?: string;
}

export default function ToolLayout({
    title,
    description,
    icon: Icon,
    children,
    seoContent,
    faqs = [],
    seoTitle,
    seoDescription
}: ToolLayoutProps) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
            <Helmet>
                <title>{seoTitle || `${title} | ToolifyHubs`}</title>
                <meta name="description" content={seoDescription || description} />
            </Helmet>
            <Navbar />

            {/* Hero Section with Mesh Background */}
            <header className="relative pt-32 pb-16 bg-white border-b border-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

                <div className="container relative mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-8 transition-colors group"
                        >
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Free Document AI
                            </Badge>
                        </motion.div>

                        <div className="w-20 h-20 bg-white shadow-xl shadow-blue-500/5 border border-slate-100 text-blue-600 rounded-[24px] flex items-center justify-center mx-auto mb-8 relative group">
                            <div className="absolute inset-0 bg-blue-500/5 rounded-[24px] blur-xl group-hover:blur-2xl transition-all" />
                            <Icon className="w-10 h-10 relative" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.05)] bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-700">
                            {title}
                        </h1>

                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                            {description}
                        </p>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                            {[
                                { icon: Shield, text: "Secure SSL" },
                                { icon: Zap, text: "AI-Powered" },
                                { icon: CheckCircle2, text: "100% Free" }
                            ].map((badge, i) => (
                                <div key={i} className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px]">
                                    <badge.icon className="w-4 h-4 text-blue-500" />
                                    {badge.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Tool Container */}
            <main className="py-20 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-slate-200/60 overflow-hidden">
                            {children}
                        </div>
                    </motion.div>

                    {/* SEO / Content Section */}
                    {seoContent && (
                        <motion.section
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto mt-32 prose prose-slate prose-lg lg:prose-xl prose-headings:font-black prose-h2:text-3xl prose-h2:tracking-tight"
                        >
                            <div className="h-px bg-gradient-to-r from-blue-600 to-transparent w-24 mb-12" />
                            {seoContent}
                        </motion.section>
                    )}

                    {/* FAQ Section */}
                    {faqs && faqs.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-3xl mx-auto mt-32 mb-20"
                        >
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                                    <MessageCircleQuestion className="w-3 h-3" />
                                    Help Center
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
                            </div>

                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="bg-white border border-slate-200/60 rounded-2xl px-6 transition-all hover:border-blue-200"
                                    >
                                        <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline py-6">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.section>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
