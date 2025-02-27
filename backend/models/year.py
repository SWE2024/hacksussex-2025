from sqlmodel import Field, SQLModel

class Year(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    num: int
    credits: int
    weight: float
    user_id: int = Field(foreign_key="user.id")
    