# Placeholder: tests for retrieval logic and vector search.
# Tests for the retrieval service.

from unittest.mock import MagicMock, patch

from app.rag.pipeline import RAGResult
from app.services import retrieval_service


@patch("app.services.retrieval_service.get_pipeline")
def test_retrieve_context(mock_get_pipeline):
    """The service should call the RAG pipeline with the question."""

    # Create a fake pipeline.
    mock_pipeline = MagicMock()

    # Create a fake RAG result.
    fake_result = RAGResult(
        question="What is photosynthesis?",
        prompt="Answer using the provided context.",
        chunks=[],
        prompt_token_estimate=10,
    )

    mock_pipeline.run.return_value = fake_result
    mock_get_pipeline.return_value = mock_pipeline

    # Call our service.
    result = retrieval_service.retrieve_context(
        "What is photosynthesis?"
    )

    # Make sure the pipeline was called correctly.
    mock_pipeline.run.assert_called_once_with(
        "What is photosynthesis?",
        top_k=None,
    )

    # Make sure the service returns the pipeline result.
    assert result == fake_result