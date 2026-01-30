import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  // Reduced to 8 focused FAQs
  const faqs = [
    {
      question: "Is ToolifyHubs free to use?",
      answer: "Yes, completely free. All tools are available at no cost with no hidden fees, premium tiers, or feature limitations."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account or registration required. Access any tool immediately without signing up or providing personal information."
    },
    {
      question: "Are my files stored on your servers?",
      answer: "No, files are never uploaded. All processing happens in your browser — your data never leaves your device."
    },
    {
      question: "Is it safe for sensitive documents?",
      answer: "Absolutely. Since processing occurs locally in your browser, sensitive documents and images remain completely private."
    },
    {
      question: "Does it work on mobile devices?",
      answer: "Yes, fully responsive on smartphones, tablets, and desktops. The interface adapts to any screen size."
    },
    {
      question: "Are there any usage limits?",
      answer: "No limits. Use any tool as many times as needed — no throttling, daily caps, or restrictions."
    },
    {
      question: "How accurate are the tools?",
      answer: "Our tools use industry-standard formulas and regularly updated data sources for reliable, accurate results."
    },
    {
      question: "How can I request a new tool?",
      answer: "Visit our Contact page to submit suggestions. We prioritize features based on user demand."
    }
  ];

  return (
    <section id="faq" className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Quick answers about ToolifyHubs. Need more help? <Link to="/#contact" className="text-primary hover:underline">Contact us</Link>.
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-4 md:p-5 rounded-xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/30 last:border-0">
                  <AccordionTrigger className="text-left text-foreground hover:text-primary text-sm md:text-base py-3">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
