import qrcode
import tkinter as tk
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import subprocess
from time import sleep
from PIL import Image

img = qrcode.make('Hoi')

im = Image.open("test.png")
im.show()
sleep(5)