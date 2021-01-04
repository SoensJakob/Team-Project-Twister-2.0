# Normal imports
from threading import Thread
import time
import paho.mqtt.client as mqtt
import json


# Custom imports
from models.TwisterBoard import TwisterBoard

# MQTT 
def connect():
    global client
    try:
        address = '127.0.0.1'
        client.connect(address, 1883)
        print("Connected")
    except:
        print("Not possible")

def on_message(client, userdata, msg):
    message = json.loads(str(msg.payload.decode("utf-8")))
    limb = message["limb"]
    color = message["color"]
    try:
        place = message["place"]
    except Exception as e:
        place = None
    print(limb, color[1], place)
    if place == None:
        no_place(color, limb )
    else:
        w_place(color, place, limb)


def w_place(color, place, limb="1"):
    row_list = twister._color_list[int(color[1])]
    place = row_list[int(place)]
    twister.createOneListener(color[1], limb)
    print_color(color[0])

    

def no_place(color, limb=1):
    for x in twister._color_list[int(color[1])]:
        twister.createOneListener(x ,limb)
    print_color(color[0])


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
    twister = TwisterBoard()
    twister.setup()    
    twister.removeAllListeners()

    client = mqtt.Client()
    client.on_message = on_message
    connect()
    client.subscribe('/mat/01/#')
    client.loop_forever()
except KeyboardInterrupt as e:
    twister.cleanup()
    client.disconnect()
    print("Closing program")