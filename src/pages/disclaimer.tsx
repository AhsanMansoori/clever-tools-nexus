import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function DisclaimerPage() {
  const scrollToTools = () => {
    const toolsSection = document.getElementById("hero");
    if (toolsSection) toolsSection.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Always load at top
    window.scrollTo({ top: 0, behavior: "instant" as never });
  }, []);
  return (
    <>
      <Helmet>
        <title>Disclaimer – Toolify Hubs</title>
        <meta
          name="description"
          content="Disclaimer for Toolify Hubs. Read the limitations and responsibilities for using our document and PDF tools."
        />
        <meta name="keywords" content="disclaimer, toolify hubs disclaimer" />
        <link rel="canonical" href="https://www.toolifyhubs.com/disclaimer" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Disclaimer — Toolify Hubs" />
        <meta property="og:description" content="Disclaimer for Toolify Hubs. Read the limitations for using our document and PDF tools." />
        <meta property="og:url" content="https://www.toolifyhubs.com/disclaimer" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Disclaimer — Toolify Hubs",
          "url": "https://www.toolifyhubs.com/disclaimer"
        })}</script>
      </Helmet>

      <Navbar />

      <section id="hero" className="min-h-[50vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">Legal Disclaimer</h1>
            <p className="text-muted-foreground text-lg">
              Effective Date: January 29, 2026
            </p>
            <div className="flex justify-center">
              <Button onClick={() => { const el = document.getElementById("content"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="bg-primary hover:bg-primary-hover px-8 py-6 rounded-xl font-semibold">
                Read Disclaimer
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="content" className="container mx-auto px-5 py-16 max-w-4xl">
        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 border border-border/50">
          <h3 className="text-xl font-bold mb-4 text-foreground">1. Software Provider Status</h3>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            ToolifyHubs.com is a technology provider, not a professional service firm. The tools provided on this Website (including AI Word Formatter, PDF converters, and image editors) are automated processing agents. We do not provide legal, financial, or medical advice. We are not responsible if a processed document (such as a legal contract or financial report) contains typos, formatting errors, or data discrepancies.
          </p>

          <h3 className="text-xl font-bold mb-4 text-foreground">2. Data Handling & Automated Deletion</h3>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            While we implement high-security protocols for file transmission, ToolifyHubs.com does not provide permanent storage. All uploaded files and processed outputs are <strong>automatically deleted from our servers after 1 hour</strong>. We are not responsible for the loss of files once this deletion window has passed.
          </p>

          <h3 className="text-xl font-bold mb-4 text-foreground">3. No Warranty ("As Is")</h3>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Use of our tools is at your own risk. ToolifyHubs.com provides these services free of charge without any warranties of any kind, either express or implied, including but not limited to:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
            <li>Warranties of merchantability or fitness for a particular purpose.</li>
            <li>Warranties that the service will be uninterrupted, timely, or error-free.</li>
            <li>Warranties regarding the accuracy or reliability of any results obtained from the tools.</li>
          </ul>

          <h3 className="text-xl font-bold mb-4 text-foreground">4. Limitation of Liability</h3>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            In no event shall ToolifyHubs.com or its owners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the tools on the Website, even if we have been notified of the possibility of such damage.
          </p>

          <div className="pt-8 border-t border-border">
            <h3 className="text-xl font-bold mb-4 text-foreground">Contact & Reporting</h3>
            <p className="leading-relaxed text-muted-foreground">
              If you discover a technical error or have a compliance concern, please contact us immediately at <a href="mailto:toolifyhubs@gmail.com" className="text-primary font-semibold hover:underline">toolifyhubs@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

