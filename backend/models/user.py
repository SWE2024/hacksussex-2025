from sqlmodel import Field, SQLModel

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    email: str = Field(index=True, unique=True)
    password: str
    university_id: int = Field(foreign_key="university.id")
    degree_id: int = Field(foreign_key="degree.id")
    