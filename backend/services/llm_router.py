import os
import requests

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "Content-Type": "application/json"
}

MODEL_ROUTER = {
    "syllabus": "anthropic/claude-3-opus",
    "notes": "anthropic/claude-3-sonnet",
    "quiz": "openai/gpt-4",
    "chat": "anthropic/claude-3-sonnet",
    "grading": "openai/gpt-4",
}

def call_llm(prompt: str, model_key: str = "notes", temperature: float = 0.3) -> str:
    model = MODEL_ROUTER.get(model_key, "anthropic/claude-3-sonnet")

    payload = {
        "model": model,
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": temperature
    }

    response = requests.post(OPENROUTER_URL, headers=HEADERS, json=payload)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

def call_llm_json(prompt: str, model_key: str = "notes") -> dict:
    try:
        content = call_llm(prompt=prompt, model_key=model_key)
        return eval(content) if content.strip().startswith("{") else {"raw": content}
    except Exception:
        return {"raw": content if 'content' in locals() else "error"}