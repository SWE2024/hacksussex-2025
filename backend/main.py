from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, Form, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import Annotated, Union
from models import University, Degree, Year, Module, Assignment, User

import re


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

    legal_input = True

    # sanitise full name
    fullname = fullname.strip()
    fullname = re.sub(r"[^a-zA-Z\s'-]", "", fullname)
    fullname = re.sub(r"[\s-]+", " ", fullname)
    fullname = fullname.title()

    # sanitise email
    email = email.strip()
    if not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email):
        legal_input = False
    
    # sanitise password
    password = password.strip()
    if len(password) < 8 or len(password) > 20: # check length
        legal_input = False
    if not re.search(r'[a-zA-Z0-9]', password): # check for alnum
        legal_input = False
    if not re.search(r'[^a-zA-Z0-9]', password): # check for special char
        legal_input = False

    uni = uni.strip()
    if len(uni) < 1 or len(uni) > 50:
        legal_input = False
    
    degreeType = degreeType.strip()
    if len(degreeType) < 1 or len(degreeType) > 50:
        legal_input = False

    degreeTitle = degreeTitle.strip()
    if len(degreeTitle) < 1 or len(degreeTitle) > 50:
        legal_input = False

    try:
        if (legal_input):
            # add user to db

            # send the user a success code
            raise HTTPException(status_code=201, detail="User registered successfully")
        else:
            raise HTTPException(status_code=401, detail="Form entered incorrectly")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Unexpected error occurred")