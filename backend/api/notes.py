from fastapi import APIRouter, UploadFile, File, Form
from agents.note_summarizer import NoteSummarizerAgent
import tempfile

router = APIRouter()

@router.post("/summarize-notes")
def summarize_notes(file: UploadFile = File(None), pasted_notes: str = Form(None)):
    agent = NoteSummarizerAgent()

    if pasted_notes:
        return agent.summarize(pasted_notes)

    elif file:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            contents = file.file.read()
            tmp.write(contents)
            tmp_path = tmp.name
        return agent.summarize_file(tmp_path)

    return {"error": "No notes provided"}