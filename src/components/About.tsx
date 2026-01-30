import { Shield, Zap, Sparkles, Lock } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              Why ToolifyHubs
            </h2>
            <p className="text-muted-foreground text-sm">
              Built for students, professionals, and everyday users.
            </p>
          </div>

          {/* Trust Points - 4 compact cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-4 rounded-xl text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-0.5">No Registration</h3>
              <p className="text-xs text-muted-foreground">
                Use instantly, no account needed.
              </p>
            </div>

            <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-4 rounded-xl text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-0.5">Secure Processing</h3>
              <p className="text-xs text-muted-foreground">
                Files stay on your device.
              </p>
            </div>

            <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-4 rounded-xl text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-0.5">Works in Browser</h3>
              <p className="text-xs text-muted-foreground">
                No downloads required.
              </p>
            </div>

            <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-4 rounded-xl text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-0.5">Free Forever</h3>
              <p className="text-xs text-muted-foreground">
                No hidden fees or tiers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
