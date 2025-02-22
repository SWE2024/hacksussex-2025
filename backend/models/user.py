from enum import unique
from typing import Annotated
from typing_extensions import Required

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    email: str = Field(default=None, index=True, unique=True)
    password: str
    university_id: int = Field(foreign_key="university.id") 
    degree_id: int = Field(foreign_key="degree.id")
