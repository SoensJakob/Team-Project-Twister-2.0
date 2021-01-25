# Normal imports
from threading import Thread
from time import sleep
import paho.mqtt.client as mqtt
import json
import pyttsx3
import webcolors
#from concurrent.futures import ThreadPoolExecutor
from RPi import GPIO as io



# Custom imports
from models.TwisterBoard import TwisterBoard
from models.test_threadpool import myThread

interval = 0.200
buttons = [[4, 17,27,22,10,9 ], [11,0, 5, 6, 13,19], [26,21,20,16,12,1 ], [7, 8, 25,24,23,18]]
checkable_buttons = []

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
    if msg.topic == '/twisterboard':
        try:
            limb = message["limb"]
            row = message["row"]
            user = message["user"]
            color = message["color"]
            column = message["column"]

            create_sound(user, limb, row, column)
            button = add_button(row, column)
            checkable_buttons.append(button)
            if color != None:
                create_color(color)            
        except Exception as e:
            pass
    elif msg.topic == '/twisterspeaker':
        volume = message["volume"]
        change_volume(volume)

def get_button(row, column):
    list_row = buttons[row]
    button = list_row[column]

def get_row_column(button):
    for x in range(len(buttons)):
        b_list = buttons[x]
        try: 
            index = b_list.index("button")
            return [x, index]
        except:
            pass

def create_color(color):
    print(color)

def check_buttons():
    while(True):
        sleep(interval)
        for x in checkable_buttons:
            y = io.input()
            if y == 1:
                checkable_buttons.remove(y)
                places = get_row_column(y)
                msg = json.dumps({'buttonreleased':[{"row":int(places[0]), "column":int(places[1])}]})
                client.publish('/twisterboard', msg, 2)
    


def create_sound(user, limb, row, column):
    color = row_to_color(row)
    engine = pyttsx3.init()
    text = f"speler {user} plaats je {limb} op {color}"
    engine.save_to_file(text, "./python.mp3")
    engine.runAndWait()

def change_volume(volume):
    engine.setProperty('volume',volume)

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
    client.subscribe('/twisterboard')
    client.subscribe('/twisterspeaker')
    engine = pyttsx3.init()


    client.loop_forever()

    x = Thread(target=check_buttons)
    x.start()
except KeyboardInterrupt as e:
    cleanup()
    client.disconnect()
    print("Closing program")