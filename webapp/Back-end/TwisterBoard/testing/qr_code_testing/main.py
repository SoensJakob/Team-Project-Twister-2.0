import qrcode
import subprocess
from time import sleep
from PIL import Image

img = qrcode.make(192.168.4.1)
img.save('./code_qr.png')

im = Image.open("code_qr.jpg")
im.show()
sleep(5)