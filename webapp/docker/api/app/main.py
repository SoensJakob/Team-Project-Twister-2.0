import os
import sys
import json
from sys import platform
from pydantic import BaseModel
from json.decoder import JSONDecodeError
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

# postman scores post json example
# {"gamemode": "twister-classic","playerinfo": [{"name": "a", "score": 978, "place": 1},{"name": "b", "score": 543, "place": 2},{"name": "c", "score": 321, "place": 3}]}

class Player(BaseModel):
    place: int
    name: str
    score: float

class Score(BaseModel):
    gamemode: str
    playerinfo: list=[Player]

scorespath = "./data/scores.json"

app = FastAPI()

@app.get("/scores/{gamemode}")
async def get_scores(gamemode: str = None):
    try:
        gamemodex = gamemode if gamemode is not None else "twister-classic"
        filteredscoreslist = []
        with open(scorespath) as f:
            for score in f:
                scoresdict = json.loads(score)
                if scoresdict["gamemode"] == gamemodex:
                    for playerscore in scoresdict["playerinfo"]:
                        filteredscoreslist.append(playerscore)
        f.close()
        filteredscoreslist = sorted(filteredscoreslist, key=lambda k: k.get('score', 0), reverse=True)
        print("--api--")
        print(filteredscoreslist)
        return filteredscoreslist
    except Exception as e:
        print('api error in get scores:', e)
        return "failed"

@app.post("/scores")
async def add_scores(score: Score):
    try:
        jsonobj = json.dumps(jsonable_encoder(score))
        print("--post api--")
        print(jsonobj)
        with open(scorespath, "a") as f:
            f.write(jsonobj)
            f.write("\n")
        f.close()
        return "succes"
    except Exception as e:
        print('api error in post scores:', e)
        return "failed"
    

