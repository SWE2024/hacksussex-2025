from typing import Annotated
from sqlmodel import SQLModel, Session, create_engine
from fastapi import Depends


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session


SessionDeP = Annotated[Session, Depends(get_session)]
