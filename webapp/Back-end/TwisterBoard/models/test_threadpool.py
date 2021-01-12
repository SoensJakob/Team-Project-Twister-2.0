import threading
import time

exitFlag = 0

class myThread (threading.Thread):
    def __init__(self, threadID, name, button, twister_board,io, limb):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.button = button
        self.twister = twister_board
        self.limb = limb
        self.io = io

    def run(self):
        print(f"Starting thread: {self.button}")
        try:
            channel = self.io.wait_for_edge(self.button, self.io.RISING, timeout=5000)
            if channel == None:
                #print("NOK")
                status = "Not pressed in time"
            else:
                self.buttonPressed(self.button)
                #print("OK")
                status = "OK"
            
        except Exception as e:
            #logging.warning(e)
            print(e)
            status = e
        print(status, self.button)
        #return [status, self.button]
        
    def buttonPressed(self,button):
        print("Button pressed")
        for x in range(len(self.twister._color_list)):
            if button in self.twister._color_list[x]:
                pin_list = self.twister._color_list[x]
                for y in range(len(pin_list)):
                    if pin_list[y] == button:                        
                        place_list = self.twister.pressed_buttons[x]
                        place_list[pin_list.index(button)] = self.limb
                        self.twister.pressed_buttons[x] = place_list
                        print(self.twister.pressed_buttons)
                print("Events removed")

# Create new threads
#thread1 = myThread(1, "Button-1", 8)

# Start new Threads
#thread1.start()
