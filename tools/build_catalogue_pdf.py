#!/usr/bin/env python3
"""
Builds public/downloads/Local-Exim-Catalogue.pdf from src/data/catalogue.json.

Usage (from the project root):
    pip install reportlab pillow qrcode[pil]
    python tools/build_catalogue_pdf.py

Re-run it whenever catalogue.json or the product images change, then redeploy.
Contact details are read from src/siteConfig.js, so edit them there.
"""
import io, json, re, sys, os
from datetime import date
from urllib.parse import quote
from PIL import Image
import qrcode
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader, simpleSplit
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = sys.argv[1] if len(sys.argv) > 1 else "."
P = lambda *a: os.path.join(ROOT, *a)

# ---------- brand ----------
FOREST, GREEN, GOLD, CREAM = HexColor("#0B2415"), HexColor("#14532D"), HexColor("#D4AF37"), HexColor("#FAF8F3")
INK, MUTED, LINE = HexColor("#1A1A1A"), HexColor("#6B6B6B"), HexColor("#E6DFC8")

def find_font(names):
    for base in ("/usr/share/fonts/truetype/dejavu/", "C:/Windows/Fonts/", "/Library/Fonts/", "/System/Library/Fonts/Supplemental/"):
        for n in names:
            if os.path.exists(base + n):
                return base + n
    return None
sans, sans_b = find_font(["DejaVuSans.ttf"]), find_font(["DejaVuSans-Bold.ttf"])
serif_b = find_font(["DejaVuSerif-Bold.ttf"])
if not (sans and sans_b and serif_b):
    sys.exit("DejaVu fonts not found (needed for the rupee sign). Install DejaVu or edit find_font().")
pdfmetrics.registerFont(TTFont("Sans", sans)); pdfmetrics.registerFont(TTFont("SansB", sans_b)); pdfmetrics.registerFont(TTFont("SerifB", serif_b))

# ---------- config from siteConfig.js ----------
cfg_src = open(P("src", "siteConfig.js"), encoding="utf-8").read()
def cfg(key, default=""):
    m = re.search(key + r'\s*:\s*"([^"]*)"', cfg_src)
    return m.group(1) if m else default
NAME, TAGLINE = cfg("name", "Local Exim"), cfg("tagline", "Global Trade · Local Roots")
PHONE, EMAIL, ADDRESS, WA = cfg("phone"), cfg("email"), cfg("address"), re.sub(r"\D", "", cfg("whatsappNumber"))
if len(WA) == 10: WA = "91" + WA
def wa_link(msg): return f"https://wa.me/{WA}?text={quote(msg)}"

data = json.load(open(P("src", "data", "catalogue.json"), encoding="utf-8"))
CATS = {"men-kolhapuri": "Men's Kolhapuri Chappals", "men-kapshi": "Men's Kapshi & Mojdi (Open-Toe)", "ladies": "Ladies' Kolhapuri & Sandals"}
products = [p for p in data["products"] if not p.get("excludeUntilPhoto")]

W, H = A4
M = 36
img_cache = {}
def img_reader(path, mode="RGB", q=76):
    if path in img_cache: return img_cache[path]
    im = Image.open(path)
    if mode == "RGB":
        im = im.convert("RGB"); buf = io.BytesIO(); im.save(buf, "JPEG", quality=q); buf.seek(0); r = ImageReader(buf)
    else:
        im = im.convert("RGBA")
        if im.width > 700: im = im.resize((700, round(im.height * 700 / im.width)), Image.LANCZOS)
        buf = io.BytesIO(); im.save(buf, "PNG", optimize=True); buf.seek(0); r = ImageReader(buf)
    img_cache[path] = r; return r

def link(c, x, y, w, h, url):
    c.linkURL(url, (x, y, x + w, y + h), relative=0)

out_dir = P("public", "downloads"); os.makedirs(out_dir, exist_ok=True)
out = os.path.join(out_dir, "Local-Exim-Catalogue.pdf")
c = canvas.Canvas(out, pagesize=A4)
c.setTitle(f"{NAME} Product Catalogue"); c.setAuthor(NAME); c.setSubject("Kolhapuri chappals and open-toe leather sandals")

