import time
import json
import socket
import requests
import threading
from random import randint
from flask import Flask, jsonify, request, render_template
from flask import url_for, render_template, request, redirect, session, g

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/game')
def game():
    return render_template('game.html')


if __name__ == '__main__':
    app.run()