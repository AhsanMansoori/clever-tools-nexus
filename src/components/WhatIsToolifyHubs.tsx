import { Lock, Sparkles, Zap, Users, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const WhatIsToolifyHubs = () => {
  return (
    <section id="what-is-toolifyhubs" className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-5">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              What is ToolifyHubs?
            </h2>
          </div>

          <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-5 md:p-6 rounded-xl">
            {/* Concise intro */}
            <div className="text-muted-foreground leading-relaxed text-sm md:text-base space-y-3">
              <p>
                <strong className="text-foreground">ToolifyHubs is a free online tools platform</strong> designed
                to simplify everyday digital tasks — document formatting, file conversions, image editing, and PDF management.
                No downloads, no registration, no fees.
              </p>

              <p>
                Every tool runs directly in your browser, so your files and data never leave your device.
                From <Link to="/word-formatter" className="text-primary hover:underline">AI formatting</Link> to
                <Link to="/#tools" className="text-primary hover:underline ml-1">PDF tools</Link>,
                we deliver instant results with complete privacy.
              </p>
            </div>

            {/* Key Benefits Grid - more compact */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-5 pt-5 border-t border-border/50">
              <div className="flex flex-col items-center gap-1 text-center">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground">Browser-based</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground">100% free</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground">Privacy-first</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground">No signup</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground">Works anywhere</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground">No data stored</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsToolifyHubs;
