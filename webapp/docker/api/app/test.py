import json
import requests
import os




a_dict = {"gamemode": "twister-classic","playerinfo": [{"name": "testeerrer", "score": 876, "place": 1},{"name": "blabla", "score": 654, "place": 2},{"name": "shiangriliaaa", "score": 543, "place": 3}]}


def getscores():
    scoreslist = []
    with open("./api/app/scores.json") as f:
        for score in f:
            scoresdict = json.loads(score)
            scoreslist.append(scoresdict)
        f.close()
    return scoreslist

def savescores(par_scoresdict):
    try:
        jsonobj = json.dumps(par_scoresdict)
        with open("./api/app/scores.json", "a") as f:
            f.write(jsonobj)
            f.write("\n")
        f.close()
        return "succes"
    except:
        return "failed"

def getfilteredscores():
    gamemodex = "twister-classic"
    filteredscoreslist = []
    with open("./api/app/scores.json") as f:
        for score in f:
            scoresdict = json.loads(score)
            if scoresdict["gamemode"] == gamemodex:
                for playerscore in scoresdict["playerinfo"]:
                    filteredscoreslist.append(playerscore)
    f.close()
    filteredscoreslist = sorted(filteredscoreslist, key=lambda k: k.get('score', 0), reverse=True)
    return filteredscoreslist

def testrequest(gamemode=None):
    gamemodex = gamemode if gamemode is not None else "twister-classic"
    r = requests.get(f'http://127.0.0.1:5000/scores/{gamemodex}')
    json_objs = json.loads(r.text) 
    print(json_objs)

test = getfilteredscores()
print(test)