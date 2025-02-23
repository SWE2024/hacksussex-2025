from sqlmodel import Field, SQLModel

class Assignment(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    module_id: int = Field(foreign_key="module.id")
    type_: str
    grade: float | None = Field(default=None)
    name: str
    weight: float
