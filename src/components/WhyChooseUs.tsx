import { ShieldCheck, Target, Cpu } from "lucide-react";

const WhyChooseUs = () => {
    return (
        <section id="why-choose-us" className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Why Choose ToolifyHubs?
                    </h2>
                    <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-1 gap-12 max-w-5xl mx-auto">
                    {/* Paragraph 1 */}
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/10">
                            <Target className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-2xl font-bold mb-3 text-foreground">Precision Meets Productivity</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Most online converters strip away your hard work, leaving you with mangled fonts and broken tables.
                                ToolifyHubs is different. Our platform is engineered with AI-driven logic that understands document
                                structure, ensuring that every conversion—from PDF to Word or Image to Text—retains its original professional polish.
                            </p>
                        </div>
                    </div>

                    {/* Paragraph 2 */}
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-16 h-16 rounded-2xl bg-green-500/5 flex items-center justify-center flex-shrink-0 border border-green-500/10">
                            <ShieldCheck className="w-8 h-8 text-green-500" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-2xl font-bold mb-3 text-foreground">Privacy You Can Trust</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                In an era of data mining, your documents deserve a safe haven. We operate under a strict "No-Log" privacy policy.
                                Unlike other platforms that harvest your data, our system processes your files locally and automatically wipes
                                all trace of your uploads from our temporary cache within 1 hour. No accounts, no data selling, just pure security.
                            </p>
                        </div>
                    </div>

                    {/* Paragraph 3 */}
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/5 flex items-center justify-center flex-shrink-0 border border-amber-500/10">
                            <Cpu className="w-8 h-8 text-amber-500" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-2xl font-bold mb-3 text-foreground">Built for the Modern Workflow</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Whether you're a freelancer polishing a contract, a student submitting a thesis, or a remote professional
                                managing bulky assets, ToolifyHubs provides the enterprise-grade tools you need for free. We’ve eliminated
                                the friction of expensive software suites, giving you a lightning-fast, edge-computed environment for all your document needs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
