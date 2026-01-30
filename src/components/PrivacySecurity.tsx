import { Shield, Lock, Server, UserX } from "lucide-react";

const PrivacySecurity = () => {
  return (
    <section id="privacy-security" className="py-10 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Privacy & Security First
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Your privacy matters. All processing happens in your browser — files never leave your device.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-4 rounded-xl">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <UserX className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-sm">No Account</h4>
                <p className="text-muted-foreground text-xs">
                  No signup, no tracking.
                </p>
              </div>
            </div>

            <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-4 rounded-xl">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-sm">Local Processing</h4>
                <p className="text-muted-foreground text-xs">
                  Works in your browser.
                </p>
              </div>
            </div>

            <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-4 rounded-xl">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-sm">HTTPS Secure</h4>
                <p className="text-muted-foreground text-xs">
                  Encrypted connection.
                </p>
              </div>
            </div>

            <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-4 rounded-xl">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-sm">No Storage</h4>
                <p className="text-muted-foreground text-xs">
                  Files not retained.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySecurity;
