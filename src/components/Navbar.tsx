import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Image, FileText,
  Sparkles, Home, Info, Mail, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const toolCategories = [
  {
    name: "AI Tools",
    icon: Sparkles,
    color: "from-blue-600 to-indigo-600",
    bgLight: "bg-blue-50",
    tools: [
      { name: "AI Word Formatter", link: "/word-formatter" },
    ],
  },
  {
    name: "PDF Tools",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50/50",
    tools: [
      { name: "Merge PDF", link: "/pdf/merge-pdf" },
      { name: "Split PDF", link: "/pdf/split-pdf" },
      { name: "Compress PDF", link: "/pdf/compress-pdf" },
      { name: "PDF to Word", link: "/pdf/pdf-to-word" },
      { name: "Word to PDF", link: "/pdf/word-to-pdf" },
    ],
  },
  {
    name: "Image Tools",
    icon: Image,
    color: "from-indigo-500 to-purple-500",
    bgLight: "bg-indigo-50/50",
    tools: [
      { name: "Image Compressor", link: "/image-compressor" },
      { name: "Image Resizer", link: "/image-resizer" },
      { name: "Format Converter", link: "/format-converter" },
    ],
  },
];

const NavItem = ({
  to,
  isActive,
  icon: Icon,
  children
}: {
  to: string;
  isActive: boolean;
  icon?: React.ElementType;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className={`relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 group ${isActive
      ? "text-primary"
      : "text-foreground/80 hover:text-primary"
      }`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    <span>{children}</span>
    <motion.div
      className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-full"
      initial={{ width: 0, x: "-50%" }}
      animate={{ width: isActive ? "60%" : 0, x: "-50%" }}
      whileHover={{ width: "60%" }}
      transition={{ duration: 0.2 }}
    />
  </Link>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsToolsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileToolsOpen(false);
    setExpandedMobileCategory(null);
  }, [location]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-white/90 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-b border-border/30 py-2"
        : "bg-gradient-to-b from-white/50 to-transparent backdrop-blur-sm py-4"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src="/logo.svg"
                className="relative w-10 h-10 md:w-11 md:h-11 transition-transform duration-300 group-hover:scale-110"
                alt="ToolifyHubs"
              />
            </motion.div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#29B6FF] via-[#6A3BFF] to-[#29B6FF] bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient_3s_linear_infinite]">
                Toolify Hubs
              </h1>
              <span className="text-[10px] text-muted-foreground/60 font-medium tracking-wider uppercase hidden md:block">
                Free Online Tools
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {/* AI Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
                setIsToolsOpen(true);
                setHoveredCategory("AI Tools");
              }}
              onMouseLeave={() => {
                dropdownTimer.current = setTimeout(() => {
                  setIsToolsOpen(false);
                  setHoveredCategory(null);
                }, 150);
              }}
            >
              <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${hoveredCategory === "AI Tools"
                ? "text-primary bg-primary/5"
                : "text-foreground/80 hover:text-primary"
                }`}>
                <Sparkles className="w-4 h-4" />
                <span>AI Tools</span>
                <motion.div
                  animate={{ rotate: hoveredCategory === "AI Tools" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isToolsOpen && hoveredCategory === "AI Tools" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.2)] border border-border/40 p-2 z-50 min-w-[240px]"
                  >
                    <div className="relative p-2 space-y-1">
                      {toolCategories.find(c => c.name === "AI Tools")?.tools.map((tool) => (
                        <Link
                          key={tool.name}
                          to={tool.link}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
                        >
                          <span>{tool.name}</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PDF Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
                setIsToolsOpen(true);
                setHoveredCategory("PDF Tools");
              }}
              onMouseLeave={() => {
                dropdownTimer.current = setTimeout(() => {
                  setIsToolsOpen(false);
                  setHoveredCategory(null);
                }, 150);
              }}
            >
              <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${hoveredCategory === "PDF Tools"
                ? "text-primary bg-primary/5"
                : "text-foreground/80 hover:text-primary"
                }`}>
                <FileText className="w-4 h-4" />
                <span>PDF Tools</span>
                <motion.div
                  animate={{ rotate: hoveredCategory === "PDF Tools" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isToolsOpen && hoveredCategory === "PDF Tools" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.2)] border border-border/40 p-2 z-50 min-w-[240px]"
                  >
                    <div className="relative p-2 space-y-1">
                      {toolCategories.find(c => c.name === "PDF Tools")?.tools.map((tool) => (
                        <Link
                          key={tool.name}
                          to={tool.link}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
                        >
                          <span>{tool.name}</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Image Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
                setIsToolsOpen(true);
                setHoveredCategory("Image Tools");
              }}
              onMouseLeave={() => {
                dropdownTimer.current = setTimeout(() => {
                  setIsToolsOpen(false);
                  setHoveredCategory(null);
                }, 150);
              }}
            >
              <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${hoveredCategory === "Image Tools"
                ? "text-primary bg-primary/5"
                : "text-foreground/80 hover:text-primary"
                }`}>
                <Image className="w-4 h-4" />
                <span>Image Tools</span>
                <motion.div
                  animate={{ rotate: hoveredCategory === "Image Tools" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isToolsOpen && hoveredCategory === "Image Tools" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.2)] border border-border/40 p-2 z-50 min-w-[240px]"
                  >
                    <div className="relative p-2 space-y-1">
                      {toolCategories.find(c => c.name === "Image Tools")?.tools.map((tool) => (
                        <Link
                          key={tool.name}
                          to={tool.link}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
                        >
                          <span>{tool.name}</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavItem to="/about" isActive={isActive("/about")} icon={Info}>
              About
            </NavItem>

            <NavItem to="/contact" isActive={isActive("/contact")} icon={Mail}>
              Contact
            </NavItem>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="ml-3"
            >
              <Button
                onClick={() => navigate('/word-formatter')}
                className="relative overflow-hidden bg-gradient-to-r from-primary via-primary to-purple-600 hover:shadow-lg hover:shadow-primary/25 text-primary-foreground px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Try AI Formatter
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-primary to-primary"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-muted/50 hover:bg-primary/10 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden mt-4 bg-white rounded-2xl p-4 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.15)] border border-border/40 max-h-[80vh] overflow-y-auto"
            >
              <div className="space-y-2">
                <Link
                  to="/"
                  className={`flex items-center gap-3 w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${isActive("/")
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:bg-muted/50"
                    }`}
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>

                <div>
                  <button
                    onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                    className="w-full flex justify-between items-center py-3 px-4 rounded-xl font-medium text-foreground hover:bg-muted/50 transition-all duration-300"
                  >
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5" />
                      Tools
                    </span>
                    <motion.div
                      animate={{ rotate: isMobileToolsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isMobileToolsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 space-y-2 pl-2"
                      >
                        {toolCategories.map((category, idx) => (
                          <motion.div
                            key={category.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="rounded-xl border border-border/30 overflow-hidden"
                          >
                            <button
                              onClick={() => setExpandedMobileCategory(
                                expandedMobileCategory === category.name ? null : category.name
                              )}
                              className={`w-full flex items-center justify-between p-3 transition-all duration-300 ${expandedMobileCategory === category.name
                                ? category.bgLight
                                : "bg-muted/20 hover:bg-muted/40"
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} shadow-md`}>
                                  <category.icon className="w-4 h-4 text-white" />
                                </div>
                                <div className="text-left">
                                  <span className="font-medium text-sm block">{category.name}</span>
                                  <span className="text-[10px] text-muted-foreground">{category.tools.length} tools</span>
                                </div>
                              </div>
                              <motion.div
                                animate={{ rotate: expandedMobileCategory === category.name ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              </motion.div>
                            </button>
                            <AnimatePresence>
                              {expandedMobileCategory === category.name && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="bg-white"
                                >
                                  {category.tools.map((tool, toolIdx) => (
                                    <motion.div
                                      key={tool.name}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: toolIdx * 0.03 }}
                                    >
                                      <Link
                                        to={tool.link}
                                        className={`flex items-center justify-between py-3 px-4 text-sm transition-all duration-200 border-t border-border/10 ${isActive(tool.link)
                                          ? `bg-gradient-to-r ${category.color} text-white`
                                          : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                                          }`}
                                      >
                                        {tool.name}
                                        <ChevronRight className="w-4 h-4" />
                                      </Link>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/about"
                  className={`flex items-center gap-3 w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${isActive("/about")
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:bg-muted/50"
                    }`}
                >
                  <Info className="w-5 h-5" />
                  About
                </Link>

                <Link
                  to="/contact"
                  className={`flex items-center gap-3 w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${isActive("/contact")
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:bg-muted/50"
                    }`}
                >
                  <Mail className="w-5 h-5" />
                  Contact
                </Link>

                <div className="pt-3">
                  <Button
                    onClick={() => scrollToSection("tools")}
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg text-primary-foreground py-3 rounded-xl font-semibold"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Explore All Tools
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add gradient animation keyframes */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
