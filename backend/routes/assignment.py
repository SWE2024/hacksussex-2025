from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select
from fastapi import Depends, FastAPI, Form, HTTPException, Query, Response, Cookie

import database
from models import *


router = APIRouter(prefix="", tags=["Users"])



@router.post("assignment/create")
def create_assignment(request: Request, session: database.SessionDeP, email: str = Cookie(None), ):
    if not email:
        raise HTTPException(status_code=401, detail="Unauthorized: No email in cookies")

    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")


    



