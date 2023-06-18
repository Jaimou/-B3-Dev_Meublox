from pydantic import BaseSettings


class Settings(BaseSettings):
    db_hostname: str
    db_port: str
    #db_password: str
    db_name: str
    #db_username: str
    environment : str

    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    class Config:
        env_file = ".env"


settings = Settings()