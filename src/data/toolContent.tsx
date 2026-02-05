import React from 'react';
import {
    FileText,
    ShieldCheck,
    Zap,
    Search,
    Layers,
    Eye,
    Cpu,
    Lock,
    Globe,
    Smartphone,
    Hash,
    Maximize,
    ArrowRightLeft,
    Sparkles,
    Files,
    Layout,
    Clock,
    Move,
    Scissors,
    FileCheck,
    WifiOff,
    Minimize2,
    Mail,
    Database,
    ScanText,
    FileType,
    Printer,
    TrendingUp,
    Scaling,
    Monitor,
    RefreshCcw,
    Image as ImageIcon
} from 'lucide-react';

export const toolContent = {
    "pdf-to-word": {
        heroTitle: "High-Fidelity PDF to Word",
        heroDesc: "Convert PDFs to editable Word documents with pixel-perfect accuracy using our AI-powered conversion engine.",
        richText: (
            <div className="space-y-16">

                {/* Section 1: The Intro & Problem */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Stop Retyping "Locked" Documents</h2>
                    <p className="text-lg text-slate-600">
                        PDFs are great for sharing, but terrible for editing. We've all been there: staring at a "read-only" file,
                        manually re-typing tables and paragraphs into Word. Stop wasting time. Our AI converter unlocks that data
                        instantly, turning static pixels into a fully editable DOCX file.
                    </p>
                </div>

                {/* Section 2: The 3-Column Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Layout Preservation</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Most converters destroy your formatting, leaving you with broken text boxes. Our engine detects columns, margins, and font styles, rebuilding the document so it looks identical to the original PDF.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <ScanText className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">OCR for Scanned Docs</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Upload a scanned photo of a contract? No problem. Our built-in Optical Character Recognition (OCR) identifies letters inside images and converts them into editable text automatically.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Handling</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Your legal and financial data is safe. We use enterprise-grade encryption for the upload, and we permanently delete both the input PDF and output Word file from our servers after 1 hour.
                        </p>
                    </div>

                </div>

                {/* Section 3: The Dark "High-Impact" Banner */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
                            <Cpu className="w-4 h-4" />
                            NEURAL RECONSTRUCTION ENGINE
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Beyond Simple Text Extraction</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Standard tools just pull text line-by-line. ToolifyHubs uses a "Visual Analysis" layer
                            that looks at the document like a human does. It identifies that "Bold Text at the top"
                            is a Header, and "Grid lines" represent a Table, creating a structurally perfect Word document.
                        </p>
                    </div>
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                </div>

            </div>
        ),
        faqs: [
            {
                question: "Will the converted Word doc look exactly like my PDF?",
                answer: "In 95% of cases, yes. Complex layouts with many floating images may require minor adjustments, but text flow and tables remain intact."
            },
            {
                question: "Can I convert scanned PDFs (images) to text?",
                answer: "Yes! Our tool automatically applies OCR (Optical Character Recognition) to scanned files to make the text editable."
            },
            {
                question: "Is this free?",
                answer: "Yes, standard conversions are 100% free with no watermark. We support files up to 50MB."
            },
            {
                question: "Do I need Microsoft Word installed?",
                answer: "You do not need Word to perform the conversion, but you will need Word (or Google Docs) to open the downloaded .docx file."
            },
            {
                question: "How long do you keep my files?",
                answer: "We have a strict 1-hour retention policy. After 60 minutes, your files are permanently wiped from our secure cache."
            }
        ]
    },
    "word-to-pdf": {
        heroTitle: "Convert Word to Professional PDF",
        heroDesc: "Transform your .docx files into universally readable PDF documents with perfect formatting.",
        richText: (
            <div className="space-y-16">

                {/* Section 1: The Intro & Problem */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Freeze Your Formatting Forever</h2>
                    <p className="text-lg text-slate-600">
                        Sending a Word document (.docx) is a gamble. Fonts disappear, margins shift, and images jump to the next page depending on the recipient's software.
                        Converting to PDF "freezes" your document in time, ensuring it looks exactly the same on a phone, a tablet, or a printer.
                    </p>
                </div>

                {/* Section 2: The 3-Column Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Universal Compatibility</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Stop asking "Can you open this?" Our engine supports all versions of Microsoft Word (from 2007 to 2025) as well as LibreOffice and OpenOffice formats.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Mobile-Ready Output</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Word docs are notoriously hard to read on mobile devices. Our PDFs automatically scale for better readability on iOS and Android screens without broken layouts.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Printer className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Print-Ready Quality</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We generate ISO-compliant PDF files. This means your high-resolution images remain crisp and your fonts are embedded, making the file ready for professional printing.
                        </p>
                    </div>

                </div>

                {/* Section 3: The Dark "High-Impact" Banner */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
                            <FileType className="w-4 h-4" />
                            TRUE-TO-SOURCE ENGINE
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Hyperlinks & Metadata Preservation</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            A PDF isn't just an image of a document. It's interactive. ToolifyHubs preserves all your active hyperlinks,
                            bookmarks, and Table of Contents structures. If you click a link in your Word doc, it will still work in your PDF.
                        </p>
                    </div>
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                </div>

            </div>
        ),
        faqs: [
            {
                question: "Will my hyperlinks still work?",
                answer: "Yes. All clickable links, email addresses, and bookmarks in your Word document are preserved in the final PDF."
            },
            {
                question: "Can I convert a password-protected Word file?",
                answer: "No. You must remove the password protection in Word before uploading the file for conversion."
            },
            {
                question: "Does the quality of my images decrease?",
                answer: "We use smart optimization to keep file sizes manageable, but we prioritize visual quality so your images look great on screen and print."
            },
            {
                question: "Is this safe for business documents?",
                answer: "Absolutely. We use HTTPS encryption for uploads and automatically delete your files after 1 hour. We never look at your data."
            },
            {
                question: "Do I need to install Microsoft Word?",
                answer: "No. Our conversion happens in the cloud (or browser), so you don't need any software installed on your computer."
            }
        ]
    },
    "merge-pdf": {
        heroTitle: "Combine PDFs into a Single File",
        heroDesc: "The fastest way to merge multiple PDF documents into one professional file. Reorder and combine with ease.",
        richText: (
            <div className="space-y-16">

                {/* How-To Guide Section */}
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Hash className="w-8 h-8 text-blue-600" />
                        How to Merge PDFs for Free
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { step: "1", title: "Upload Your Files", desc: "Drag and drop multiple PDF files into the upload area above, or click to browse your device." },
                            { step: "2", title: "Arrange the Order", desc: "Reorder your documents by dragging the thumbnails into your preferred sequence." },
                            { step: "3", title: "Merge & Download", desc: "Click the 'Merge PDFs' button and download your combined file instantly." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-lg mb-4">{item.step}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Use ToolifyHubs Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-blue-600" />
                        Why Use ToolifyHubs?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-blue-600 font-bold">
                                <Lock className="w-5 h-5" />
                                Privacy First
                            </div>
                            <p className="text-slate-600 leading-relaxed">Your files are processed locally in your browser. We never upload your documents to a server—your data stays on your device.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-blue-600 font-bold">
                                <Zap className="w-5 h-5" />
                                No Limits
                            </div>
                            <p className="text-slate-600 leading-relaxed">Merge as many files as you want with no daily limits, file size restrictions, or paywalls. Completely unlimited.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-blue-600 font-bold">
                                <Clock className="w-5 h-5" />
                                Fast & Free
                            </div>
                            <p className="text-slate-600 leading-relaxed">No sign-up or registration required. Get your merged PDF in seconds—100% free forever.</p>
                        </div>
                    </div>
                </div>

                {/* Section 1: The Intro & Problem */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">The End of "Please Find Attached (5 Files)"</h2>
                    <p className="text-lg text-slate-600">
                        Sending multiple separate attachments looks unprofessional and confuses the recipient.
                        Whether it's a job application (Resume + Cover Letter) or a contract packet,
                        merging them into a single, cohesive PDF file creates a polished narrative.
                    </p>
                </div>

                {/* Section 2: The 3-Column Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Move className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Visual Sequencing</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Don't just mash files together. Our visual dashboard lets you drag and drop to re-order documents. Put the Table of Contents first and the Appendix last with a simple click.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Layers className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Multi-Source Merging</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Combine a landscape chart, a portrait report, and a scanned receipt into one file. Our engine respects the original orientation and page size of every individual document.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Bulk Processing</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Need to combine 20 different invoices for tax season? ToolifyHubs handles bulk uploads effortlessly, stitching them into a single chronological record in seconds.
                        </p>
                    </div>

                </div>

                {/* Section 3: The Dark "High-Impact" Banner */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
                            <ShieldCheck className="w-4 h-4" />
                            PRIVACY ARCHITECTURE
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Zero-Retention Stitching</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Most merge tools upload your sensitive contracts to a permanent server database.
                            We don't. Your files are processed in an ephemeral container that self-destructs
                            immediately after the download link expires (1 hour). Your data never enters a training set.
                        </p>
                    </div>
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                </div>

            </div>
        ),
        faqs: [
            {
                question: "How do I change the order of my PDFs?",
                answer: "Once you upload your files, you will see thumbnail previews. Simply click and hold a file to drag it into the correct position before hitting 'Merge'."
            },
            {
                question: "Is there a limit to how many files I can merge?",
                answer: "You can merge up to 20 files in a single batch. For larger batches, we recommend merging in groups."
            },
            {
                question: "Will the quality of my images decrease?",
                answer: "No. Our merge engine is 'lossless', meaning it simply copies the pages into a new container without re-compressing the images."
            },
            {
                question: "Is my data safe?",
                answer: "Yes, since we process files locally in your browser, your data never leaves your device. We never upload your documents to external servers."
            },
            {
                question: "Can I merge password-protected files?",
                answer: "For security reasons, you must unlock/remove the password from the PDF before uploading it to be merged."
            },
            {
                question: "Is it really free?",
                answer: "Yes, 100% free with no hidden fees, watermarks, or registration required."
            },
            {
                question: "Can I use this on my phone?",
                answer: "Yes! ToolifyHubs is fully responsive, so you can combine PDF attachments directly from your mobile browser."
            }
        ]
    },
    "split-pdf": {
        heroTitle: "Precision PDF Page Extractor",
        heroDesc: "Break apart documents or extract specific pages with 100% fidelity. No quality loss, just pure efficiency.",
        richText: (
            <div className="space-y-16">

                {/* How-To Guide Section */}
                <div className="bg-gradient-to-br from-purple-50 to-slate-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Hash className="w-8 h-8 text-purple-600" />
                        How to Split a PDF for Free
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { step: "1", title: "Upload Your PDF", desc: "Drag and drop your PDF file into the upload area above, or click to select from your device." },
                            { step: "2", title: "Select Pages", desc: "Enter the page numbers or ranges you want to extract (e.g., '1-5, 8, 12-15')." },
                            { step: "3", title: "Split & Download", desc: "Click 'Extract Pages' and download your new PDF containing only the selected pages." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-black text-lg mb-4">{item.step}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Use ToolifyHubs Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-purple-600" />
                        Why Use ToolifyHubs?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-purple-600 font-bold">
                                <Lock className="w-5 h-5" />
                                Privacy First
                            </div>
                            <p className="text-slate-600 leading-relaxed">Your files are processed locally in your browser. We never upload your documents to a server—your data stays on your device.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-purple-600 font-bold">
                                <Zap className="w-5 h-5" />
                                No Limits
                            </div>
                            <p className="text-slate-600 leading-relaxed">Split as many PDFs as you want with no daily limits, file size restrictions, or paywalls. Completely unlimited.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-purple-600 font-bold">
                                <Clock className="w-5 h-5" />
                                Fast & Free
                            </div>
                            <p className="text-slate-600 leading-relaxed">No sign-up or registration required. Extract pages in seconds—100% free forever.</p>
                        </div>
                    </div>
                </div>

                {/* Section 1: The Intro & Problem */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Precision Extraction: Take Only What You Need</h2>
                    <p className="text-lg text-slate-600">
                        Sending a 100-page report when the recipient only needs page 12 is unprofessional and clogs inboxes.
                        Our Splitter gives you surgical control, allowing you to slice out specific chapters,
                        remove Sensitive pages, or break huge documents into manageable parts.
                    </p>
                </div>

                {/* Section 2: The 3-Column Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Scissors className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Custom Page Ranges</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Need pages 1-5 and page 20? No problem. Input exact page ranges (e.g., "1-5, 20") to extract non-consecutive sections into a single, clean new PDF file.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <FileCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Legal & Academic Ready</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Perfect for legal discovery (extracting relevant evidence) or academic research (citing a specific chapter). Isolate the data you need without carrying the weight of the entire book.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <WifiOff className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Offline Mode Ready</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Because we use browser-side processing, you can technically load the tool, disconnect from Wi-Fi, and still process your files locally for maximum isolation.
                        </p>
                    </div>

                </div>

                {/* Section 3: The Dark "High-Impact" Banner */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
                            <Lock className="w-4 h-4" />
                            NON-DESTRUCTIVE EDITING
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Lossless Extraction Architecture</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Many splitters re-compress pages, causing blurry text or pixelated images.
                            ToolifyHubs uses <strong>"Stream Copy"</strong> technology. We physically copy the page data
                            from the original container to the new one bit-for-bit, ensuring 100% original quality retention.
                        </p>
                    </div>
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                </div>

            </div>
        ),
        faqs: [
            {
                question: "Can I extract multiple separate files at once?",
                answer: "Currently, the tool creates one single PDF containing all the pages you selected. We are working on a 'Burst Mode' to save every page as a separate file."
            },
            {
                question: "Does splitting a PDF reduce its file size?",
                answer: "Yes, significantly. If you extract 5 pages from a 100-page document, the new file will be roughly 5% of the original size."
            },
            {
                question: "Is my data safe?",
                answer: "Yes, since we process files locally in your browser, your data never leaves your device. We never upload your documents to external servers."
            },
            {
                question: "Will my bookmarks and links still work?",
                answer: "Links within the extracted pages are preserved. Links pointing to pages that were removed will obviously no longer function."
            },
            {
                question: "Is there a page limit?",
                answer: "Our engine handles documents up to 500 pages effortlessly within the browser environment."
            },
            {
                question: "Is it really free?",
                answer: "Yes, 100% free with no hidden fees, watermarks, or registration required."
            }
        ]
    },
    "compress-pdf": {
        heroTitle: "Smart PDF Compression",
        heroDesc: "Shrink large PDF documents while maintaining crystal-clear text and image quality with our intelligent optimization engine.",
        richText: (
            <div className="space-y-16">

                {/* How-To Guide Section */}
                <div className="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Hash className="w-8 h-8 text-emerald-600" />
                        How to Compress a PDF for Free
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { step: "1", title: "Upload Your PDF", desc: "Drag and drop your PDF file into the upload area above, or click to browse and select." },
                            { step: "2", title: "Choose Quality Level", desc: "Select your preferred compression level—balance between file size and visual quality." },
                            { step: "3", title: "Compress & Download", desc: "Click 'Compress' and download your optimized PDF instantly. See the size reduction!" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black text-lg mb-4">{item.step}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Use ToolifyHubs Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-emerald-600" />
                        Why Use ToolifyHubs?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-emerald-600 font-bold">
                                <Lock className="w-5 h-5" />
                                Privacy First
                            </div>
                            <p className="text-slate-600 leading-relaxed">Your files are processed locally in your browser. We never upload your documents to a server—your data stays on your device.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-emerald-600 font-bold">
                                <Zap className="w-5 h-5" />
                                No Limits
                            </div>
                            <p className="text-slate-600 leading-relaxed">Compress as many PDFs as you want with no daily limits or paywalls. Completely unlimited usage.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-emerald-600 font-bold">
                                <Clock className="w-5 h-5" />
                                Fast & Free
                            </div>
                            <p className="text-slate-600 leading-relaxed">No sign-up or registration required. Reduce file sizes in seconds—100% free forever.</p>
                        </div>
                    </div>
                </div>

                {/* Section 1: The Intro & Problem */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Beat the 25MB Email Barrier</h2>
                    <p className="text-lg text-slate-600">
                        We've all been there: you try to send a report, and Gmail rejects it because it's "Too Large."
                        Instead of resorting to slow file-sharing links, use our Smart Compressor to strip away
                        redundant data and shrink your PDF by up to 80%—without making it look blurry.
                    </p>
                </div>

                {/* Section 2: The 3-Column Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Email Ready Instantly</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Turn that bloated 40MB contract into a sleek 3MB attachment. Our algorithm specifically targets the metadata and heavy assets that cause file bloat, keeping the document light enough for any inbox.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Web & SEO Optimized</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Hosting PDFs on your site? Google penalizes slow loading times. Compressing your whitepapers and brochures ensures they load instantly for mobile users, boosting your UX scores.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Minimize2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Vector Text Preservation</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We don't just flatten your PDF into an image. We keep the text layer as "Vectors." This means even if you compress the file heavily, the letters remain razor-sharp and printable.
                        </p>
                    </div>

                </div>

                {/* Section 3: The Dark "High-Impact" Banner */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
                            <Database className="w-4 h-4" />
                            INTELLIGENT DENSITY REDUCTION
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Smart "Lossy" Compression</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Not all data in a PDF is visible. Our engine scans for invisible bloat—embedded fonts you aren't using,
                            excessive metadata, and hidden layers. We strip this data out entirely. For images, we apply
                            Perceptual Downsampling, lowering the resolution only where the human eye won't notice.
                        </p>
                    </div>
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                </div>

            </div>
        ),
        faqs: [
            {
                question: "Will my text look blurry after compression?",
                answer: "No. Text in PDFs is usually vector-based, which scales infinitely without losing quality. We primarily compress images and remove hidden data."
            },
            {
                question: "How much file size reduction can I expect?",
                answer: "It depends on the content. Image-heavy files can often be reduced by 70-90%. Text-only legal documents may only see a 10-20% reduction."
            },
            {
                question: "Is my data safe?",
                answer: "Yes, since we process files locally in your browser, your data never leaves your device. We never upload your documents to external servers."
            },
            {
                question: "What happens to the hyperlinks in the PDF?",
                answer: "Hyperlinks, bookmarks, and Table of Contents structures are preserved intact during the compression process."
            },
            {
                question: "Is it really free?",
                answer: "Yes, 100% free with no hidden fees, watermarks, or registration required."
            },
            {
                question: "Can I compress a password-protected PDF?",
                answer: "No. You must remove the password first. We cannot modify the internal structure of an encrypted file."
            }
        ]
    },
    "image-compressor": {
        heroTitle: "Smart Neural Image Compression",
        heroDesc: "Shrink image file sizes by up to 90% while maintaining stunning visual quality. Perfect for web performance and SEO.",
        richText: (
            <div className="space-y-16">

                {/* How-To Guide Section */}
                <div className="bg-gradient-to-br from-orange-50 to-slate-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Hash className="w-8 h-8 text-orange-600" />
                        How to Compress Images for Free
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { step: "1", title: "Upload Your Image", desc: "Drag and drop your image into the upload area above, or click to browse your device." },
                            { step: "2", title: "Adjust Quality", desc: "Use the slider to set your preferred compression level—balance between file size and visual quality." },
                            { step: "3", title: "Compress & Download", desc: "Click 'Compress & Download' and save your optimized image instantly." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-black text-lg mb-4">{item.step}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Use ToolifyHubs Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-orange-600" />
                        Why Use ToolifyHubs?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-orange-600 font-bold">
                                <Lock className="w-5 h-5" />
                                Privacy First
                            </div>
                            <p className="text-slate-600 leading-relaxed">Your images are processed locally in your browser using WebAssembly. We never upload your photos to a server.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-orange-600 font-bold">
                                <Zap className="w-5 h-5" />
                                No Limits
                            </div>
                            <p className="text-slate-600 leading-relaxed">Compress as many images as you want with no daily limits or paywalls. Completely unlimited usage.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-orange-600 font-bold">
                                <Clock className="w-5 h-5" />
                                Fast & Free
                            </div>
                            <p className="text-slate-600 leading-relaxed">No sign-up or registration required. Optimize your images in seconds—100% free forever.</p>
                        </div>
                    </div>
                </div>

                {/* Section 1: The Intro & Problem */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Speed is the New SEO Currency</h2>
                    <p className="text-lg text-slate-600">
                        Google's "Core Web Vitals" update penalizes slow websites. The #1 cause of slow loading? Unoptimized images.
                        Uploading a raw 5MB photo to your blog kills your page speed. ToolifyHubs compresses that image by up to 90%
                        while keeping it visually identical, making your site load instantly.
                    </p>
                </div>

                {/* Section 2: The 3-Column Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Lossy Encoding</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We use "Perceptual Quantization." Our AI scans the image to lower precision in areas your eye can't see (like a blue sky) while preserving sharp details in important areas (like faces or text).
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Layers className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Transparency Support</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Compressing PNGs often destroys the transparent background, turning it black. Our engine preserves the Alpha Channel, ensuring your logos and icons stay crisp and transparent.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Bulk Optimization</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Have a whole folder of product photos? Drag and drop up to 20 images at once. We process them in parallel, saving you hours of manual work.
                        </p>
                    </div>

                </div>

                {/* Section 3: The Dark "High-Impact" Banner */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
                            <Lock className="w-4 h-4" />
                            CLIENT-SIDE PRIVACY
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Your Photos Never Leave Your Device</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Unlike other tools that upload your personal photos to a cloud server, ToolifyHubs uses <strong>WebAssembly</strong> to compress images directly in your browser. This means your personal data never touches our servers—making it 100% secure.
                        </p>
                    </div>
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                </div>

            </div>
        ),
        faqs: [
            {
                question: "What is the difference between Lossy and Lossless?",
                answer: "Lossless keeps every pixel perfect but only saves ~10% size. We use 'Smart Lossy' which saves 80% size by removing invisible data without noticeable quality loss."
            },
            {
                question: "Will my images lose their transparency (PNG)?",
                answer: "No. Our algorithm is specifically tuned to preserve the 'Alpha Channel' (transparency) of PNG files."
            },
            {
                question: "Is my data safe?",
                answer: "Yes, since we process images locally in your browser, your data never leaves your device. We never upload your photos to external servers."
            },
            {
                question: "Can I batch compress my photos?",
                answer: "Yes! You can select or drag multiple images at once to compress them in a single session."
            },
            {
                question: "Is it really free?",
                answer: "Yes, 100% free with no hidden fees, watermarks, or registration required."
            },
            {
                question: "Is there a maximum image resolution?",
                answer: "We support images up to 4K resolution. Extremely large files (like 50MB raw photos) may take a few extra seconds to process."
            }
        ]
    },
    "image-resizer": {
        heroTitle: "Precision Image Resizer",
        heroDesc: "Change the dimensions of your images for social media, websites, or print without losing clarity.",
        richText: (
            <div className="space-y-16">

                {/* How-To Guide Section */}
                <div className="bg-gradient-to-br from-pink-50 to-slate-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Hash className="w-8 h-8 text-pink-600" />
                        How to Resize Images for Free
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { step: "1", title: "Upload Your Image", desc: "Drag and drop your image into the upload area above, or click to browse your device." },
                            { step: "2", title: "Set Dimensions", desc: "Enter your desired width and height in pixels, or use percentage scaling. Aspect ratio locks automatically." },
                            { step: "3", title: "Resize & Download", desc: "Click 'Resize & Download' and save your perfectly sized image instantly." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-black text-lg mb-4">{item.step}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Use ToolifyHubs Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-pink-600" />
                        Why Use ToolifyHubs?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-pink-600 font-bold">
                                <Lock className="w-5 h-5" />
                                Privacy First
                            </div>
                            <p className="text-slate-600 leading-relaxed">Your images are processed locally in your browser. We never upload your photos to a server—your data stays on your device.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-pink-600 font-bold">
                                <Zap className="w-5 h-5" />
                                No Limits
                            </div>
                            <p className="text-slate-600 leading-relaxed">Resize as many images as you want with no daily limits or paywalls. Completely unlimited usage.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-pink-600 font-bold">
                                <Clock className="w-5 h-5" />
                                Fast & Free
                            </div>
                            <p className="text-slate-600 leading-relaxed">No sign-up or registration required. Resize your images in seconds—100% free forever.</p>
                        </div>
                    </div>
                </div>

                {/* Section 1: The Intro & Problem */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Pixel-Perfect Dimensions for Every Platform</h2>
                    <p className="text-lg text-slate-600">
                        Every platform has its own rules. Instagram wants 1080x1080, LinkedIn headers need 1128x191, and your website hero needs 1920x600.
                        Uploading the wrong size leads to awkward cropping or blurry stretching. Our Resizer gives you surgical control over pixels,
                        ensuring your visuals look professional everywhere.
                    </p>
                </div>

                {/* Section 2: The 3-Column Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Scaling className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Aspect Ratio Lock</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Don't squish your images. Our tool locks the aspect ratio by default. If you change the width, the height adjusts automatically to keep your image perfectly proportioned.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Maximize className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">High-Quality Upscaling</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Need to make a small logo bigger? We use bicubic interpolation to smooth out edges when upscaling, reducing the "pixelated" look common in basic paint tools.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Device Presets</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Not sure what size an "iPhone Wallpaper" should be? We are adding smart presets soon to let you resize for specific devices and social networks with one click.
                        </p>
                    </div>

                </div>

                {/* Section 3: The Dark "High-Impact" Banner */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
                            <Monitor className="w-4 h-4" />
                            DPI CONTROL
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Print vs. Web Optimization</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Resizing isn't just about width and height. It's about density. Whether you are shrinking a
                            photo for a faster website load or sizing it up for a physical flyer, our engine ensures
                            the output file maintains the highest possible clarity for your target medium.
                        </p>
                    </div>
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                </div>

            </div>
        ),
        faqs: [
            {
                question: "Will resizing my image make it pixelated?",
                answer: "Making an image smaller (downscaling) actually makes it sharper. Making it larger (upscaling) may introduce some blurriness, but our engine smooths this out."
            },
            {
                question: "Can I resize by percentage (e.g., 50%)?",
                answer: "Yes. You can switch input modes to resize by specific pixels (px) or by a percentage scale."
            },
            {
                question: "Is my data safe?",
                answer: "Yes, since we process images locally in your browser, your data never leaves your device. We never upload your photos to external servers."
            },
            {
                question: "Does this remove Exif metadata?",
                answer: "For privacy reasons, yes. We strip out GPS and camera data when generating the new resized image."
            },
            {
                question: "Is it really free?",
                answer: "Yes, 100% free with no hidden fees, watermarks, or registration required."
            },
            {
                question: "Is there a file size limit?",
                answer: "We accept images up to 10MB. The output file size will vary depending on the new dimensions you choose."
            }
        ]
    },
    "format-converter": {
        heroTitle: "Universal Image Format Converter",
        heroDesc: "Switch between PNG, JPG, and WebP formats seamlessly with our instant conversion tool.",
        richText: (
            <div className="space-y-16">

                {/* How-To Guide Section */}
                <div className="bg-gradient-to-br from-yellow-50 to-slate-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Hash className="w-8 h-8 text-yellow-600" />
                        How to Convert Image Formats for Free
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { step: "1", title: "Upload Your Image", desc: "Drag and drop your image into the upload area above, or click to browse your device." },
                            { step: "2", title: "Select Target Format", desc: "Choose your desired output format: PNG, JPEG, or WebP from the dropdown menu." },
                            { step: "3", title: "Convert & Download", desc: "Click 'Convert & Download' and save your converted image instantly." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-black text-lg mb-4">{item.step}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Use ToolifyHubs Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-yellow-600" />
                        Why Use ToolifyHubs?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-yellow-600 font-bold">
                                <Lock className="w-5 h-5" />
                                Privacy First
                            </div>
                            <p className="text-slate-600 leading-relaxed">Your images are processed locally in your browser. We never upload your photos to a server—your data stays on your device.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-yellow-600 font-bold">
                                <Zap className="w-5 h-5" />
                                No Limits
                            </div>
                            <p className="text-slate-600 leading-relaxed">Convert as many images as you want with no daily limits or paywalls. Completely unlimited usage.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-yellow-600 font-bold">
                                <Clock className="w-5 h-5" />
                                Fast & Free
                            </div>
                            <p className="text-slate-600 leading-relaxed">No sign-up or registration required. Convert your images in seconds—100% free forever.</p>
                        </div>
                    </div>
                </div>

                {/* Section 1: The Intro & Problem */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">The Universal Translator for Images</h2>
                    <p className="text-lg text-slate-600">
                        File formats are messy. WebP makes websites fast but won't open in older Photoshop versions.
                        JPG is universal but lacks transparency. PNG looks great but is too heavy for email.
                        Our converter bridges the gap, allowing you to switch between modern and legacy formats instantly without losing visual fidelity.
                    </p>
                </div>

                {/* Section 2: The 3-Column Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Modern WebP Support</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Google loves WebP because it's fast. Convert your old JPG/PNG library to WebP to instantly boost your website's Core Web Vitals scores without sacrificing quality.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Layers className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Transparency Management</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Converting a transparent logo (PNG) to JPG usually creates an ugly black background. Our engine intelligently fills the transparent area with white, keeping your assets usable.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <RefreshCcw className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Batch Switching</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Need to send 10 photos to a client who can't open HEIC files? Convert them all to universal JPGs in one click. We handle the codec processing locally.
                        </p>
                    </div>

                </div>

                {/* Section 3: The Dark "High-Impact" Banner */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
                            <ImageIcon className="w-4 h-4" />
                            COMPATIBILITY ENGINE
                        </div>
                        <h3 className="text-3xl font-bold mb-4">No More "File Not Supported" Errors</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Different operating systems favor different formats. Windows prefers JPG, macOS prefers HEIC,
                            and the Web prefers WebP. ToolifyHubs acts as the neutral ground, stripping away proprietary
                            wrappers and giving you clean, standard image files that work on any device, anywhere.
                        </p>
                    </div>
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/20 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                </div>

            </div>
        ),
        faqs: [
            {
                question: "Which formats can I convert between?",
                answer: "We currently support full conversions between JPG, PNG, and WebP. We also support converting HEIC (iPhone) photos to JPG."
            },
            {
                question: "Will converting PNG to JPG lower quality?",
                answer: "JPG is a 'lossy' format, so technically yes, you lose some data. However, for standard viewing, the difference is usually invisible to the naked eye."
            },
            {
                question: "Is my data safe?",
                answer: "Yes, since we process images locally in your browser, your data never leaves your device. We never upload your photos to external servers."
            },
            {
                question: "What is the best format for logos?",
                answer: "PNG is best for logos because it supports transparency and sharp lines. Do not use JPG for logos as it can add 'noise' around text."
            },
            {
                question: "Is it really free?",
                answer: "Yes, 100% free with no hidden fees, watermarks, or registration required."
            },
            {
                question: "Is there a limit on file size?",
                answer: "You can convert images up to 10MB each. For larger files, we recommend using our Image Compressor tool first."
            }
        ]
    },
    "pdf-to-jpg": {
        heroTitle: "Convert PDF to JPG Images",
        heroDesc: "Extract pages from your PDF and save them as high-quality JPG images instantly.",
        richText: (
            <div className="space-y-16">

                {/* How-To Guide Section */}
                <div className="bg-gradient-to-br from-indigo-50 to-slate-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Hash className="w-8 h-8 text-indigo-600" />
                        How to Convert PDF to JPG for Free
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { step: "1", title: "Upload Your PDF", desc: "Drag and drop your PDF file into the upload area above, or click to browse your device." },
                            { step: "2", title: "Select Pages", desc: "Choose which pages to convert—all pages or specific ones. Adjust quality settings if needed." },
                            { step: "3", title: "Convert & Download", desc: "Click 'Convert' and download your high-quality JPG images instantly as a ZIP file." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black text-lg mb-4">{item.step}</div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Use ToolifyHubs Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-indigo-600" />
                        Why Use ToolifyHubs?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-indigo-600 font-bold">
                                <Lock className="w-5 h-5" />
                                Privacy First
                            </div>
                            <p className="text-slate-600 leading-relaxed">Your files are processed locally in your browser. We never upload your documents to a server—your data stays on your device.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-indigo-600 font-bold">
                                <Zap className="w-5 h-5" />
                                No Limits
                            </div>
                            <p className="text-slate-600 leading-relaxed">Convert as many PDFs as you want with no daily limits, page restrictions, or paywalls. Completely unlimited.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-indigo-600 font-bold">
                                <Clock className="w-5 h-5" />
                                Fast & Free
                            </div>
                            <p className="text-slate-600 leading-relaxed">No sign-up or registration required. Convert your PDFs in seconds—100% free forever.</p>
                        </div>
                    </div>
                </div>

                {/* Feature Section */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">PDF to Visual Proof</h2>
                    <p className="text-lg text-slate-600">
                        Turn locked documents into shareable images. Extract charts, pages, and visuals from any PDF with high-resolution rendering.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Eye className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">High-DPI Rendering</h3>
                        <p className="text-slate-600 leading-relaxed">We render your pages at 300 DPI to ensure text remains crisp even in image format.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Files className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Bulk Extraction</h3>
                        <p className="text-slate-600 leading-relaxed">Download your entire document as a ZIP of individual high-quality JPG files.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Universal Viewing</h3>
                        <p className="text-slate-600 leading-relaxed">Images open on any device without the need for specialized PDF software or plugins.</p>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
                            VISUAL FIDELITY
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Pixel-Perfect Extraction</h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Our rendering engine maps complex PDF vectors into high-density pixel arrays, ensuring your visuals look professional on social media or in presentations.
                        </p>
                    </div>
                </div>
            </div>
        ),
        faqs: [
            { 
                question: "What is the quality of the output JPG?", 
                answer: "We use high-DPI rendering to ensure that the JPG images are crisp and readable, suitable for both web use and printing." 
            },
            { 
                question: "Can I convert single pages?", 
                answer: "Yes, you can choose specific pages or convert the entire document into a set of images." 
            },
            { 
                question: "Is my data safe?", 
                answer: "Yes, since we process files locally in your browser, your data never leaves your device. We never upload your documents to external servers." 
            },
            { 
                question: "Is the resolution adjustable?", 
                answer: "Yes, our tool provides quality settings to balance file size and visual clarity." 
            },
            { 
                question: "Is it really free?", 
                answer: "Yes, 100% free with no hidden fees, watermarks, or registration required." 
            },
            { 
                question: "Is this free for large documents?", 
                answer: "Yes, we support multi-page PDF conversion at no cost." 
            }
        ]
    }
};
