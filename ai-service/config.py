import os

class Settings:
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "demo-key")
    postgres_url: str = os.getenv("POSTGRES_URL", "postgresql://smartplant:smartplant123@localhost:5432/smartplant")
    mongo_url: str = os.getenv("MONGO_URL", "mongodb://smartplant:smartplant123@localhost:27017/smartplant?authSource=admin")
    neo4j_url: str = os.getenv("NEO4J_URL", "bolt://localhost:7687")
    neo4j_user: str = os.getenv("NEO4J_USER", "neo4j")
    neo4j_password: str = os.getenv("NEO4J_PASSWORD", "smartplant123")
    upload_dir: str = os.getenv("UPLOAD_DIR", "./uploads")
    embedding_model: str = "keyword-demo"

_settings = Settings()

def get_settings():
    return _settings
