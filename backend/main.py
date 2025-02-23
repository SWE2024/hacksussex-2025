from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from models import University, Degree, Year, Module, Assignment, User
from pydantic import BaseModel
from sqlmodel import Field, Session, SQLModel, create_engine, select
from startup import init, set_university_global
from typing import Annotated, Union
from routes.auth import router as auth_routes
from routes.year import router as year_routes
from routes.module import router as module_routes
from routes.assignment import router as assignment_routes

import database


@asynccontextmanager
async def lifespan(app: FastAPI):
    database.create_db_and_tables()
    init(database.engine)
    set_university_global(app)
    yield


app = FastAPI(lifespan=lifespan)


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
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


# add custom file routes
app.include_router(auth_routes)
app.include_router(year_routes)
app.include_router(module_routes)
app.include_router(assignment_routes)
