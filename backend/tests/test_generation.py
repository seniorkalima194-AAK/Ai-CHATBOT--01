# Tests for the generation service.

from unittest.mock import patch

from app.services import generation_service


@patch("app.services.generation_service.generate")
def test_generate_answer(mock_generate):
    """The service should call the Gemma client correctly."""

    mock_generate.return_value = (
        "Photosynthesis is the process plants use to make food."
    )

    result = generation_service.generate_answer(
        "What is photosynthesis?"
    )

    mock_generate.assert_called_once_with(
        system_prompt=generation_service.SYSTEM_PROMPT,
        user_prompt="What is photosynthesis?",
    )

    assert result == (
        "Photosynthesis is the process plants use to make food."
    )