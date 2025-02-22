from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select

class Module(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    credits: int
    year_id: int = Field(foreign_key="year.id")

