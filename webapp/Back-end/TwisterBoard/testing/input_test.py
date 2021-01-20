from RPi import GPIO as io

inputs = [
            [4, 17,27,22,10,9 ], 
            [11,0, 5, 6, 13,19], 
            [26,21,20,16,12,1 ], 
            [7, 8, 25,24,23,18]]

io.setwarnings(False)
io.setmode(io.BCM)
for x in twister._listInputs:
    io.setup(x, io.IN, pull_up_down=io.PUD_UP)

