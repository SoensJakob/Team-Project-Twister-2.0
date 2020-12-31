import time
import socket
import requests
import threading
from random import randint
from flask_socketio import SocketIO
from flask import Flask, render_template
from flask import url_for, render_template, request, redirect, session, g

app = Flask(__name__)
app.config['SECRET_KEY'] = 'lol'
socketio = SocketIO(app)

@app.route('/')
def home():
    if not session.get('logged_in'):
        return render_template('index.html')
    else:
        return render_template('index.html')

@app.route('/game')
def game():
    return render_template('game.html')


if __name__ == '__main__':
    socketio.run(app)