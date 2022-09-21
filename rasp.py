import requests
from picamera import PiCamera
import RPi.GPIO as GPIO

sensor = 16

GPIO.setmode(GPIO.BOARD)
GPIO.setup(sensor, GPIO.IN)

camera = PiCamera()

try:
   while True:
      if GPIO.input(sensor):
        camera.capture('/images/test.jpg')
        url = 'http://localhost:3000/upload'
        files = {'imageFile': open('./test.jpg', 'rb')}
        requests.post(url, files=files)
except KeyboardInterrupt:
    GPIO.cleanup()



