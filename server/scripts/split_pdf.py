import sys
import os
import fitz  # PyMuPDF
import zipfile
import argparse

def split_pdf_to_zip(input_pdf, output_zip):
    try:
        if not os.path.exists(input_pdf):
            print(f"Error: {input_pdf} not found")
            sys.exit(1)

        doc = fitz.open(input_pdf)
        base_name = os.path.basename(input_pdf).replace('.pdf', '')
        
        # Create a temporary directory or just keep files in memory
        with zipfile.ZipFile(output_zip, 'w') as zipf:
            for i in range(len(doc)):
                # Create a new PDF for each page
                new_doc = fitz.open()
                new_doc.insert_pdf(doc, from_page=i, to_page=i)
                
                # Save to a temporary bytes object
                pdf_bytes = new_doc.write()
                
                # Add to ZIP
                page_name = f"{base_name}_page_{i+1}.pdf"
                zipf.writestr(page_name, pdf_bytes)
                
                new_doc.close()
        
        doc.close()
        print(f"Success: PDF split into {output_zip}")
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Split PDF into individual pages within a ZIP')
    parser.add_argument('input', help='Input PDF file')
    parser.add_argument('output', help='Output ZIP file')
    
    args = parser.parse_args()
    split_pdf_to_zip(args.input, args.output)
