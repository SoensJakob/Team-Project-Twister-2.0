# Normal imports
from threading import Thread
import time
import paho.mqtt.client as mqtt
import json
#from concurrent.futures import ThreadPoolExecutor
#from RPi import GPIO as io



# Custom imports
from models.TwisterBoard import TwisterBoard
from models.test_threadpool import myThread
# MQTT 
def connect():
    global client
    try:
        address = '127.0.0.1'
        client.connect(address, 1883, )
        print("Connected")
    except:
        print("Not possible")

def setup():
    io.setwarnings(False)
    io.setmode(io.BCM)
    for x in twister._listInputs:
        io.setup(x, io.IN, pull_up_down=io.PUD_UP)

def cleanup():
    io.cleanup()

def on_message(client, userdata, msg):
    message = json.loads(str(msg.payload.decode("utf-8")))
    for x in message:
        row = str(x["row"])
        colum = str(x["colum"])
        color = str(x["color"])
        print(color, place)
            

def w_place(color, place, limb="1"):
    row_list = twister._color_list[int(color[1])]
    place = row_list[int(place)]
    twister.createOneListener(color[1], limb)
    print_color(color[0])

list_results = []

def no_place(color, limb=1):
    print_color(color[0])
    for x in twister._color_list[int(color[1])]:
        t = myThread(1, f"listen_{x}", x, twister, io, limb)
        list_results.append(t.start())


def print_color(color):
    if color == "G":
        print("Color Green")
            
    elif color == "R":
        print("Color Red")
        
    elif color == "B":
        print("Color Blue")

    elif color == "Y":
        print("Color Yellow")
    else:
        pass


# Main
try:
    twister = TwisterBoard(io)
    setup()    
    twister.removeAllListeners()

    client = mqtt.Client()
    client.on_message = on_message
    connect()
    client.subscribe('/mat/01/#', 2)
    client.loop_forever()
except KeyboardInterrupt as e:
    cleanup()
    client.disconnect()
    print("Closing program")