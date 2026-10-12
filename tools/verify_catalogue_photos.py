import os
import time
from playwright.sync_api import sync_playwright

artifact_dir = r"C:\Users\Admin\.gemini\antigravity-ide\brain\a6d28f90-b6cc-4661-8530-bf5135cb1a63"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:5173/catalogue")
    page.wait_for_timeout(2000)

    # Click Load More until all products are loaded
    while True:
        load_more = page.locator("button:has-text('Load More')")
        if load_more.count() > 0 and load_more.is_visible():
            load_more.click()
            page.wait_for_timeout(500)
        else:
            break

    # Count product cards
    # Each product card has code badges or enquiry buttons
    enquiry_buttons = page.locator("button:has-text('Enquire on WhatsApp'), a:has-text('Enquire on WhatsApp')")
    count = enquiry_buttons.count()
    print(f"Total rendered products with WhatsApp buttons: {count}")

    # Check for placeholder text anywhere
    placeholders = page.locator("text='Photo coming soon'")
    print(f"Placeholder count ('Photo coming soon'): {placeholders.count()}")

    # Check the 8 updated products
    codes_to_check = ["MK-05", "MK-08", "MK-09", "MK-13", "MS-04", "MS-06", "MK-19", "LD-10"]
    for code in codes_to_check:
        badge = page.locator(f"text='{code}'")
        print(f"Product {code} present: {badge.count() > 0}")

    # Capture full page screenshot
    full_screenshot_path = os.path.join(artifact_dir, "catalogue_all_46_products.png")
    page.screenshot(path=full_screenshot_path, full_page=True)
    print(f"Saved full catalogue screenshot to: {full_screenshot_path}")

    # Capture top section
    top_path = os.path.join(artifact_dir, "catalogue_verified_top.png")
    page.screenshot(path=top_path)
    print(f"Saved top view to: {top_path}")

    browser.close()
