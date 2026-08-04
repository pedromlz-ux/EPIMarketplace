from PIL import Image

def main():
    img = Image.open('favicon.png')
    width, height = img.size
    
    # Crop a square from the left (height x height)
    # Assuming the logo mark is on the left
    if width > height:
        size = height
        # Try to find the actual bounding box of the logo on the left
        # Let's just crop a square of size `height` x `height` from the left edge
        # Wait, if there is transparent padding on the left, it might cut off.
        # Let's crop from the left to `height`.
        cropped = img.crop((0, 0, height, height))
        cropped.save('favicon.png')
        cropped.save('favicon.ico')
        print("Cropped to square. New size:", cropped.size)
    else:
        print("Image is already square or taller than wide.")

if __name__ == "__main__":
    main()
