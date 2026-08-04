from PIL import Image

def main():
    img = Image.open('favicon.png')
    
    # Check if the image has an alpha channel
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        alpha = img.convert('RGBA').split()[-1]
        bbox = alpha.getbbox()
        
        if bbox:
            cropped = img.crop(bbox)
            cropped.save('favicon.png')
            cropped.save('favicon.ico')
            print("Cropped successfully. New size:", cropped.size)
        else:
            print("Could not find bounding box.")
    else:
        print("Image doesn't have an alpha channel or is not transparent.")

if __name__ == "__main__":
    main()
