from threading import Thread
import time
from models.TwisterBoard import TwisterBoard
from models.MQTTConnection import MQTTConnection


twister = TwisterBoard()
twister.setup()

try:
    mqtt = MQTTConnection("192.168.123.181")
    mqtt.connect()
except:
    mqtt = MQTTConnection("127.0.0.1")
    mqtt.connect()
else:
    exit()
    
twister.createAllListeners()
mqtt.subscribe('/mat/01/g1')
mqtt.loop()
message = mqtt.incoming_messages()
if message != None:
    print(str(message.payload.decode("utf-8")))

try:
    while (1):
        pass
except KeyboardInterrupt:
    twister.removeAllListeners()
    twister.cleanup()