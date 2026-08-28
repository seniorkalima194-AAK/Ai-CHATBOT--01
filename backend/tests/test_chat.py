# Placeholder: tests for chat API behavior.
# Tests for the chatbot service.

from unittest.mock import patch

from app.rag.pipeline import RAGResult
from app.services import chatbot_service


@patch("app.services.chatbot_service.generate_answer")
@patch("app.services.chatbot_service.retrieve_context")
def test_chat(mock_retrieve_context, mock_generate_answer):
    """The chat service should retrieve context and generate an answer."""

    fake_result = RAGResult(
        question="What is photosynthesis?",
        prompt="Answer using this context: Plants use sunlight to make food.",
        chunks=[],
        prompt_token_estimate=10,
    )

    mock_retrieve_context.return_value = fake_result
    mock_generate_answer.return_value = (
        "Photosynthesis is how plants make food using sunlight."
    )

    result = chatbot_service.chat(
        "What is photosynthesis?"
    )

    mock_retrieve_context.assert_called_once_with(
        "What is photosynthesis?"
    )

    mock_generate_answer.assert_called_once_with(
        fake_result.prompt
    )

    assert result == (
        "Photosynthesis is how plants make food using sunlight."
    )