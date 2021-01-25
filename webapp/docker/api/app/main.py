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

scorespath = "/var/lib/docker/volumes/project-api/scores.json"   # /var/lib/docker/volumes/project-api/

app = FastAPI()

@app.get("/scores/{gamemode}")
async def get_scores(gamemode: str = None):
    try:
        gamemodex = gamemode if gamemode is not None else "twister-classic"
        filteredscoreslist = []
        with open(scorespath, "r") as f:
            for score in f:
                scoresdict = json.loads(score)
                if scoresdict["gamemode"] == gamemodex:
                    for playerscore in scoresdict["playerinfo"]:
                        filteredscoreslist.append(playerscore)
        f.close()
        filteredscoreslist = sorted(filteredscoreslist, key=lambda k: k.get('score', 0), reverse=True)
        return filteredscoreslist
    except Exception as e:
        print('api error in get scores:', e)
        return "failed"

@app.post("/scores") # werkt maar scores.json moet nog in volume, docker maakt snapchot bij opstart en kan geen txt files editn
async def add_scores(score: Score):
    try:
        jsonobj = json.dumps(jsonable_encoder(score))
        with open(scorespath, "a") as f:
            f.write(jsonobj)
            f.write("\n")
        f.close()
        return "succes"
    except Exception as e:
        print('api error in post scores:', e)
        return "failed"
    