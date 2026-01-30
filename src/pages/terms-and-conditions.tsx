import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function TermsAndConditionsPage() {
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
        <title>Terms & Conditions – Toolify Hubs</title>
        <meta
          name="description"
          content="Terms and conditions for using Toolify Hubs. Read the rules and responsibilities for accessing and using our AI document and PDF tools."
        />
        <meta
          name="keywords"
          content="terms and conditions, terms of use, toolify hubs terms"
        />
        <link rel="canonical" href="https://www.toolifyhubs.com/terms-and-conditions" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Terms and Conditions — Toolify Hubs" />
        <meta property="og:description" content="Terms of use for ToolifyHubs. Read the conditions and responsibilities for using our tools." />
        <meta property="og:url" content="https://www.toolifyhubs.com/terms-and-conditions" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Terms and Conditions — Toolify Hubs",
          "url": "https://www.toolifyhubs.com/terms-and-conditions"
        })}</script>
      </Helmet>

      <Navbar />

      <section id="hero" className="min-h-[50vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground text-lg">Last Updated: January 29, 2026</p>
            <div className="flex justify-center">
              <Button onClick={() => { const el = document.getElementById("content"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="bg-primary hover:bg-primary-hover px-8 py-6 rounded-xl font-semibold">
                Read Terms
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="content" className="container mx-auto px-5 py-16 max-w-4xl">
        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 border border-border/50">
          <h3 className="text-xl font-bold mb-4">1. Acceptance of Terms</h3>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            By accessing and using ToolifyHubs.com ("the Website"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use this Website. We reserve the right to modify these terms at any time, and your continued use of the Website signifies your acceptance of any updated terms.
          </p>

          <h3 className="text-xl font-bold mb-4">2. User Conduct & Content Standards</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            You are solely responsible for the files you upload to our servers. By using our tools, you agree NOT to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
            <li>Upload any content that is illegal, defamatory, or violates the rights of any third party.</li>
            <li>Upload files infected with viruses, malware, or any code designed to disrupt the Website's functionality.</li>
            <li>Upload copyrighted material (including books, proprietary software, or protected images) that you do not have the legal right to process.</li>
            <li>Attempt to reverse-engineer our tools or bypass any structural limitations of the service.</li>
          </ul>

          <h3 className="text-xl font-bold mb-4">3. Intellectual Property & Ownership</h3>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            <strong>User Ownership:</strong> You retain full ownership and all intellectual property rights to the files you upload to ToolifyHubs.com. We do not claim any ownership rights over your content. We only process your files to provide the requested service (conversion, editing, etc.).
          </p>

          <h3 className="text-xl font-bold mb-4">4. Service "As Is" & Limitation of Liability</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Our tools are provided on an "As Is" and "As Available" basis. While we strive for high-fidelity conversion and formatting:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
            <li>We do not guarantee that file conversions will be 100% accurate or reflect the original formatting perfectly.</li>
            <li>ToolifyHubs.com shall not be held liable for any data loss, file corruption, or business interruption resulting from the use of our services.</li>
            <li>Users are encouraged to maintain their own backups of all original documents.</li>
          </ul>

          <h3 className="text-xl font-bold mb-4">5. Termination & Access Restriction</h3>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            We reserve the right to terminate or restrict your access to the Website without notice if we believe you are abusing our API, attempting to "crash" our servers, or violating any part of these Terms.
          </p>

          <h3 className="text-xl font-bold mb-4">6. Governing Law</h3>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            These Terms are governed by and construed in accordance with the laws of the jurisdiction in which ToolifyHubs.com operates, without regard to its conflict of law principles.
          </p>

          <div className="pt-8 border-t border-border">
            <strong>Contact:</strong> For questions about these Terms, email <a href="mailto:toolifyhubs@gmail.com" className="text-primary font-semibold hover:underline">toolifyhubs@gmail.com</a>.
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

