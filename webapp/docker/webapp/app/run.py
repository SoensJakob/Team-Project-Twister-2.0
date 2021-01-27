import os
import time
import json
import socket
import logging
import requests
import threading
from random import randint
from flask import Flask, jsonify, request, render_template
from flask import url_for, render_template, request, redirect, session, g

app = Flask(__name__)


hostip = "192.168.4.1"

# rpi static : 192.168.3.1
# r thuis: 192.168.0.173
# r school: 172.30.252.7
# edd : 192.168.0.25

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html', mqttip=hostip)

@app.route('/info', methods=['GET'])
def info():
    return render_template('info.html')

@app.route('/initgame', methods=['GET'])
def initgame():
    return render_template('initgame.html', mqttip=hostip)

@app.route('/game', methods=['GET'])
def game():
    return render_template('game.html', mqttip=hostip)

@app.route('/scores', methods=['GET'])
@app.route('/scores/<gamemode>', methods=['GET', 'POST'])
def scores(gamemode=None):
    gamemodex = gamemode if gamemode is not None else "twister-classic"

    if request.method == 'GET':
        try:
            resp = getscores(gamemodex)
            print("-- get -- ", resp)
            json_resp = json.loads(json.dumps(resp))
            return render_template('scores.html', gamemode=gamemodex, gamescores=json_resp)
        except Exception as e:
            print("main - scores error get: ", e)
            return render_template('scores.html')
        
    if request.method == 'POST':
        try:
            jsonscores = json.loads(request.data) 
            print("-- post -- ", jsonscores)
            savescores(jsonscores)
            return "succes"
            
        except Exception as e:
            print("main - scores error post: ", e)
            return "failed"

def getscores(gamemode):
    try:
        gamemodex = gamemode if gamemode is not None else "twister-classic"
        filteredscoreslist = []
        with open("./data/scores.json") as f:
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

def savescores(score):
    try:
        jsonobj = json.dumps(score)
        with open("./data/scores.json", "a") as f:
            f.write(jsonobj)
            f.write("\n")
        f.close()
        return "succes"
    except Exception as e:
        print('flask error in savescore:', e)
        return "failed"

    


if __name__ == '__main__':
    app.run()