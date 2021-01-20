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

@app.route('/scores', methods=['GET', 'POST'])
def scores():
    content = request.get_json()
    print(content)
    if request.method == 'POST':
        try:
            return render_template('scores.html')
            
        except Exception as e:
            return  "main - scores error: ", e

    return render_template('scores.html')


if __name__ == '__main__':
    app.run()