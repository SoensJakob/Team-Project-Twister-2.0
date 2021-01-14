import json

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

print(savescores(a_dict))
print(getscores())