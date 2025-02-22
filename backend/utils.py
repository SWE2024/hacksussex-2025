import bcrypt

def hash_password(password: str) -> str:
    password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    return password_hash.decode()


def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed_password.encode())
