import { Sparkles, CheckCircle2, FileText, ShieldCheck } from "lucide-react";

const AIFeatureSpotlight = () => {
    return (
        <section id="ai-feature" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                                <Sparkles className="w-3 h-3" />
                                <span>Premium Feature</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                Elevate Your Documents with <span className="text-primary">AI Word Formatter</span>
                            </h2>

                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Our flagship AI Tool doesn't just "change" your file; it understands it. Transform messy drafts into professional documents in seconds with advanced structural analysis.
                            </p>

                            <ul className="space-y-4 pt-2">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-3 h-3 text-primary" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-foreground">Fix Broken Formatting:</span>
                                        <span className="text-muted-foreground ml-1">Instantly repair inconsistent indentation, bullet points, and margin errors.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-3 h-3 text-primary" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-foreground">Normalize Document Styles:</span>
                                        <span className="text-muted-foreground ml-1">Enforce consistent font usage and paragraph spacing across entire long-form documents.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-3 h-3 text-primary" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-foreground">Intelligent Clean-up:</span>
                                        <span className="text-muted-foreground ml-1">Automatically remove redundant spaces, hidden characters, and "ghost" line breaks that ruin layouts.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="flex-1 w-full max-w-md">
                            <div className="relative">
                                {/* Decorative background for the card */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-2xl opacity-50" />

                                <div className="relative bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
                                    <div className="bg-muted p-4 border-b border-border/50 flex items-center justify-between">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                                        </div>
                                        <span className="text-[10px] font-mono text-muted-foreground uppercase opacity-70">AI Processor v2.4</span>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                                        <div className="h-4 w-full bg-muted animate-pulse rounded" />
                                        <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />

                                        <div className="pt-4 flex justify-center">
                                            <div className="w-full h-32 rounded-lg border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-3 bg-primary/5">
                                                <FileText className="w-10 h-10 text-primary/40" />
                                                <span className="text-xs text-primary/60 font-medium tracking-tight">Processing document via Neural Engine...</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 pt-2">
                                            <ShieldCheck className="w-5 h-5 text-green-500" />
                                            <span className="text-xs font-medium text-muted-foreground">End-to-end Encrypted & No-Log Verified</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How It Works Sub-section */}
                    <div className="mt-20 pt-16 border-t border-border/50">
                        <h3 className="text-2xl font-bold text-center mb-12">How It Works</h3>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div className="space-y-3 px-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                    <span className="text-xl font-bold text-primary">1</span>
                                </div>
                                <h4 className="text-lg font-semibold">Upload Your File</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Drag and drop your document into our secure interface. We support all major word and PDF formats.
                                </p>
                            </div>

                            <div className="space-y-3 px-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                    <span className="text-xl font-bold text-primary">2</span>
                                </div>
                                <h4 className="text-lg font-semibold">AI Processing</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Our intelligent engine analyzes and optimizes your file structure in real-time, fixing formatting ghosts instantly.
                                </p>
                            </div>

                            <div className="space-y-3 px-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                    <span className="text-xl font-bold text-primary">3</span>
                                </div>
                                <h4 className="text-lg font-semibold">Secure Download</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Grab your perfected file instantly. Your data is automatically deleted from our secure cache in 60 minutes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AIFeatureSpotlight;
