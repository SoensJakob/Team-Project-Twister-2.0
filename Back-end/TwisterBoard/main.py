from RPi import GPIO as io
from threading import Thread
import time

class TwisterBoard(object):
    """docstring for TwisterBoard."""
    def __init__(self):
        super(TwisterBoard, self).__init__()
        self.listInputs = [16]
    
    def setup(self):
        io.setwarnings(False)
        io.setmode(io.BCM)
        for x in self.listInputs:
            io.setup(x, io.IN, pull_up_down=io.PUD_DOWN)

    def cleanup(self):
        io.cleanup()

    # Callbacks

    def buttonUnPressed(self, channel):
        print("Button released")

    def buttonAction(self, channel):
        if (io.input(channel)):
            self.buttonPressed(channel)
        else: 
            self.buttonUnPressed(channel)

    def buttonPressed(self, channel):
        print("Button pressed")


    # Eventlisteners

    def removeOneListener(self, button):
        io.remove_event_detect(button)

    def removeAllListeners(self):
        for x in self.listInputs:
            self.removeOneListener(x)

    def createOneListener(self, button):
        io.add_event_detect(button, io.BOTH, callback=self.buttonAction, bouncetime=200)

    def createAllListeners(self):
        print("Creating listeners")
        for x in self.listInputs:
            self.createOneListener(x)
        print("Created listeners")



if __name__ == "__main__":
    twister = TwisterBoard()
    twister.setup()
    twister.createAllListeners()
    try:
        while (1):
            pass
    except KeyboardInterrupt:
        twister.removeAllListeners()
        twister.cleanup()