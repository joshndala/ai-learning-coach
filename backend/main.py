from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(syllabus_router, prefix="/api")
app.include_router(notes_router, prefix="/api")

@app.get("/")
def read_root():
    return {"status": "Backend is running"}