import pdfplumber

def extract_pdf_text(file_path: str) -> str:
    """
    Extracts all text from a syllabus PDF using pdfplumber.
    """
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text.strip()