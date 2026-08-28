# Tests for chat API schemas.

import pytest
from pydantic import ValidationError

from app.schemas.chat_schema import ChatRequest, ChatResponse


def test_chat_request():
    """ChatRequest should accept a valid question."""

    request = ChatRequest(
        question="What is photosynthesis?"
    )

    assert request.question == "What is photosynthesis?"


def test_chat_response():
    """ChatResponse should accept a valid answer."""

    response = ChatResponse(
        answer="Photosynthesis is the process plants use to make food."
    )

    assert response.answer == (
        "Photosynthesis is the process plants use to make food."
    )


def test_chat_request_rejects_empty_question():
    """ChatRequest should reject an empty question."""

    with pytest.raises(ValidationError):
        ChatRequest(question="")