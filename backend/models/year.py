from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select

class Year(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    num: int
    credits: int
    weight: float 
    user_id: int = Field(foreign_key="user.id")


