from PIL import Image, ImageDraw
import glob

f = 'img/serveq/p11-img69.png'
img = Image.open(f).convert('RGB')
ImageDraw.floodfill(img, (0,0), (255,255,255), thresh=10)
ImageDraw.floodfill(img, (img.width-1, 0), (255,255,255), thresh=10)
ImageDraw.floodfill(img, (0, img.height-1), (255,255,255), thresh=10)
ImageDraw.floodfill(img, (img.width-1, img.height-1), (255,255,255), thresh=10)
img.save('img/serveq/test_out.png')
print("Test completed.")
