const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const libre = require('libreoffice-convert');

const execAsync = util.promisify(exec);
const libreConvertAsync = util.promisify(libre.convert);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend connection
app.use(express.json());
app.use('/downloads', express.static(path.join(__dirname, 'public/downloads')));

// Ensure directories exist
['uploads', 'public/downloads'].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueId = uuidv4();
        cb(null, `${uniqueId}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Increased to 50MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowed = ['.pdf', '.docx', '.doc', '.rtf'];
        if (allowed.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Supported: PDF, DOCX, DOC, RTF'));
        }
    }
});

/**
 * Route: PDF to Word Conversion
 * Receives PDF -> Processes via Python -> Returns Download Link
 */
app.post('/api/convert/pdf-to-word', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const inputPath = req.file.path;
    const downloadFileName = `converted_${uuidv4()}.docx`;
    const outputPath = path.join(__dirname, 'public/downloads', downloadFileName);

    try {
        console.log(`[Processing PDF->Word] ${req.file.originalname} -> ${downloadFileName}`);

        // Ensure scripts/pdf_to_docx.py exists before executing
        await execAsync(`python scripts/pdf_to_docx.py "${inputPath}" "${outputPath}"`);

        if (!fs.existsSync(outputPath)) {
            throw new Error('High-fidelity conversion engine failed to produce output.');
        }

        res.json({
            success: true,
            downloadUrl: `/downloads/${downloadFileName}`,
            message: 'Conversion successful.'
        });

        // Cleanup after 60 mins
        scheduleCleanup([inputPath, outputPath]);
    } catch (error) {
        console.error('PDF Conversion Error:', error);
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        res.status(500).json({ error: 'Failed to convert PDF. Ensure it is not password-secured.' });
    }
});

/**
 * Route: Word to PDF Conversion
 * Receives Docx -> Processes via LibreOffice -> Returns Download Link
 */
app.post('/api/convert/word-to-pdf', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const inputPath = req.file.path;
    const downloadFileName = `converted_${uuidv4()}.pdf`;
    const outputPath = path.join(__dirname, 'public/downloads', downloadFileName);

    try {
        console.log(`[Processing Word->PDF] ${req.file.originalname} -> ${downloadFileName}`);

        const docxData = fs.readFileSync(inputPath);

        // Convert docx to pdf using libreoffice-convert
        const pdfData = await libreConvertAsync(docxData, '.pdf', undefined);

        fs.writeFileSync(outputPath, pdfData);

        res.json({
            success: true,
            downloadUrl: `/downloads/${downloadFileName}`,
            message: 'Conversion successful.'
        });

        scheduleCleanup([inputPath, outputPath]);
    } catch (error) {
        console.error('Word to PDF error:', error);
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        res.status(500).json({ error: 'Failed to convert document to PDF. Please try again.' });
    }
});

/**
 * Route: Split PDF
 * Receives PDF -> Processes via Python (returns zip) -> Returns Download Link
 */
app.post('/api/convert/split-pdf', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const inputPath = req.file.path;
    const downloadFileName = `split_${uuidv4()}.zip`;
    const outputPath = path.join(__dirname, 'public/downloads', downloadFileName);

    try {
        console.log(`[Processing Split PDF] ${req.file.originalname} -> ${downloadFileName}`);

        // Command: python scripts/split_pdf.py "${inputPath}" "${outputPath}"
        await execAsync(`python scripts/split_pdf.py "${inputPath}" "${outputPath}"`);

        if (!fs.existsSync(outputPath)) {
            throw new Error('PDF Split engine failed to produce output.');
        }

        res.json({
            success: true,
            downloadUrl: `/downloads/${downloadFileName}`,
            message: 'Splitting successful. Download your ZIP file.'
        });

        scheduleCleanup([inputPath, outputPath]);
    } catch (error) {
        console.error('Split PDF error:', error);
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        res.status(500).json({ error: 'Failed to split PDF. Please try again.' });
    }
});

/**
 * Route: AI Word Formatting (Word Cleaner)
 * Receives DOCX -> Processes via Python -> Returns Polished DOCX
 */
app.post('/api/convert/word-cleaner', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const inputPath = req.file.path;
    const downloadFileName = `polished_${uuidv4()}.docx`;
    const outputPath = path.join(__dirname, 'public/downloads', downloadFileName);

    try {
        console.log(`[Processing AI Word Formatting] ${req.file.originalname} -> ${downloadFileName}`);

        // Command: python scripts/word_cleaner.py "${inputPath}" "${outputPath}"
        await execAsync(`python scripts/word_cleaner.py "${inputPath}" "${outputPath}"`);

        if (!fs.existsSync(outputPath)) {
            throw new Error('AI Formatting engine failed to produce output.');
        }

        res.json({
            success: true,
            downloadUrl: `/downloads/${downloadFileName}`,
            message: 'AI Formatting successful!'
        });

        scheduleCleanup([inputPath, outputPath]);
    } catch (error) {
        console.error('AI Formatting error:', error);
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        res.status(500).json({ error: 'Failed to format document. Ensure it is a valid .docx file.' });
    }
});

/**
 * Utility for scheduling file deletion
 */
function scheduleCleanup(files) {
    setTimeout(() => {
        files.forEach(file => {
            if (fs.existsSync(file)) {
                fs.unlink(file, (err) => {
                    if (err) console.error(`[Cleanup Error] Failed to delete ${file}:`, err);
                    else console.log(`[Cleanup] Deleted expired file: ${file}`);
                });
            }
        });
    }, 60 * 60 * 1000); // 60 mins
}

// Basic status route
app.get('/status', (req, res) => res.json({
    status: 'online',
    engines: ['pdf2docx', 'libreoffice-convert', 'PyMuPDF', 'python-docx']
}));

app.listen(port, () => {
    console.log(`=========================================`);
    console.log(`🚀 Conversion Server LIVE on port ${port}`);
    console.log(`📁 Public Downloads: /downloads/`);
    console.log(`=========================================`);
});

