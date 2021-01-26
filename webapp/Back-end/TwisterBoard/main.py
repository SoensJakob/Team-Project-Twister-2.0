# Normal imports
from threading import Thread
from time import sleep
import paho.mqtt.client as mqtt
from subprocess import call
import json
import pyttsx3
import os
import vlc
import webcolors
#from concurrent.futures import ThreadPoolExecutor
from RPi import GPIO as io



# Custom imports
from models.TwisterBoard import TwisterBoard
from models.test_threadpool import myThread

interval = 0.100
buttons = [[4, 17,27,22,10,9 ], [11,0, 5, 6, 13,19], [26,21,20,16,12,1 ], [7, 8, 25,24,23,18]]
checkable_buttons = []
global volume
volume = 100

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
    message = json.loads(str(msg.payload.decode("utf-8")))
    if str(msg.topic.decode("utf-8")) == '/twisterboard':
        try:
            limb = message["limb"]
            row = message["row"]
            user = message["user"]
            color = message["color"]
            column = message["column"]

            create_sound(user, limb, row, column)
            button = get_button(row, column)
            checkable_buttons.append(button)
            if color != None:
                create_color(color)            
        except Exception as e:
            pass
    elif msg.topic == '/twisterspeaker':
        volume = message["volume"]

def get_button(row, column):
    list_row = buttons[row]
    button = list_row[column]
    return button

def get_row_column(button):
    for x in range(len(buttons)):
        b_list = buttons[x]
        try: 
            index = b_list.index(button)
            return [x, index]
        except:
            pass

def create_color(color):
    print(color)

def listen_to_color(row):
    i = True
    while(i):
        sleep(interval/4)
        for x in buttons[row]:
            y = io.input(x)
            if y == 0 and x not in check_buttons:
                checkable_buttons.append(x)
                i = False

def check_buttons():
    while(True):
        sleep(interval)
        for x in checkable_buttons:
            y = io.input(x)
            if y == 1:
                checkable_buttons.remove(y)
                places = get_row_column(y)
                msg = json.dumps({'buttonreleased':[{"row":int(places[0]), "column":int(places[1])}]})
                client.publish('/twisterboard', msg, 2)
    


def create_sound(user, limb, row, column):
    color = row_to_color(row)
    call(["espeak","-a 30", "-s140 -ven+18 -z",f"{limb}, {user}, {color}"])   

def row_to_color(row):
    if row == "1":
        color = "groen"
        print("Groen")
            
    elif row == "2":
        color = "rod"
        print("Rood")
        
    elif row == "3":
        color = "blauw"
        print("Blauw")

    elif row == "4":
        color = "gel"
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
    client.subscribe('/twisterboard')
    client.subscribe('/twisterspeaker')
    client.loop_forever()

    x = Thread(target=check_buttons)
    x.start()
except KeyboardInterrupt as e:
    cleanup()
    client.disconnect()
    print("Closing program")