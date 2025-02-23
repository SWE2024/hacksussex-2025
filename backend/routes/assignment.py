from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select
from fastapi import Depends, FastAPI, Form, HTTPException, Query, Response, Cookie

import database
from models import Module, User, Year, Assignment


router = APIRouter(prefix="", tags=["Users"])



# /assignments/create
@router.post("/assignments/create")
def create_assignment(request: Request, session: database.SessionDeP, email: str = Cookie(None), module_name: str = Form(...), year: str = Form(...), weight: str = Form(...), assignment_type: str = Form(...), grade: str = Form(...), name: str = Form(...)):
    if not email:
        raise HTTPException(status_code=401, detail="Unauthorized: No email in cookies")

    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")


    
    statement = select(Year).where((Year.user_id == user.id) & (Year.num == year))
    years = session.exec(statement).all()

    if len(years) > 1:
        raise HTTPException(status_code=500, detail="Duplicated year")

    
    year_ref = years[0]


    statement = select(Module).where((Module.name == module_name) & (Module.year_id == year_ref.id))
    modules = session.exec(statement).all()

    if len(modules) > 1:
        raise HTTPException(status_code=500, detail="Duplicated year")

    
    module_ref = modules[0]



    
    statement = select(Assignment).where((Assignment.name == name) & (Assignment.module_id == module_ref.id))
    assignment = session.exec(statement).first()

    if assignment is not None:
        raise HTTPException(status_code=500, detail="Duplicated Assignment")
    

    grade_float = None
    try:
       grade_float = float(grade) 
    except Exception as e:
        print("could not convert str to float for grade")
        print(e)
        raise HTTPException(status_code=422, detail="Grade bad input")

    
    weight_float = None
    try:
        weight_float = float(weight)
    except Exception as e:
        print("could not convert str to float for weight")
        print(e)
        raise HTTPException(status_code=422, detail="Weight bad input")

    assignment = Assignment(module_id=module_ref.id, type_=assignment_type, grade=grade_float, name=name, weight=weight_float) 
    session.add(assignment)


    try:
        session.commit()
    except Exception as e:
        print("Could you commit")
        print(e)
        raise HTTPException(status_code=500, detail="Failed to commit")

    
    return JSONResponse(content={"message": "Added new assignment!"}, status_code=201)



@router.get("/assignments")
def get_assignments(request: Request, session: database.SessionDeP, email: str = Cookie(None), module_name: str = Form(...), year: str = Form(...)):
    if not email:
        raise HTTPException(status_code=401, detail="Unauthorized: No email in cookies")

    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")


    statement = select(Year).where((Year.user_id == user.id) & (Year.num == year))
    years = session.exec(statement).all()

    if len(years) > 1:
        raise HTTPException(status_code=500, detail="Duplicated year")

    
    year_ref = years[0]


    statement = select(Module).where((Module.name == module_name) & (Module.year_id == year_ref.id))
    modules = session.exec(statement).all()

    if len(modules) > 1:
        raise HTTPException(status_code=500, detail="Duplicated year")

    
    module_ref = modules[0]



    
    statement = select(Assignment).where(Assignment.module_id == module_ref.id)
    assignments = session.exec(statement).all()

    if assignments is None:
        return JSONResponse(content={""}, status_code=201)


    json = []

    for assignment in assignments:
        dic = {
            "type": assignment.type_,
            "grade": assignment.grade,
            "name": assignment.name,
            "weight": assignment.weight,
        }
        json.append(dic)
        
    return JSONResponse(content=json, status_code=201)


    



