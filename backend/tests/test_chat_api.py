# Tests for the chat API endpoint.

from unittest.mock import patch

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


@patch("app.api.routes.chat_routes.chat")
def test_chat_endpoint(mock_chat):
    """The API should return an answer for a valid question."""

    mock_chat.return_value = (
        "Photosynthesis is the process plants use to make food."
    )

    response = client.post(
        "/",
        json={
            "question": "What is photosynthesis?"
        },
    )

    assert response.status_code == 200

    assert response.json() == {
        "answer": "Photosynthesis is the process plants use to make food."
    }

    mock_chat.assert_called_once_with(
        "What is photosynthesis?"
    )