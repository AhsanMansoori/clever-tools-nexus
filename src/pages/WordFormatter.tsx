import { Sparkles } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import WordFormatterTool from "@/components/tools/WordFormatter";
const WordFormatterPage = () => {
  const faqs = [
    { question: "How does the AI know my formatting style?", answer: "Our engine detects headers, lists, and emphasis based on font hierarchy and semantic spacing relative to the document body." },
    { question: "Does this work on complex legal briefs?", answer: "Yes, it is specifically tuned to standardize indentation, line spacing, and citation clusters in professional legal and academic documents." },
    { question: "Will it fix my broken Table of Contents?", answer: "It normalizes the heading levels so that generating a fresh Table of Contents in Word becomes a one-click process." },
    { question: "Can I undo the AI's formatting?", answer: "Since we provide a new download, your original file remains untouched. You can always revert to your initial version." },
    { question: "Does it support non-English documents?", answer: "Yes, our structural analysis is based on document layout and character clusters, making it effective for most major languages." }
  ];

  const seoContent = (
    <div className="space-y-16">
      <section>
        <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-blue-600" />
          The Specific Cure for Formatting Debt
        </h2>
        <p className="text-slate-600 leading-relaxed font-medium text-lg">
          Manual document preparation is a drain on creative energy. Whether you're
          finalizing a legal brief, a dissertation, or a corporate report,
          ToolifyHubs leverages a Neural Layout Engine to restore structural
          integrity to your files. We don't just 'tidy up'—we rebuild the
          underlying XML structure to ensure consistent margins, perfect
          indents, and uniform typography across 100+ pages.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "APA/MLA Mastery", desc: "Instantly align your academic papers with precise institutional guidelines." },
          { title: "Legal Consistency", desc: "Normalize disparate inputs into a single, cohesive industrial structure." },
          { title: "XML Stabilization", desc: "Remove 'ghost' line breaks and corruption that break Office layouts." }
        ].map((item, i) => (
          <div key={i} className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="font-black text-slate-900 text-lg mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-50 rounded-full group-hover:scale-125 transition-transform" />
          </div>
        ))}
      </div>

      <section className="p-10 bg-slate-900 rounded-[48px] text-white">
        <div className="max-w-3xl">
          <h3 className="text-3xl font-black mb-6 underline decoration-blue-500 underline-offset-8">Human-Like Layout Awareness</h3>
          <p className="text-slate-400 leading-relaxed mb-8">
            Unlike generic scripts, our AI analyzes semantic context. It knows the
            difference between a multi-line header and a standard paragraph,
            ensuring that styles are applied intelligently where they belong.
            The result is a high-fidelity output that looks hand-crafted by
            a professional typesetter.
          </p>
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-blue-500" />)}
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-400">Trusted by researchers worldwide</span>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <ToolLayout
      title="Precision AI Formatter"
      description="Transform messy drafts into industry-standard documents with human-like structural awareness. Our engine identifies headings, fixes indents, and normalizes fonts instantly."
      icon={Sparkles}
      seoContent={seoContent}
      faqs={faqs}
      seoTitle="AI Word Document Formatter – Style Normalization | ToolifyHubs"
      seoDescription="Use AI to automatically format Word documents. Apply professional styles, fix layouts, and stabilize document XML structure instantly."
    >
      <WordFormatterTool />
    </ToolLayout>
  );
};

export default WordFormatterPage;
