from RPi import GPIO as io
from threading import Thread
import time

class TwisterBoard(object):
    """docstring for TwisterBoard."""
    def __init__(self, arg):
        super(TwisterBoard, self).__init__()
        self.arg = arg
    
    def 