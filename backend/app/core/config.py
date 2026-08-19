# Placeholder: application configuration and environment settings.
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ollama_host: str = "http://localhost:11434"
    ollama_model: str = "gemma4:latest"
    ollama_temperature: float = 0.7
    ollama_timeout: float = 120.0

    model_config = SettingsConfigDict(
        env_file="../.env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()