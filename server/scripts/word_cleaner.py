import os
import re
from docx import Document
from docx.shared import Pt, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
import argparse
import sys

def ai_word_cleaner(input_path, output_path):
    try:
        doc = Document(input_path)
        
        # 1. Define Standard Styles
        # We modify the 'Normal' style for the whole document first
        style = doc.styles['Normal']
        font = style.font
        font.name = 'Arial'
        font.size = Pt(11)
        
        # Helper to set font explicitly on runs (Word can be stubborn with styles)
        def set_font_style(run, name='Arial', size=11, bold=False):
            run.font.name = name
            run._element.rPr.rFonts.set(qn('w:ascii'), name)
            run._element.rPr.rFonts.set(qn('w:hAnsi'), name)
            run.font.size = Pt(size)
            run.font.bold = bold

        for para in doc.paragraphs:
            text = para.text.strip()
            if not text:
                continue

            # 2. List Repair (Manual bullets to Word Bullets)
            # Pattern for lines starting with -, *, or numerical like 1)
            list_pattern = re.match(r'^([\-\*\•]|\d+[\.\)])\s+', text)
            if list_pattern:
                # Remove the manual bullet text
                para.text = text[len(list_pattern.group(0)):].strip()
                para.style = 'List Bullet' if not list_pattern.group(1).isdigit() else 'List Number'

            # 3. Header Normalization (Heuristics)
            # Detect headers: Short lines (< 60 chars), No ending period, or already Bold/Large
            is_likely_header = False
            
            # Check if all runs are bold or if it's very short
            all_bold = all(run.bold for run in para.runs if run.text.strip())
            if (len(text) < 60 and not text.endswith('.')) or all_bold:
                is_likely_header = True
            
            if is_likely_header:
                # Standardize to Heading 1 or 2 based on length
                para.style = 'Heading 1' if len(text) < 30 else 'Heading 2'
                # Force font on headers
                for run in para.runs:
                    set_font_style(run, 'Arial', 14, True)
            else:
                # 4. Body Text Font Unifier & Indentation Fixer
                # Standardize body text font
                for run in para.runs:
                    set_font_style(run, 'Arial', 11, run.bold) # Preserve sub-bolding
                
                # Fix weird indentation (5 spaces or leading whitespace)
                if para.text.startswith('     ') or para.text.startswith('\t'):
                    para.paragraph_format.first_line_indent = Inches(0.5)
                    para.text = para.text.lstrip()
                else:
                    # Generic standard indentation for all paragraphs
                    para.paragraph_format.first_line_indent = Inches(0.5)

                para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

        # Save the polished document
        doc.save(output_path)
        print(f"Success: Polished document saved to {output_path}")

    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='AI Word Document Formatter - Structural Cleaning')
    parser.add_argument('input', help='Input messy .docx file path')
    parser.add_argument('output', help='Output polished .docx file path')
    
    args = parser.parse_args()
    ai_word_cleaner(args.input, args.output)
