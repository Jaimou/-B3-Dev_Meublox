from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_pwd(password: str):
    return pwd_context.hash(password)


def verify_pwd(plain_password: str, hash_password: str):
    return pwd_context.verify(plain_password, hash_password)
