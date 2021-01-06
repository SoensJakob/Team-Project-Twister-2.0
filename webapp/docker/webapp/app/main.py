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

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        username = request.form['username']
        password = request.form['password']

        #moet nog worden aangepast
        data = True

        try:
            if data is not None:
                session['logged_in'] = True
                return redirect(url_for('home'))
            else:
                return render_template('index.html', data={'username': username, 'password': password})

        except Exception as e:
            return "main - login error: ", e

@app.route('/registration', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            #nog aanpassen
            data = True
            if data:
                return render_template('register.html', error='A user with this username already exits!')

            
        except Exception as e:
            return  "main - register error: ", e

        return render_template('login.html')
    return render_template('register.html')

@app.route('/game', methods=['GET'])
def game():
    return render_template('game.html')

@app.route('/scores', methods=['GET', 'POST'])
def scores():
    content = request.get_json()
    print(content)
    if request.method == 'POST':
        try:
            return render_template('scores.html', users=content)
            
        except Exception as e:
            return  "main - scores error: ", e

    return render_template('register.html')


if __name__ == '__main__':
    app.run()