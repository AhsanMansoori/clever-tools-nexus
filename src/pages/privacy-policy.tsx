import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function PrivacyPolicyPage() {
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
        <title>Privacy Policy – Toolify Hubs</title>
        <meta
          name="description"
          content="Toolify Hubs Privacy Policy. Learn how we collect, use, and protect your data. We respect your privacy and follow best practices to ensure a safe experience."
        />
        <meta
          name="keywords"
          content="privacy policy, data protection, cookies, toolify hubs privacy"
        />
        <link rel="canonical" href="https://www.toolifyhubs.com/privacy-policy" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Privacy Policy — Toolify Hubs" />
        <meta property="og:description" content="Learn how ToolifyHubs handles your data. We do not collect or store personal information." />
        <meta property="og:url" content="https://www.toolifyhubs.com/privacy-policy" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy — Toolify Hubs",
          "url": "https://www.toolifyhubs.com/privacy-policy"
        })}</script>
      </Helmet>

      <Navbar />

      <section id="hero" className="min-h-[50vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              At ToolifyHubs.com, your privacy is our priority. This policy outlines how we handle your data, especially during document processing and image optimization.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => { const el = document.getElementById("content"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="bg-primary hover:bg-primary-hover px-8 py-6 rounded-xl font-semibold">
                Read Policy
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="content" className="container mx-auto px-5 py-16 max-w-4xl">
        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 border border-border/50">
          <h2 className="text-2xl font-bold mb-4 text-foreground">1. File Handling & Retention</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            As a specialized Document & Image Management suite, we process files that you upload. Our commitment to your security is absolute:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
            <li><strong>Automated Deletion:</strong> All uploaded files (PDFs, Images, Word docs) are automatically and permanently deleted from our servers within <strong>1 hour</strong> of processing.</li>
            <li><strong>No Content Snooping:</strong> We do not read, analyze, or manually review the content of any documents you process. Our AI Word Formatter and PDF converters operate through automated, isolated workflows.</li>
            <li><strong>Non-Persistent Storage:</strong> We do not maintain any long-term storage of user-provided content. Once the 1-hour retention period expires, the data is unrecoverable.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-foreground">2. Cookies & Analytics</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            We use standard web technologies to understand how our site is used and to provide a seamless experience:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
            <li><strong>Google Analytics:</strong> We use this to track non-personal usage data like popular tools, session length, and browser types to improve our performance.</li>
            <li><strong>Cookies:</strong> Small data files stored on your device that help us remember your preferences. You can disable these at any time via your browser settings.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-foreground">3. Advertising Partnerships</h2>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            We use <strong>Google AdSense</strong> to show advertisements. These ads help keep our premium document tools free for everyone. AdSense may use cookies to serve ads based on your previous visits to our site or other websites on the internet.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">4. Data Usage Rights (GDPR & CCPA)</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Under California and European privacy laws, you have specific rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
            <li><strong>Right to Know:</strong> You can request to know what personal data we have collected.</li>
            <li><strong>Right to Deletion:</strong> You can request that we delete any personal information we hold (though we hold minimal data beyond our 1-hour file window).</li>
            <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-foreground">5. Children's Privacy</h2>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            Our tools are intended for use by individuals 13 years of age or older. We do not knowingly collect personal information from children under 13.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">6. Security Measures</h2>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            We use industry-standard encryption protocols during the transmission of files (HTTPS) to ensure your data is secure while in transit to our processing environment.
          </p>

          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Us</h2>
            <p className="leading-relaxed text-muted-foreground">
              For any questions regarding this Privacy Policy or our file handling practices, please contact us at: <br />
              <a href="mailto:toolifyhubs@gmail.com" className="text-primary font-semibold hover:underline">toolifyhubs@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

