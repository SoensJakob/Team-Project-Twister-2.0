import paho.mqtt.client as mqtt
import logging

class MQTTConnection(object):
    """docstring for MQTTConnection."""
    def __init__(self, paradress):
        super(MQTTConnection, self).__init__()
        self.address = paradress
        self.client = mqtt.Client('P1')
        logging.basicConfig(filename='mqttLog.log', encoding='utf-8')

    def connect(self):
        """
        docstring
        """
        self.client.connect(self.address)
        logging.info("Client connect succesfull")
    
    def subscribe(self, topic):
        self.client.subscribe(topic)
    
    # def on_message(self, client, userdata, message):
    #     return str(message.payload.decode("utf-8"))

    def loop(self, status=True):
        if status == True:
            self.client.loop_start()
        elif status == False:
            self.client.loop_stop(True)
        else: 
            logging.error("Non binary input")
    
    def on_message(self, client, userdata, message):
        print("message received " ,str(message.payload.decode("utf-8")))

    def incoming_messages(self):
        message = self.client.on_message
        return message

            