# ---------- cover ----------
c.setFillColor(FOREST); c.rect(0, 0, W, H, fill=1, stroke=0)
c.setStrokeColor(GOLD); c.setLineWidth(0.8); c.rect(22, 22, W - 44, H - 44, fill=0, stroke=1)
lw = 330; lh = lw * 160 / 701
c.drawImage(img_reader(P("public", "logo", "logo-horizontal-light@2x.png"), "RGBA"), (W - lw) / 2, H - 150, lw, lh, mask="auto")
c.setFillColor(GOLD); c.setFont("Sans", 9); c.drawCentredString(W / 2, H - 172, TAGLINE.upper())
cx, cy, r = W / 2, H / 2 + 10, 150
c.setStrokeColor(GOLD); c.setLineWidth(2); c.circle(cx, cy, r, fill=0, stroke=1)
c.setLineWidth(0.5); c.circle(cx, cy, r - 12, fill=0, stroke=1)
hero = P("public", "hero", "sankeshwari-kolhapuri-cutout.webp")
if os.path.exists(hero): c.drawImage(img_reader(hero, "RGBA"), cx - 105, cy - 105, 210, 210, mask="auto")
c.setFillColor(CREAM); c.setFont("SerifB", 34); c.drawCentredString(W / 2, 205, "Product Catalogue")
c.setFillColor(GOLD); c.setFont("Sans", 11); c.drawCentredString(W / 2, 182, "Kolhapuri Chappals  ·  Open-Toe Leather Sandals")
c.setStrokeColor(GOLD); c.setLineWidth(0.8); c.line(W / 2 - 40, 166, W / 2 + 40, 166)
c.setFillColor(CREAM); c.setFont("Sans", 9.5)
c.drawCentredString(W / 2, 140, f"{PHONE}   ·   {EMAIL}")
c.setFont("Sans", 8); c.setFillColor(HexColor("#B9C4BC"))
for i, ln in enumerate(simpleSplit(ADDRESS, "Sans", 8, W - 160)): c.drawCentredString(W / 2, 122 - i * 11, ln)
c.drawCentredString(W / 2, 62, f"Edition {date.today().strftime('%B %Y')}  ·  {len(products)} designs")
link(c, W / 2 - 170, 134, 340, 14, wa_link("Hello Local Exim, I have seen your catalogue."))
c.showPage()

# ---------- product pages ----------
COLS, ROWS, GAP = 3, 3, 12
top, bottom = H - M - 52, M + 40
cw = (W - 2 * M - GAP * (COLS - 1)) / COLS
ch = (top - bottom - GAP * (ROWS - 1)) / ROWS
page_no = [1]

def page_frame(cat_title, part):
    c.setFillColor(CREAM); c.rect(0, 0, W, H, fill=1, stroke=0)
    c.drawImage(img_reader(P("public", "logo", "logo-horizontal@2x.png"), "RGBA"), M, H - M - 24, 112, 112 * 160 / 701, mask="auto")
    c.setFillColor(GREEN); c.setFont("SerifB", 15); c.drawRightString(W - M, H - M - 12, cat_title)
    c.setFillColor(MUTED); c.setFont("Sans", 8); c.drawRightString(W - M, H - M - 26, part)
    c.setStrokeColor(GOLD); c.setLineWidth(0.8); c.line(M, H - M - 34, W - M, H - M - 34)
    c.setStrokeColor(LINE); c.setLineWidth(0.6); c.line(M, M + 26, W - M, M + 26)
    c.setFillColor(MUTED); c.setFont("Sans", 6.8)
    c.drawString(M, M + 14, "Prices are indicative retail prices per pair in INR (₹). Bulk and export pricing on request. Sizes and quantities on request.")
    c.setFont("Sans", 7); c.setFillColor(GREEN); c.drawString(M, M + 3, f"{NAME}  ·  {PHONE}  ·  {EMAIL}")
    page_no[0] += 1
    c.setFillColor(MUTED); c.drawRightString(W - M, M + 3, f"Page {page_no[0]}")

def draw_card(x, y, p):
    c.setFillColor(HexColor("#FFFFFF")); c.setStrokeColor(LINE); c.setLineWidth(0.7)
    c.roundRect(x, y, cw, ch, 8, fill=1, stroke=1)
    ih = ch - 76
    if p.get("photoQuality") == "ok":
        path = P("public", p["image"].lstrip("/"))
        c.drawImage(img_reader(path), x + 6, y + ch - ih - 4, cw - 12, ih, preserveAspectRatio=True, anchor="c")
    else:
        c.setFillColor(HexColor("#F3EFE2")); c.roundRect(x + 8, y + ch - ih - 2, cw - 16, ih - 4, 6, fill=1, stroke=0)
        c.setFillColor(MUTED); c.setFont("Sans", 8); c.drawCentredString(x + cw / 2, y + ch - ih / 2 - 6, "Photo coming soon")
    ty = y + 62
    c.setFillColor(HexColor("#9A7B12")); c.setFont("SansB", 7); c.drawString(x + 10, ty, p.get("code", ""))
    c.setFillColor(INK); c.setFont("SerifB", 9.5)
    for i, ln in enumerate(simpleSplit(p["name"], "SerifB", 9.5, cw - 20)[:2]): c.drawString(x + 10, ty - 13 - i * 11, ln)
    c.setFillColor(GREEN); c.setFont("SansB", 11); c.drawString(x + 10, y + 14, f"₹{p['priceInr']:,}")
    c.setFillColor(MUTED); c.setFont("Sans", 6.2); c.drawString(x + 10 + c.stringWidth(f"₹{p['priceInr']:,}", "SansB", 11) + 4, y + 15, "per pair")
    bw = 62
    c.setFillColor(GREEN); c.roundRect(x + cw - bw - 8, y + 9, bw, 17, 8.5, fill=1, stroke=0)
    c.setFillColor(CREAM); c.setFont("SansB", 6.4); c.drawCentredString(x + cw - bw / 2 - 8, y + 15, "ENQUIRE ›")
    link(c, x, y, cw, ch, wa_link(f"Hello Local Exim, I am interested in {p['name']} (Code: {p.get('code','')}). Please share details."))

