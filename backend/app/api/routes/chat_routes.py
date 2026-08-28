# Placeholder: chat API routes for the chatbot backend.
# API routes for chat requests.

from fastapi import APIRouter

from app.schemas.chat_schema import ChatRequest, ChatResponse
from app.services.chatbot_service import chat


router = APIRouter()


@router.post("/", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest) -> ChatResponse:
    """
    Handle a chat request and return the generated answer.
    """
    answer = chat(request.question)

    return ChatResponse(answer=answer)