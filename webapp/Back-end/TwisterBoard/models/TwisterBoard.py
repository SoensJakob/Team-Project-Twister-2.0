from RPi import GPIO as io

class TwisterBoard(object):
    """docstring for TwisterBoard."""
    def __init__(self):
        super(TwisterBoard, self).__init__()
        self._listInputs = [4,17,27,22,10,9,11,0,5,6,13,19,26,21,20,16,12,1,7,8,25,24,23,18,15,14]
        self.pressed_buttons = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]]
        self._color_list = [
            [4, 17,27,22,10,9 ], 
            [11,0, 5, 6, 13,19], 
            [26,21,20,16,12,1 ], 
            [7, 8, 25,24,23,18]]

    def setup(self):
        io.setwarnings(False)
        io.setmode(io.BCM)
        for x in self._listInputs:
            io.setup(x, io.IN, pull_up_down=io.PUD_DOWN)

    def cleanup(self):
        io.cleanup()

    # Callbacks

    def buttonUnPressed(self, channel):
        print("Button released")
        self.removeOneListener(channel)
        for x in range(len(self._color_list)):
            if channel in self._color_list[x]:
                    pin_nr = self._color_list[x].index(channel)
                    place_list = self.pressed_buttons[x]
                    place_list[pin_nr] = 0
                    self.pressed_buttons[x] = place_list

    def buttonAction(self, channel):
        print(channel)
        io_input = io.input(channel)
        if (io_input):
            self.buttonPressed(channel)
        else: 
            self.buttonUnPressed(channel)

    def buttonPressed(self,button):
        limb = self.limb
        print("Button pressed")
        for x in range(len(self._color_list)):
            if button in self._color_list[x]:
                pin_list = self._color_list[x]
                for y in range(len(pin_list)):
                    if pin_list[y] != button:                        
                        self.removeOneListener(pin_list[y])
                    else:
                        place_list = self.pressed_buttons[x]
                        place_list[pin_list.index(button)] = limb
                        self.pressed_buttons[x] = place_list
                        print(self.pressed_buttons)
                        io.remove_event_detect(button)
                        io.add_event_detect(button, io.FALLING, callback=self.buttonUnPressed, bouncetime=200)
                print("Events removed")


    # Eventlisteners

    def removeOneListener(self, button):
        io.remove_event_detect(button)

    def removeAllListeners(self):
        for x in self._listInputs:
            self.removeOneListener(x)

    def createOneListener(self, button, limb):  
        self.limb = limb
        try:
            io.add_event_detect(button, io.RISING, callback=self.buttonPressed, bouncetime=200)
        except Exception as e:
            pass

    def createAllListeners(self):
        print("Creating listeners")
        for x in self._listInputs:
            self.createOneListener(0, x)
        print("Created listeners")