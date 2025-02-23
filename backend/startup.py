from sqlmodel import Session

from models import University


university_file = open('./lists/universities.txt', 'r')
university_list = university_file.readlines()


def init(engine):
    with Session(engine) as session:
        # populate university list
        for name in university_list:
            name = name.strip()
            uni = University(name=f"{name}")
            session.add(uni)
        session.commit()


def set_university_global(app):
    university_file = open('./lists/universities.txt', 'r')
    university_list = university_file.readlines()
    university_list = [line.strip() for line in university_list] # remove the whitespace
    type_file = open('./lists/types.txt', 'r')
    type_list = type_file.readlines()
    type_list = [line.strip() for line in type_list] # remove the whitespace and newlines

    app.university_list = university_list
    app.type_list = type_list