from PIL import Image, ImageFilter, ImageDraw
import numpy as np

src = r'C:\Users\Admin\.gemini\antigravity\brain\7c5a5605-2aa7-4c66-812a-c814cc5c12d0\.user_uploaded\media_1795514068169_22545582.jpg'
img = Image.open(src).convert('RGB')
w, h = img.size

canvas = np.array(img, dtype=np.float32)

# Generate smooth 2D ambient gradient in the central zone (x: 200 to 820)
for y in range(h):
    v = y / float(h - 1)
    for x in range(195, 825):
        u = (x - 195) / float(825 - 195)
        
        # 2D bilinear interpolation of ambient light
        top_color = np.array([11, 26, 17], dtype=np.float32) * (1.0 - u) + np.array([145, 108, 62], dtype=np.float32) * u
        bottom_color = np.array([7, 18, 12], dtype=np.float32) * (1.0 - u) + np.array([16, 28, 20], dtype=np.float32) * u
        
        if y < 58:
            bg_tone = top_color * (1.0 - y/58.0) + np.array([12, 28, 19], dtype=np.float32) * (y/58.0)
        else:
            depth_factor = (y - 58) / float(h - 58)
            bg_tone = np.array([12, 28, 19], dtype=np.float32) * (1.0 - depth_factor*0.35) + np.array([16, 25, 20], dtype=np.float32) * (u * 0.25)
            
        canvas[y, x] = bg_tone

smooth_canvas = Image.fromarray(np.clip(canvas, 0, 255).astype(np.uint8))

# Mask that covers from x=212 to x=808 with 100% opacity, and feathers softly outside (radius=6)
mask = Image.new('L', (w, h), 0)
m_draw = ImageDraw.Draw(mask)
# Top pill zone (x: 230 to 895, y: 0 to 52)
m_draw.rectangle([230, 0, 895, 52], fill=255)
# Center zone: extends from 208 to 808 to completely cover all cards and text
m_draw.rectangle([208, 0, 808, h], fill=255)
# Soft feather of 6 pixels
mask = mask.filter(ImageFilter.GaussianBlur(radius=6))

final_composite = Image.composite(smooth_canvas, img, mask)

# Upscale to 1920x906 with LANCZOS
new_w = 1920
new_h = int(h * (new_w / w))
upscaled = final_composite.resize((new_w, new_h), Image.Resampling.LANCZOS)
crisp = upscaled.filter(ImageFilter.UnsharpMask(radius=1.2, percent=100, threshold=2))

out_jpg = r'd:\documents\localexim\local-exim\public\hero\why-choose-us-bg.jpg'
out_webp = r'd:\documents\localexim\local-exim\public\hero\why-choose-us-bg.webp'

crisp.save(out_jpg, 'JPEG', quality=92, optimize=True)
crisp.save(out_webp, 'WEBP', quality=90)
print('Precision clean background generated with zero bleed.')
