import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTools = () => {
    setTimeout(() => {
      document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <footer className="py-12 mt-12 border-t border-border/50 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/logo.svg"
                alt="Toolify Hubs Logo"
                className="w-12 h-12"
              />
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#29B6FF] to-[#6A3BFF] bg-clip-text text-transparent">
                  Toolify Hubs
                </h2>
                <p className="text-xs text-muted-foreground">
                  Free Online Tools Platform
                </p>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground max-w-xl mb-6 leading-relaxed">
              ToolifyHubs is a premier AI-powered document management platform dedicated to streamlining productivity
              for students, freelancers, and remote workers worldwide. We specialize in providing high-performance
              online productivity tools, including our flagship AI document formatting engine, free PDF converter,
              and secure file compression utilities.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-primary/80 mb-6">
              <span>AI Document Formatting</span>
              <span>•</span>
              <span>Free PDF Converter</span>
              <span>•</span>
              <span>Secure File Compression</span>
              <span>•</span>
              <span>Online Productivity Tools</span>
            </div>

            {/* External Badge (Safe) */}
            <a
              href="https://www.nxgntools.com/tools/toolify-hubs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4"
            >
              <img
                src="https://www.nxgntools.com/api/embed/toolify-hubs?type=FIND_US_ON"
                alt="Find Toolify Hubs on NextGen Tools"
                className="h-10 w-auto"
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link></li>
              <li>
                <Link
                  to="/"
                  onClick={scrollToTools}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  All Tools
                </Link>
              </li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
              <li><Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-primary">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Toolify Hubs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
