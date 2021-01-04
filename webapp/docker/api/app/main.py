from fastapi import FastAPI
from random import randint

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}