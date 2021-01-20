# Normal imports
from threading import Thread
import time
import paho.mqtt.client as mqtt
import json
import pyttsx3
import webcolors
#from concurrent.futures import ThreadPoolExecutor
from RPi import GPIO as io



# Custom imports
from models.TwisterBoard import TwisterBoard
from models.test_threadpool import myThread

def setup():
    io.setwarnings(False)
    io.setmode(io.BCM)
    for x in twister._listInputs:
        io.setup(x, io.IN, pull_up_down=io.PUD_UP)
# MQTT 
def connect():
    global client
    try:
        address = '127.0.0.1'
        client.connect(address, 9001)
        print("Connected")
    except:
        print("Not possible")

def cleanup():
    io.cleanup()

def on_message(client, userdata, msg):
    messages = json.loads(str(msg.payload.decode("utf-8")))
    for message in messages:
        try:
            limb = message["limb"]
            row = message["row"]
            user = message["user"]
            color = message["color"]
            column = message["column"]

            create_sound(user, limb, row, column)
            create_listeners(user, limb, row, column)
            if color != None:
                create_color(color)            
        except Exception as e:
            pass

def create_color(color):
    print(color)

def create_listeners(user, limb, row, column):
    if row == 0 and column == 0:
        for i in twister.color_list:
            for u in i:
                twister.createOneListener(u)

def create_sound(user, limb, row, column):
    color = row_to_color(row)
    engine = pyttsx3.init()
    engine.say(f"speler {user} plaats je {limb} op {color}")
    engine.runAndWait()

def row_to_color(row):
    if row == "1":
        color = "groen"
        print("Groen")
            
    elif row == "2":
        color = "rood"
        print("Rood")
        
    elif row == "3":
        color = "blauw"
        print("Blauw")

    elif row == "4":
        color = "geel"
        print("Geel")
    else:
        return None
    return color


# Main
try:
    twister = TwisterBoard(io)
    setup()    
    twister.removeAllListeners()

    client = mqtt.Client()
    client.on_message = on_message
    connect()
    client.subscribe('/mat/01/#')
    client.loop_forever()
except KeyboardInterrupt as e:
    cleanup()
    client.disconnect()
    print("Closing program")