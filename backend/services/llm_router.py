import os
import requests

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "Content-Type": "application/json"
}

def call_llm(prompt: str, model: str = "anthropic/claude-3-sonnet", temperature: float = 0.3) -> str:
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

def call_llm_json(prompt: str, model: str = "anthropic/claude-3-sonnet") -> dict:
    try:
        content = call_llm(prompt, model=model, temperature=0.2)
        return eval(content) if content.strip().startswith("{") else {"raw": content}
    except Exception:
        return {"raw": content if 'content' in locals() else "error"}