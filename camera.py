import requests
import cv2


# # video capture source camera (Here webcam of laptop)
# cap = cv2.VideoCapture(0)
# ret, frame = cap.read()  # return a single frame in variable `frame`

# # while(True):
# # cv2.imshow('img1',frame) #display the captured image
# # if cv2.waitKey(1) & 0xFF == ord('y'): #save on pressing 'y'
# cv2.imwrite('c.png', frame)
# # cv2.destroyAllWindows()
# url = 'http://localhost:3000/upload'
# files = {'imageFile': open('c.png', 'rb')}
# requests.post(url, files=files)
# # break
# cap.release()

import imageio as iio
# import matplotlib.pyplot as plt

camera = iio.get_reader("<video0>")
screenshot = camera.get_data(0)
camera.close()

cv2.imwrite('c.png', screenshot)

url = 'http://localhost:3000/upload'
files = {'imageFile': open('c.png', 'rb')}
requests.post(url, files=files)
# plt.imshow(screenshot)
# plt.show()
