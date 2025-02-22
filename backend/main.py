from typing import Union

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()


university_file = open('./lists/universities.txt', 'r')
university_list = university_file.readlines()
university_list = [line.strip() for line in university_list] # remove the whitespace and newlines

type_file = open('./lists/types.txt', 'r')
type_list = type_file.readlines()
type_list = [line.strip() for line in type_list] # remove the whitespace and newlines


@app.get("/")
def root():
    raise HTTPException(status_code=400, detail="Endpoint does not exist")


@app.get("/signup")
def create_register():
    return { "universities":university_list, "types":type_list }


@app.post("/signup")
def register():
    raise HTTPException(status_code=201, detail="Not implemented")