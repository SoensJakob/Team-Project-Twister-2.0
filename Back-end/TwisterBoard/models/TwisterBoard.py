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
            [4,17,27,22,10,9], 
            [11,0,5,6,13,19], 
            [26,21,20,16,12,1], 
            [7,8,25,24,23,18]]

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
                    pin_list = self._color_list[x]
                    for y in range(len(pin_list)):
                        if pin_list[y] == channel: 
                            place_list = self.pressed_buttons[x]
                            place_list[pin_list.index(channel)] = 0
                            self.pressed_buttons[x] = place_list

    def buttonAction(self, channel):
        io_input = io.input(channel)
        print(io_input)
        if (io_input):
            self.buttonPressed(channel, self.limb)
        else: 
            self.buttonUnPressed(channel)

    def buttonPressed(self, channel, limb):
        print("Button pressed")
        print(limb)
        for x in range(len(self._color_list)):
            if channel in self._color_list[x]:
                pin_list = self._color_list[x]
                for y in range(len(pin_list)):
                    if pin_list[y] != channel:                        
                        self.removeOneListener(pin_list[y])
                    else:
                        place_list = self.pressed_buttons[x]
                        place_list[pin_list.index(channel)] = limb
                        self.pressed_buttons[x] = place_list
                print("Events removed")


    # Eventlisteners

    def removeOneListener(self, button):
        io.remove_event_detect(button)

    def removeAllListeners(self):
        for x in self._listInputs:
            self.removeOneListener(x)

    def createOneListener(self, button, limb):
        self.limb = limb
        io.add_event_detect(button, io.BOTH, callback=self.buttonAction, bouncetime=100)

    def createAllListeners(self):
        print("Creating listeners")
        for x in self._listInputs:
            self.createOneListener(x, 0)
        print("Created listeners")