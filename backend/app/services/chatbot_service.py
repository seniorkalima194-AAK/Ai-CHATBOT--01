# Placeholder: orchestration service for chat request handling.

from app.services.generation_service import generate_answer
from app.services.retrieval_service import retrieve_context


def chat(question: str) -> str:
    """
    Handle a complete chat request.

    The service:
    1. Retrieves relevant context for the question.
    2. Sends that context to the generation service.
    3. Returns the generated answer.
    """
    result = retrieve_context(question)

    return generate_answer(result.prompt)