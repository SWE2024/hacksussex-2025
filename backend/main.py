from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, Form, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from models import University, Degree, Year, Module, Assignment, User
from pydantic import BaseModel
from sqlmodel import Field, Session, SQLModel, create_engine, select
from startup import init
from typing import Annotated, Union
from routes.auth import router as auth_routes

import database

from startup import init, set_university_global








@asynccontextmanager
async def lifespan(app: FastAPI):
    database.create_db_and_tables()
    init(database.engine)
    set_university_global(app)
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




@app.get("/")
def root():
    raise HTTPException(status_code=400, detail="Endpoint does not exist")



app.include_router(auth_routes)
