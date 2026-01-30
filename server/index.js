const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

const execAsync = util.promisify(exec);
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
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === '.pdf') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Our PDF engine requires a .pdf file.'));
        }
    }
});

/**
 * Route: PDF to Word Conversion
 * Receives PDF -> Processes via Python -> Returns Download Link -> Schedules Deletion
 */
app.post('/api/convert/pdf-to-word', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const inputPath = req.file.path;
    const downloadFileName = `converted_${uuidv4()}.docx`;
    const outputPath = path.join(__dirname, 'public/downloads', downloadFileName);

    try {
        console.log(`[Processing] ${req.file.originalname} -> ${downloadFileName}`);

        // Call the Python script (Ensure pdf2docx is installed in the environment)
        // Command template: python scripts/pdf_to_docx.py input.pdf output.docx
        await execAsync(`python scripts/pdf_to_docx.py "${inputPath}" "${outputPath}"`);

        if (!fs.existsSync(outputPath)) {
            throw new Error('High-fidelity conversion engine failed to produce output.');
        }

        // Return the download URL to the frontend
        const downloadUrl = `/downloads/${downloadFileName}`;
        res.json({
            success: true,
            downloadUrl,
            message: 'Conversion successful. File will be deleted in 60 minutes.'
        });

        // AUTO-SCHEDULE DELETION (60 Minutes)
        // This ensures the server storage remains clean
        setTimeout(() => {
            [inputPath, outputPath].forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlink(file, (err) => {
                        if (err) console.error(`[Cleanup Error] Failed to delete ${file}:`, err);
                        else console.log(`[Cleanup] Deleted expired file: ${file}`);
                    });
                }
            });
        }, 60 * 60 * 1000); // 60 minutes

    } catch (error) {
        console.error('PDF Conversion Error:', error);
        // Instant cleanup on failure
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        res.status(500).json({ error: 'Failed to convert PDF. Please ensure the file is not corrupted or password-secured.' });
    }
});

// Basic status route
app.get('/status', (req, res) => res.json({ status: 'online', engine: 'Node + Python pdf2docx' }));

app.listen(port, () => {
    console.log(`=========================================`);
    console.log(`🚀 Conversion Server LIVE on port ${port}`);
    console.log(`📁 Public Downloads: /downloads/`);
    console.log(`=========================================`);
});
