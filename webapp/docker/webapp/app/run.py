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

hostip = "192.168.0.25"
# rpi static : 192.168.3.1
# r thuis: 192.168.0.173
# r school: 172.30.252.7
# edd : 192.168.0.25

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/info', methods=['GET'])
def info():
    return render_template('info.html')

@app.route('/initgame', methods=['GET'])
def initgame():
    return render_template('initgame.html')

@app.route('/game', methods=['GET'])
def game():
    return render_template('game.html', mqttip=hostip)

@app.route('/scores', methods=['GET'])
@app.route('/scores/<gamemode>', methods=['GET', 'POST'])
def scores(gamemode=None):
    gamemodex = gamemode if gamemode is not None else "twister-classic"

    if request.method == 'GET':
        try:
            r = requests.get(f'http://{hostip}:5000/scores/{gamemodex}')
            json_resp = r.json()
            return render_template('scores.html', gamemode=gamemodex, gamescores=json_resp)
        except Exception as e:
            print("main - scores error get: ", e)
            return render_template('scores.html')
        
    if request.method == 'POST':
        try:
            jsonscores = json.loads(request.data) 
            r = requests.post(f'http://{hostip}:5000/scores', json=jsonscores)
            return "succes"
            
        except Exception as e:
            print("main - scores error post: ", e)
            return "failed"

@app.route('/test', methods=['GET'])
def test():
    return render_template('test.html')


if __name__ == '__main__':
    app.run()