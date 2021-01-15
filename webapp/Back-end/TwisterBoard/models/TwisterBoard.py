 from threading import Thread


class TwisterBoard(object):
    """docstring for TwisterBoard."""
    def __init__(self, io):
        super(TwisterBoard, self).__init__()
        self._listInputs = [4,17,27,22,10,9,11,0,5,6,13,19,26,21,20,16,12,1,7,8,25,24,23,18,15,14]
        self.io = io
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



    # Callbacks

    def checkPressed(self, button):
        channel = io.wait_for_edge(button, io.FALLING)
        if channel != None:
            for x in range(len(self._color_list)):
                if channel in self._color_list[x]:
                    pin_nr = self._color_list[x].index(channel)
                    place_list = self.pressed_buttons[x]
                    place_list[pin_nr] = 0
                    self.pressed_buttons[x] = place_list
            return ["Released", button]        

    def buttonAction(self, channel):
        print(channel)
        self.io_input = self.io.input(channel)
        if (self.io_input):
            self.buttonPressed(channel)
        else: 
            self.buttonUnPressed(channel)

    def buttonPressed(self,button):
        limb = self.limb
        print(limb)
        print("Button pressed")
        for x in range(len(self._color_list)):
            if button in self._color_list[x]:
                pin_list = self._color_list[x]
                for y in range(len(pin_list)):
                    if pin_list[y] == button:                        
                        place_list = self.pressed_buttons[x]
                        place_list[pin_list.index(button)] = limb
                        self.pressed_buttons[x] = place_list
                        print(self.pressed_buttons)
                        #self.removeOneListener(button)
                        #self.io.add_event_detect(button, self.io.FALLING, callback=self.buttonUnPressed, bouncetime=200)
                print("Events removed")


    # Eventlisteners

    def removeOneListener(self, button):
        self.io.remove_event_detect(button)

    def removeAllListeners(self):
        for x in self._listInputs:
            self.removeOneListener(x)

    def createOneListener(self, button, limb):  
        self.limb = limb
        try:
            channel = self.io.wait_for_edge(button, self.io.RISING, timeout=10000)
            if channel == None:
                #print("NOK")
                status = "Not pressed in time"
            else:
                self.buttonPressed(button)
                #print("OK")
                status = "OK"
            
        except Exception as e:
            #logging.warning(e)
            print(e)
            status = e
        #print(status, button)
        return [status, button]
            

    def createAllListeners(self):
        print("Creating listeners")
        for x in self._listInputs:
            self.createOneListener(0, x)
        print("Created listeners")