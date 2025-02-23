from sqlmodel import Field, SQLModel

class Module(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    credits: int
    year_id: int = Field(foreign_key="year.id")
    