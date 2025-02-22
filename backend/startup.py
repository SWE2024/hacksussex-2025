from models import University
from sqlmodel import Session


def init(engine):
    with Session(engine) as session:
        print("got session")


        uni = University(name="come on")
        session.add(uni)
        session.commit()
        print("transaction ran")
