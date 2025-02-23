from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select
from fastapi import Depends, FastAPI, Form, HTTPException, Query, Response

import database
from models import *


router = APIRouter(prefix="", tags=["Users"])


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
