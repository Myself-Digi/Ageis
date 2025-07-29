from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # App settings
    app_name: str = "Aegis"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # Supabase settings
    supabase_url: str
    supabase_key: str
    
    # OpenAI settings
    openai_api_key: str
    
    # Google Calendar settings
    google_client_id: str
    google_client_secret: str
    
    # JWT settings
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Database settings
    database_url: str
    
    class Config:
        env_file = ".env"


settings = Settings()