# Placeholder: ingestion workflow for processing and indexing documents.
import json
import logging
from pathlib import Path

from app.documents.pdf_parser import extract_pdf
from app.documents.cleaner import clean_text
from app.documents.chunker import chunk_text

logger = logging.getLogger(__name__)

RAW_DIR = Path("data/raw")
PROCESSED_DIR = Path("data/processed")

# Default values.
# If your project already has app.core.config,
# replace these with settings from config.py.
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50


def process_pdf(pdf_path: Path) -> list[dict]:
    """
    Process one PDF:
        PDF -> extraction -> cleaning -> chunking
    """

    pages = extract_pdf(pdf_path)

    processed_chunks = []

    for page in pages:
        cleaned = clean_text(page["text"])

        if not cleaned:
            logger.warning(
                "Empty cleaned text: %s page %s",
                page["source"],
                page["page"],
            )
            continue

        chunks = chunk_text(
            cleaned,
            chunk_size=CHUNK_SIZE,
            overlap=CHUNK_OVERLAP,
        )


        for chunk in chunks:
            processed_chunks.append(
                {
                    "text": chunk,
                    "source": page["source"],
                    "page": page["page"],
                }
            )

        return processed_chunks


def ingest_documents(
    raw_dir: Path = RAW_DIR,
    output_dir: Path = PROCESSED_DIR,
) -> None:
    """
    Process all PDF files inside raw_dir.
    """

    output_dir.mkdir(
        parents=True,
        exist_ok=True,
    )

    pdf_files = list(raw_dir.rglob("*.pdf"))

    if not pdf_files:
        logger.warning(
            "No PDF files found in %s",
            raw_dir,
        )
        return

    for pdf_path in pdf_files:
        logger.info(
            "Processing: %s",
            pdf_path,
        )

        try:
            chunks = process_pdf(pdf_path)

            if not chunks:
                logger.warning(
                    "No chunks generated for %s",
                    pdf_path.name,
                )
                continue

            output_file = output_dir / (
                pdf_path.stem + ".json"
            )

            with output_file.open(
                "w",
                encoding="utf-8",
            ) as file:
                json.dump(
                    chunks,
                    file,
                    ensure_ascii=False,
                    indent=2,
                )

            logger.info(
                "Saved %s chunks to %s",
                len(chunks),
                output_file,
            )

        except Exception as exc:
            logger.warning(
                "Skipping malformed/unreadable PDF %s: %s",
                pdf_path,
                exc,
            )


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(levelname)s: %(message)s",
    )

    ingest_documents()