import pyttsx3

""" RATE"""
engine = pyttsx3.init()
engine.setProperty('volume', 0.9)
engine.say(f"Hoiu plaats je Hoi op Hoi")
engine.runAndWait()