from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select
import re
from fastapi import Depends, FastAPI, Form, HTTPException, Query, Response

import database
from utils import hash_password, verify_password
from models import University, Degree, User


router = APIRouter(prefix="", tags=["Users"])


@router.post("/login")
def login(session: database.SessionDeP, email: str = Form(...), password: str = Form(...)):
    if not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email):
        raise HTTPException(status_code=401, detail="Incorrect login")
    
    if len(password) < 8 or len(password) > 20:
        raise HTTPException(status_code=401, detail="Incorrect login")
    
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    if user == None:
        raise HTTPException(status_code=401, detail="Account not found")
    
    if verify_password(password, user.password):
        return JSONResponse(content={"message": "success"}, status_code=201)
    else:
        raise HTTPException(status_code=401, detail="Incorrect login")


@router.get("/register")
def create_register_page(request: Request):
    app = request.app
    return { "universities": app.university_list, "types": app.type_list }


@router.post("/register")
def register(session: database.SessionDeP, fullname: str = Form(...), email: str = Form(...), password: str = Form(...), uni: str = Form(...), degreeType: str = Form(...), degreeTitle: str = Form(...)):
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    if user == None:
        
        legal_input = True

        # sanitise full name
        fullname = fullname.strip()
        fullname = re.sub(r"[^a-zA-Z\s'-]", "", fullname)
        fullname = re.sub(r"[\s-]+", " ", fullname)
        fullname = fullname.title()

        # sanitise email
        email = email.strip()
        if not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email):
            legal_input = False
        
        # sanitise password
        password = password.strip()
        if len(password) < 8 or len(password) > 20: # check length
            legal_input = False
        if not re.search(r'[a-zA-Z0-9]', password): # check for alnum
            legal_input = False
        if not re.search(r'[^a-zA-Z0-9]', password): # check for special char
            legal_input = False

        uni = uni.strip()
        if len(uni) < 1 or len(uni) > 50:
            legal_input = False
        
        degreeType = degreeType.strip()
        if len(degreeType) < 1 or len(degreeType) > 50:
            legal_input = False

        degreeTitle = degreeTitle.strip()
        if len(degreeTitle) < 1 or len(degreeTitle) > 50:
            legal_input = False

        try:
            if (legal_input):
                # hash user password
                hashed_password = hash_password(password)

                # get university and degree ids
                statement = select(University).where(University.name == uni)
                university: University | None = session.exec(statement).first()
                if university == None:
                    raise HTTPException(status_code=401, detail="University does not exist")

                statement = select(Degree).where(Degree.title == degreeTitle and Degree.type == degreeType)
                degree = session.exec(statement).first()
                if degree == None:
                    degree = Degree(title=degreeTitle, type=degreeType)
                    session.add(degree)
                    session.flush()
                
                degree = session.exec(statement).first()

                if degree is None:
                    raise HTTPException(status_code=401, detail="no degree found")

                # add user to db
                user = User(name=fullname, email=email, password=hashed_password, university_id=university.id, degree_id=degree.id)
                session.add(user)
                session.commit()

                # send the user a success code
                return JSONResponse(content={"message": "success"}, status_code=201)
            else:
                raise HTTPException(status_code=401, detail="Form entered incorrectly")
        except Exception:
            raise HTTPException(status_code=400, detail="Unexpected error occurred")
