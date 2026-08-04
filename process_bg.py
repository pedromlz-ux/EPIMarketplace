import glob
from PIL import Image, ImageDraw

def replace_background(img_path):
    try:
        img = Image.open(img_path).convert('RGB')
        # We flood fill from all 4 corners with white
        white = (255, 255, 255)
        # Use a tolerance (thresh) of 30 to catch near-black colors
        ImageDraw.floodfill(img, (0, 0), white, thresh=30)
        ImageDraw.floodfill(img, (img.width-1, 0), white, thresh=30)
        ImageDraw.floodfill(img, (0, img.height-1), white, thresh=30)
        ImageDraw.floodfill(img, (img.width-1, img.height-1), white, thresh=30)
        
        # Save it back
        img.save(img_path)
    except Exception as e:
        print(f"Error processing {img_path}: {e}")

images = glob.glob('img/serveq/p*.png')
print(f"Found {len(images)} images to process...")
for i, img_path in enumerate(images):
    replace_background(img_path)
print("Finished replacing backgrounds.")
