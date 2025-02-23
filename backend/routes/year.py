from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select
from fastapi import Depends, FastAPI, Form, HTTPException, Query, Response, Cookie

import database
from models import *


router = APIRouter(prefix="", tags=["Users"])

@router.get("/year")
def get_year(request: Request, session: database.SessionDeP, email: str = Cookie(None)):
    if not email:
        raise HTTPException(status_code=401, detail="Unauthorized: No email in cookies")
    
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    statement_years = select(Year).where(Year.user_id == user.id)
    years = session.exec(statement_years).all()

    return {"years": years}

@router.post("/year/create")
def create_year(request: Request, session: database.SessionDeP, year: str = Form(...), credits: int = Form(...), weight: float = Form(...)):    
    email = request.cookies.get("email")

    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()

    if user == None:
        raise HTTPException(status_code=401, detail="User does not exist")
    else:
        new_year = Year(num=year, credits=credits, weight=weight, user_id=user.id)
        session.add(new_year)
        session.commit()

        # send the user a success code
        return JSONResponse(content={"message": "success"}, status_code=201)
