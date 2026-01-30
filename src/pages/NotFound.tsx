import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-12 h-12 text-blue-600" />
          </div>

          <h1 className="text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">404</h1>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">This tool has been retired.</h2>

          <p className="text-slate-600 mb-10 leading-relaxed">
            We've upgraded our suite to focus on high-performance AI document tools.
            The page you're looking for no longer exists, but we have something much better for you.
          </p>

          <div className="space-y-4">
            <Link to="/word-formatter">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl text-lg font-bold shadow-lg shadow-blue-500/20 group">
                Try AI Word Formatter
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link to="/">
              <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-900 py-6">
                <Home className="mr-2 w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            ToolifyHubs Intelligent Suite
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
