from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, Form, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import Annotated, Union

from models import University, Degree, Year, Module, Assignment, User


from startup import init





sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDeep = Annotated[Session, Depends(get_session)]


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    init(engine)
    print("finished init")
    yield


app = FastAPI(lifespan=lifespan)


origins = [
    "http://localhost:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


university_file = open('./lists/universities.txt', 'r')
university_list = university_file.readlines()
university_list = [line.strip() for line in university_list] # remove the whitespace and newlines
type_file = open('./lists/types.txt', 'r')
type_list = type_file.readlines()
type_list = [line.strip() for line in type_list] # remove the whitespace and newlines



    



# @app.on_event("startup")
# def on_startup():
#     create_db_and_tables()




@app.get("/")
def root():
    raise HTTPException(status_code=400, detail="Endpoint does not exist")


@app.get("/register")
def create_register_page():
    return { "universities":university_list, "types":type_list }


@app.post("/register")
def register(session: SessionDeep, fullname: str = Form(...), email: str = Form(...), password: str = Form(...), uni: str = Form(...), degreeType: str = Form(...), degreeTitle: str = Form(...)):
    print(fullname, email, password, uni, degreeType, degreeTitle)
    if (False):
        raise HTTPException(status_code=201, detail="Not implemented yet")
    else:
        raise HTTPException(status_code=401, detail="Not implemented yet")
