# import pyttsx3
# import vlc
# import os
# from time import sleep
# """ RATE"""
# def create_sound(user, limb, row, column):
#     engine = pyttsx3.init()
#     color = 'green'
#     text = f"{user} {limb} {color}"
#     dirname = os.path.dirname(__file__)
#     filename = os.path.join(dirname, './saying.mp3')
#     engine.save_to_file(text, filename)
#     engine.runAndWait()
#     play_sound(filename)

# def change_volume(volume):
#     engine.setProperty('volume',volume)

# def play_sound(filename):
#     p = vlc.MediaPlayer(filename)
#     p.play()
#     sleep(10)

# engine = pyttsx3.init()
# engine.setProperty('rate',90)
# create_sound('Lucas', "richt arm", 1, 2)
from subprocess import call

call(["espeak","-a 150", "-s140 -ven+18 -z",f"Rechter arm, Herber, gel"])   