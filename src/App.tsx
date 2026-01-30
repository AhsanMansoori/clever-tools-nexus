import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";

// Lazy load pages for code splitting and faster initial load
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FormatConverterPage = lazy(() => import("./pages/FormatConvertor"));
const ImageResizerPage = lazy(() => import("./pages/ImageResizer"));
const ImageCompressorPage = lazy(() => import("./pages/ImageCompressor"));
const PrivacyPolicyPage = lazy(() => import("./pages/privacy-policy"));
const CookiePolicyPage = lazy(() => import("./pages/cookie-policy"));
const TermsAndConditionsPage = lazy(() => import("./pages/terms-and-conditions"));
const DisclaimerPage = lazy(() => import("./pages/disclaimer"));
const AboutPage = lazy(() => import("./pages/about"));
const ContactPage = lazy(() => import("./pages/contact"));
const MergePdfPage = lazy(() => import("./pages/MergePdf"));
const PdfToWordPage = lazy(() => import("./pages/PdfToWord"));
const SplitPdfPage = lazy(() => import("./pages/SplitPdf"));
const WordToPdfPage = lazy(() => import("./pages/WordToPdf"));
const CompressPdfPage = lazy(() => import("./pages/CompressPdf"));
const PdfToJpgPage = lazy(() => import("./pages/PdfToJpg"));
const WordFormatterPage = lazy(() => import("./pages/WordFormatter"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-500 font-medium animate-pulse">Loading ToolifyHubs...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/format-converter" element={<FormatConverterPage />} />
              <Route path="/image-resizer" element={<ImageResizerPage />} />
              <Route path="/image-compressor" element={<ImageCompressorPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/pdf/merge-pdf" element={<MergePdfPage />} />
              <Route path="/pdf/pdf-to-word" element={<PdfToWordPage />} />
              <Route path="/pdf/split-pdf" element={<SplitPdfPage />} />
              <Route path="/pdf/word-to-pdf" element={<WordToPdfPage />} />
              <Route path="/pdf/compress-pdf" element={<CompressPdfPage />} />
              <Route path="/pdf/pdf-to-jpg" element={<PdfToJpgPage />} />
              <Route path="/word-formatter" element={<WordFormatterPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Analytics />
          <SpeedInsights />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
