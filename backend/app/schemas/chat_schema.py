# Placeholder: request/response schemas for chat interactions.
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str = Field(
        ...,
        description="Message role: user or assistant"
    )
    content: str = Field(
        ...,
        min_length=1,
        description="Message content"
    )


class ChatRequest(BaseModel):
    message: str = Field(
        ...,
        min_length=1,
        description="User's question"
    )
    session_id: Optional[str] = Field(
        default=None,
        description="Chat session identifier"
    )


class Source(BaseModel):
    source: str
    page: Optional[int | str] = None

#hii inaonesha chat response ya model
class ChatResponse(BaseModel):
    answer: str
    sources: List[Source] = Field(
        default_factory=list
    )
    session_id: Optional[str] = None

#hii inaonesha chat history
class ChatHistoryResponse(BaseModel):
    session_id: str
    messages: List[ChatMessage] = Field(
        default_factory=list
    )
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None