import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MessageSquare, Send, Clock, ShieldCheck, Headphones } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as never });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: `Subject: ${formData.subject}\n\n${formData.message}`,
        },
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We will get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Helmet>
        <title>Support & Contact | ToolifyHubs Enterprise Support</title>
        <meta name="description" content="Need help with our AI tools? Contact ToolifyHubs enterprise support. Fast response times and dedicated document assistance." />
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Support Center</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                  How can we <span className="text-blue-600">help you?</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl">
                  Whether you're reporting a bug, requesting a new AI feature, or need help with a document,
                  our team is here to provide enterprise-grade support.
                </p>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form (Left 2/3) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                        <Input
                          placeholder="Jane Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="rounded-xl border-slate-200 focus:ring-blue-500 py-6"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                        <Input
                          type="email"
                          placeholder="jane@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="rounded-xl border-slate-200 focus:ring-blue-500 py-6"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                      <Input
                        placeholder="e.g., Feature Request: AI Batch Processing"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="rounded-xl border-slate-200 focus:ring-blue-500 py-6"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                      <Textarea
                        placeholder="How can we assist you today? Please be as descriptive as possible."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="rounded-2xl border-slate-200 focus:ring-blue-500 min-h-[200px] py-4"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-7 px-10 rounded-2xl shadow-lg shadow-blue-500/20 transition-all text-lg"
                    >
                      {isSubmitting ? "Sending Ticket..." : "Submit Support Ticket"}
                      <Send className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Support Info Sidebar (Right 1/3) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-xl font-bold">Support Information</h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">Response Time</div>
                          <div className="text-slate-400 text-sm">Under 24 Hours</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">Direct Email</div>
                          <div className="text-slate-400 text-sm">support@toolifyhubs.com</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <ShieldCheck className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">Privacy First</div>
                          <div className="text-slate-400 text-sm">Encrypted processing</div>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10" />

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 leading-relaxed">
                      <strong>Pro Tip:</strong> For bug reports, please include your browser version and the type of file you were processing.
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Community Links
                  </h4>
                  <div className="space-y-3">
                    {["API Documentation", "Brand Assets", "Developer Portal"].map((link) => (
                      <div key={link} className="text-sm text-slate-500 hover:text-blue-600 cursor-not-allowed flex items-center justify-between group">
                        {link}
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-400">Soon</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
