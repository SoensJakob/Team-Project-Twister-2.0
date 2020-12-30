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
        address = '192.068.123.181'
        client.connect(address)
    except:
        address = '127.0.0.1'
        client.connect(address)
    else:
        print('Not possible to connect')

def on_message(client, userdata, msg):
    message = json.loads(str(msg.payload.decode("utf-8")))
    print(message["color"])
    if int(message["color"]) == 0:
        print("Color Red")
        for x in twister._color_list[0]:
            twister.createOneListener(x)
    elif int(message["color"]) == 1:
        print("Color Blue")
        for x in twister._color_list[1]:
            twister.createOneListener(x)
    elif int(message["color"]) == 2:
        print("Color Green")
        for x in twister._color_list[2]:
            twister.createOneListener(x)
    elif int(message["color"]) == 3:
        print("Color Yellow")
        for x in twister._color_list[3]:
            twister.createOneListener(x)
    else:
        pass




# Main

twister = TwisterBoard()
twister.setup()    
twister.removeAllListeners()

client = mqtt.Client()
client.on_message = on_message
connect()
client.subscribe('/mat/01/#')
client.loop_forever()






