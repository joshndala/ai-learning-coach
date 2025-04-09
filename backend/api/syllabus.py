from fastapi import APIRouter, UploadFile, File
from agents.syllabus_parser import SyllabusParserAgent
import tempfile

router = APIRouter()

@router.post("/parse-syllabus")
def parse_syllabus(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        contents = file.file.read()
        tmp.write(contents)
        tmp_path = tmp.name

    agent = SyllabusParserAgent()
    result = agent.parse(tmp_path)
    return result