from fastapi import APIRouter, Form, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlmodel import select

import database
from models import *


router = APIRouter(prefix="", tags=["Users"])


@router.get("/modules")
def get_modules(request: Request, session: database.SessionDeP, year: str):    
    email = request.cookies.get("email")

    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()

    if user is None:
        raise HTTPException(status_code=401, detail="User does not exist")

    statement_year = select(Year).where((Year.num == year) & (Year.user_id == user.id))
    year_ = session.exec(statement_year).first()

    if year_ is None:
        raise HTTPException(status_code=404, detail="Year not found for this user")

    statement_modules = select(Module).where(Module.year_id == year_.id)
    modules = session.exec(statement_modules).all()

    return JSONResponse(content={"modules": [module.dict() for module in modules]}, status_code=200)

@router.post("/module/create")
def create_module(request: Request, session: database.SessionDeP, module_name: str = Form(...), credits: int = Form(...), year: str = Form(...)):
    email = request.cookies.get("email")

    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()

    if user is None:
        raise HTTPException(status_code=401, detail="User does not exist")

    statement_year = select(Year).where((Year.num == year) & (Year.user_id == user.id))
    year_ = session.exec(statement_year).first()

    if year_ is None:
        print("year not found for this user")
        raise HTTPException(status_code=404, detail="Year not found for this user")

    new_module = Module(name=module_name, credits=credits, year_id=year_.id)
    session.add(new_module)
    session.commit()

    # send the user a success code
    return JSONResponse(content={"message": "success"}, status_code=201)
