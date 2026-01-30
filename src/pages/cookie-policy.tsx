import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function CookiePolicyPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" as never });
    }, []);

    return (
        <>
            <Helmet>
                <title>Cookie Policy – Toolify Hubs</title>
                <meta
                    name="description"
                    content="Learn about how ToolifyHubs uses cookies to improve your experience and provide personalized advertising through Google AdSense."
                />
                <meta name="keywords" content="cookie policy, google adsense, cookies, toolify hubs cookies" />
                <link rel="canonical" href="https://www.toolifyhubs.com/cookie-policy" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Cookie Policy — Toolify Hubs" />
                <meta property="og:description" content="Our transparency report on cookie usage and advertising compliance." />
                <meta property="og:url" content="https://www.toolifyhubs.com/cookie-policy" />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "Cookie Policy — Toolify Hubs",
                    "url": "https://www.toolifyhubs.com/cookie-policy"
                })}</script>
            </Helmet>

            <Navbar />

            <section id="hero" className="min-h-[50vh] flex items-center justify-center relative overflow-hidden pt-20">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground">Cookie Policy</h1>
                        <p className="text-muted-foreground text-lg">
                            Last Updated: January 29, 2026
                        </p>
                        <div className="flex justify-center">
                            <Button onClick={() => { const el = document.getElementById("content"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="bg-primary hover:bg-primary-hover px-8 py-6 rounded-xl font-semibold">
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="content" className="container mx-auto px-5 py-16 max-w-4xl">
                <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 border border-border/50">
                    <h3 className="text-xl font-bold mb-4 text-foreground">1. AdSense & Personalized Advertising</h3>
                    <p className="mb-6 leading-relaxed text-muted-foreground">
                        ToolifyHubs.com uses <strong>Google AdSense</strong> to serve advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to ToolifyHubs.com and/or other sites on the Internet.
                    </p>

                    <h3 className="text-xl font-bold mb-4 text-foreground">2. Usage Analytics</h3>
                    <p className="mb-6 leading-relaxed text-muted-foreground">
                        We utilize <strong>Google Analytics</strong> to monitor and analyze site traffic and usage patterns. This service uses cookies to collect anonymous data such as IP addresses, browser types, and session durations. This information is used strictly to optimize our document tools and improve the user experience.
                    </p>

                    <h3 className="text-xl font-bold mb-4 text-foreground">3. Types of Cookies We Use</h3>
                    <ul className="list-disc pl-6 mb-8 space-y-2 text-muted-foreground">
                        <li><strong>Necessary Cookies:</strong> Required for the technical operation of our file processing environment.</li>
                        <li><strong>Performance Cookies:</strong> Allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
                        <li><strong>Targeting Cookies:</strong> These may be set through our site by our advertising partners (Google) to build a profile of your interests and show you relevant ads on other sites.</li>
                    </ul>

                    <h3 className="text-xl font-bold mb-4 text-foreground">4. User Control & Opt-Out</h3>
                    <p className="mb-8 leading-relaxed text-muted-foreground">
                        You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted. Additionally, you may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Google Ad Settings</a>.
                    </p>

                    <div className="pt-8 border-t border-border">
                        <h3 className="text-xl font-bold mb-4 text-foreground">Contact</h3>
                        <p className="leading-relaxed text-muted-foreground">
                            For any inquiries regarding our use of cookies, please contact: <br />
                            <a href="mailto:toolifyhubs@gmail.com" className="text-primary font-semibold hover:underline">toolifyhubs@gmail.com</a>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
