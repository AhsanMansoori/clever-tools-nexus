import sys
import os
from pdf2docx import Converter
import argparse

def convert_pdf_to_docx(pdf_file, docx_file):
    try:
        # Check if file exists
        if not os.path.exists(pdf_file):
            print(f"Error: File {pdf_file} not found.")
            sys.exit(1)

        # Initialize converter
        cv = Converter(pdf_file)
        
        # Convert all pages with layout retention
        # multi_processing=True can be used for large files
        cv.convert(docx_file, start=0, duration=None)
        
        cv.close()
        print(f"Success: {pdf_file} converted to {docx_file}")
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Convert PDF to DOCX high fidelity')
    parser.add_argument('input', help='Input PDF file path')
    parser.add_argument('output', help='Output DOCX file path')
    
    args = parser.parse_args()
    convert_pdf_to_docx(args.input, args.output)
