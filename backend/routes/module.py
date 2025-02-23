from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select
from fastapi import Depends, FastAPI, Form, HTTPException, Query, Response

import database
from models import *


router = APIRouter(prefix="", tags=["Users"])


@router.post("/module/create")
def create_module(request: Request, session: database.SessionDeP, module_name: str = Form(...), credits: int = Form(...), year: str = Form(...), email: str = Form(...)):
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()

    if user == None:
        raise HTTPException(status_code=401, detail="User does not exist")

    statement_year = select(Year).where((Year.num == year) & (Year.user_id == user.id))
    year_ = session.exec(statement_year).first()

    if year_ == None:
        print("year not found for this user")
        raise HTTPException(status_code=404, detail="Year not found for this user")

    new_module = Module(name=module_name, credits=credits, year_id=year_.id)
    session.add(new_module)
    session.commit()

    # send the user a success code
    return JSONResponse(content={"message": "success"}, status_code=201)
