from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db_methods import DatabaseS
from json import dumps
from models import FilterData


app = FastAPI()

origins = ["*",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return ""


@app.get('/filters_main/{typee}')
async def get_filters_main(typee: str):
    return dumps({'result': DatabaseS().get_filters_main(typee=typee)})


@app.put('/filter_data/')
async def get_filter_data(data: FilterData):
    return DatabaseS().filter_data(data)