per_page = COLS * ROWS
for cat_id, cat_title in CATS.items():
    items = [p for p in products if p["category"] == cat_id]
    pages = (len(items) + per_page - 1) // per_page
    for pg in range(pages):
        chunk = items[pg * per_page:(pg + 1) * per_page]
        page_frame(cat_title, f"{len(items)} designs  ·  part {pg + 1} of {pages}")
        for i, p in enumerate(chunk):
            r, col = divmod(i, COLS)
            draw_card(M + col * (cw + GAP), top - (r + 1) * ch - r * GAP, p)
        c.showPage()

# ---------- closing page ----------
c.setFillColor(FOREST); c.rect(0, 0, W, H, fill=1, stroke=0)
c.setStrokeColor(GOLD); c.setLineWidth(0.8); c.rect(22, 22, W - 44, H - 44, fill=0, stroke=1)
c.setFillColor(CREAM); c.setFont("SerifB", 28); c.drawCentredString(W / 2, H - 120, "How to Order")
c.setStrokeColor(GOLD); c.line(W / 2 - 30, H - 134, W / 2 + 30, H - 134)
steps = [("1", "Send an Enquiry", "Tell us the design codes and quantities you need."), ("2", "Get a Quote", "We share pricing and shipping options."),
         ("3", "Confirm Order", "Agree on details and payment terms."), ("4", "We Ship", "Your order is packed and dispatched.")]
y = H - 190
for n, t, d in steps:
    c.setStrokeColor(GOLD); c.setLineWidth(1); c.circle(W / 2 - 170, y + 4, 13, fill=0, stroke=1)
    c.setFillColor(GOLD); c.setFont("SansB", 11); c.drawCentredString(W / 2 - 170, y, n)
    c.setFillColor(CREAM); c.setFont("SansB", 12); c.drawString(W / 2 - 145, y + 6, t)
    c.setFillColor(HexColor("#B9C4BC")); c.setFont("Sans", 9.5); c.drawString(W / 2 - 145, y - 8, d)
    y -= 54
qr = qrcode.QRCode(box_size=8, border=2); qr.add_data(wa_link("Hello Local Exim, I have seen your catalogue.")); qr.make(fit=True)
qimg = qr.make_image(fill_color="#0B2415", back_color="#FAF8F3").convert("RGB"); buf = io.BytesIO(); qimg.save(buf, "PNG"); buf.seek(0)
qs = 120; c.setFillColor(CREAM); c.roundRect(W / 2 - qs / 2 - 8, 330 - 8, qs + 16, qs + 16, 8, fill=1, stroke=0)
c.drawImage(ImageReader(buf), W / 2 - qs / 2, 330, qs, qs)
c.setFillColor(GOLD); c.setFont("SansB", 10); c.drawCentredString(W / 2, 306, "SCAN TO CHAT ON WHATSAPP")
c.setFillColor(CREAM); c.setFont("SansB", 15); c.drawCentredString(W / 2, 270, PHONE)
c.setFont("Sans", 10.5); c.drawCentredString(W / 2, 248, EMAIL)
c.setFillColor(HexColor("#B9C4BC")); c.setFont("Sans", 8.5)
for i, ln in enumerate(simpleSplit(ADDRESS, "Sans", 8.5, W - 200)): c.drawCentredString(W / 2, 226 - i * 12, ln)
c.setFillColor(GOLD); c.setFont("Sans", 9); c.drawCentredString(W / 2, 90, TAGLINE.upper())
link(c, W / 2 - 80, 262, 160, 20, wa_link("Hello Local Exim, I have seen your catalogue."))
link(c, W / 2 - 100, 242, 200, 16, f"mailto:{EMAIL}")
c.showPage(); c.save()
print(f"Wrote {out}  ({os.path.getsize(out)/1024/1024:.2f} MB, {len(products)} designs)")
