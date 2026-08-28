# Placeholder: retrieval pipeline service for document lookup.
# Service responsible for retrieving relevant learning material.

from typing import Optional

from app.rag.pipeline import RAGResult, get_pipeline


def retrieve_context(
    question: str,
    top_k: Optional[int] = None,
) -> RAGResult:
    """
    Retrieve relevant learning material for a student question.

    The RAG pipeline handles the actual retrieval work.
    This service only provides a simple interface for the chatbot service.
    """

    # Get the shared RAG pipeline.
    pipeline = get_pipeline()

    # Run retrieval and prompt building.
    result = pipeline.run(
        question,
        top_k=top_k,
    )

    return result