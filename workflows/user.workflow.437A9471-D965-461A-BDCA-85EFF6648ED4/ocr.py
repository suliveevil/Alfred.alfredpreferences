from PIL import Image
import pytesseract as pyt
import sys
image = Image.open('screenshot.png')
word = pyt.image_to_string(image)
sys.stdout.write(word)
