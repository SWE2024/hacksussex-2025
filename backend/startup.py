from models import University
from sqlmodel import Session


university_file = open('./lists/universities.txt', 'r')
university_list = university_file.readlines()

def init(engine):
    with Session(engine) as session:
        for name in university_list:
            name = name.strip()
            uni = University(name=f"{name}")
            session.add(uni)
        session.commit()
