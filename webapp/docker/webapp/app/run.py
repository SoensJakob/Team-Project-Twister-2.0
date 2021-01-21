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
    return render_template('game.html')

@app.route('/scores')
@app.route('/scores/<gamemode>')
def scores(gamemode=None):
    if request.method == 'GET':
        try:
            
            gamemodex = gamemode if gamemode is not None else "twister-classic"
            r = requests.get(f'http://192.168.0.173:5000/scores/{gamemodex}')
            json_resp = r.json()
            return render_template('scores.html', gamescores=json_resp)
        except Exception as e:
            print("main - scores error get: ", e)
            return render_template('scores.html')
        
    if request.method == 'POST':
        try:
            return render_template('scores.html')
            
        except Exception as e:
            return  "main - scores error post: ", e


if __name__ == '__main__':
    app.run()