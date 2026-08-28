# Placeholder: request/response schemas for chat interactions.
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    """Request body sent by the client."""

    question: str = Field(..., min_length=1)


class ChatResponse(BaseModel):
    """Response returned by the chatbot API."""

    answer: str