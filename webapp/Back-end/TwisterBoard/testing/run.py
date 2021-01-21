from RPi import GPIO as io
from time import sleep
color_list = [4, 17,27,22,10,9,11,0, 5, 6, 13,19, 26,21,20,16,12,1 ,7, 8, 25,24,23,18]

io.setwarnings(False)
io.setmode(io.BCM)
for x in color_list:
    io.setup(x, io.IN, io.PUD_OFF)

for x in color_list:
    y = io.input(x)
    print(y, x)
    sleep(0.2)

def callback(channel):
    print(f"{channel} pressed")

for x in color_list:
    io.remove_event_detect(x)
    io.add_event_detect(x, io.FALLING, callback=callback, bouncetime=150)

while (1):
    pass