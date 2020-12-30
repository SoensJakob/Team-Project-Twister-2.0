from RPi import GPIO as io
from threading import Thread
import time

class TwisterBoard(object):
    """docstring for TwisterBoard."""
    def __init__(self, arg):
        super(TwisterBoard, self).__init__()
        self.listInputs = [2]
    
    def setup(self):
        io.setmode(io.BCM)
        for x in self.listInputs:
            io.setup(x, io.IN, pull_up_down=io.PUD_DOWN)

    # Callbacks

    def buttonUnPressed(self, channel):
        io.remove_event_detect(channel)
        print("button Released")

    def buttonPressed(self, channel):
        print("button pressed")
        io.add_event_detect(x, io.FALLING, callback=self.buttonUnPressed)


    # Eventlisteners

    def removeOneListener(self, button):
        io.remove_event_detect(button)

    def removeAllListeners(self):
        for x in self.listInputs:
            self.removeOneListener(x)

    def createOneListener(self, button):
        io.add_event_detect(button, io.RISING, callback=self.buttonPressed)

    def createAllListeners(self):
        for x in self.listInputs:
            self.createOneListener(x)
