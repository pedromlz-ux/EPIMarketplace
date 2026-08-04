import fitz # PyMuPDF
import os

pdf_path = "/Users/pm/.gemini/antigravity-ide/brain/0e302c13-9402-4eed-ab90-2a090bf2c785/media__1785849469213.pdf"
doc = fitz.open(pdf_path)

os.makedirs("img/serveq", exist_ok=True)

count = 0
for i in range(len(doc)):
    for img in doc.get_page_images(i):
        xref = img[0]
        pix = fitz.Pixmap(doc, xref)
        
        # Only save images larger than 100x100 to filter out icons/logos
        if pix.width > 100 and pix.height > 100:
            if pix.n - pix.alpha < 4:       # this is GRAY or RGB
                pix.save(f"img/serveq/p{i}-img{count}.png")
            else:               # CMYK: convert to RGB first
                pix1 = fitz.Pixmap(fitz.csRGB, pix)
                pix1.save(f"img/serveq/p{i}-img{count}.png")
                pix1 = None
            count += 1
        pix = None

print(f"Extracted {count} images")
