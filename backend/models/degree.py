from sqlmodel import Field, SQLModel

class Degree(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    title: str
    type: str
    