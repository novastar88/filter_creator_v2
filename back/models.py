from pydantic import BaseModel

class FilterData(BaseModel):
    content: str
    typee: str
    
    
if __name__ == "__main__":
    pass