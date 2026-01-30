import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Home, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Helmet>
        <title>Page Retired | ToolifyHubs</title>
        <meta name="description" content="This legacy page has been retired. ToolifyHubs has evolved into a professional AI Document Tool suite." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Ghost className="w-12 h-12 text-blue-600" />
          </div>

          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Page Retired.</h1>
          <h2 className="text-xl font-bold text-slate-800 mb-6 font-mono text-blue-600">404 - Evolution in Progress</h2>

          <p className="text-slate-600 mb-10 leading-relaxed text-lg">
            ToolifyHubs has evolved. We have replaced our legacy calculators with professional
            <span className="font-bold text-slate-900"> AI Document Tools </span>
            to better serve your digital workflow.
          </p>

          <div className="space-y-4">
            <Link to="/">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-8 rounded-2xl text-lg font-bold shadow-xl shadow-blue-500/20 group transition-all">
                Explore AI Tools
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link to="/word-formatter">
              <Button variant="ghost" className="w-full text-slate-500 hover:text-blue-600 py-6 font-semibold">
                Try AI Word Formatter
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">
            ToolifyHubs Intelligent Suite
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
