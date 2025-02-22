from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select

class Degree(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    type: str


