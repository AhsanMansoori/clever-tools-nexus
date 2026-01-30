# ToolifyHubs High-Fidelity Backend

This backend handles heavy document processing for PDF and Word conversions, ensuring layout retention and professional quality.

## Prerequisites
1. **Node.js**: Installed on the system.
2. **Python 3.x**: Installed on the system.
3. **LibreOffice**: Must be installed on the server/machine (required for Word -> PDF conversion).
   - Windows: Add LibreOffice `program` folder to PATH.
   - Linux: `sudo apt install libreoffice`

## Setup Instructions

### 1. Install Node Dependencies
```bash
cd server
npm install
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Server
```bash
npm start
```

## API Endpoints
- **POST** `/api/convert/pdf-to-word`: Upload a `.pdf` file to receive a formatted `.docx`.
- **POST** `/api/convert/word-to-pdf`: Upload a `.docx` or `.doc` file to receive a precise `.pdf`.

## Security Features
- **UUID Sanitization**: All uploaded files are renamed to UUIDs to prevent directory traversal or filename exploits.
- **Immediate Cleanup**: Input and output files are deleted immediately after the response is sent to the client, ensuring privacy (Zero-log policy).
- **MIME Validation**: Only allowed document types are accepted.
