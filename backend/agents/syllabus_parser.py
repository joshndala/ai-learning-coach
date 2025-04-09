from data.pdf_parser import extract_pdf_text
from services.llm_router import call_llm_for_structure

class SyllabusParserAgent:
    def __init__(self):
        pass

    def parse(self, file_path: str) -> dict:
        """
        Parses the syllabus PDF using LLM to extract structured course data.
        """
        raw_text = extract_pdf_text(file_path)

        prompt = (
            "You are an academic assistant. Given the following syllabus text, "
            "extract a structured summary in JSON format with the following fields:\n"
            "- course_title\n"
            "- course_summary (if available)\n"
            "- duration: {start_date, end_date}\n"
            "- days_of_week: list of days the class meets (e.g., Monday, Wednesday)\n"
            "- location (if available)\n"
            "- office_hours: list of times and locations if present\n"
            "- topics: list of {week, topic, optional date range}\n"
            "- assignments: list of {name, due_date if available}\n"
            "- midterms: list of {name, date}\n"
            "- final_exam: {date} if found\n"
            "- grading_breakdown: list of {component, percentage}\n"
            "\nHere is the syllabus text:\n"
            f"{raw_text}"
        )

        parsed = call_llm_json(prompt=prompt, model_key="syllabus")
        return parsed