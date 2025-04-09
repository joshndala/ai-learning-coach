from data.pdf_parser import extract_pdf_text
from services.llm_router import call_llm_json

class NoteSummarizerAgent:
    def __init__(self):
        pass

    def summarize(self, text: str) -> dict:
        """
        Summarizes provided note text into rich, styled markup text.
        """
        prompt = (
            "You are a helpful academic assistant. Convert the following raw student notes into a clean and structured markdown or rich text summary. "
            "Feel free to use lists, tables, headers, and formatting where appropriate to improve readability.\n\n"
            f"{text}"
        )
        return {"markup": call_llm(prompt=prompt, model_key="notes")}

    def summarize_file(self, file_path: str) -> dict:
        """
        Extracts and summarizes text from a PDF file.
        """
        text = extract_pdf_text(file_path)
        return self.summarize(text)