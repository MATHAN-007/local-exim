import os
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
            page.wait_for_timeout(400)
        else:
            break

    # Locate each of the three updated cards
    for code, name in [
        ("MS-06", "chatai_majdi_card"),
        ("LD-10", "ladies_kolhapuri_spl_card"),
        ("MK-19", "kurundwadi_paytan_card")
    ]:
        card = page.locator(f"div.group:has(span:text('{code}'))")
        print(f"Card {code} found: {card.count()}")
        if card.count() > 0:
            card.first.scroll_into_view_if_needed()
            page.evaluate("window.scrollBy(0, -120)")
            page.wait_for_timeout(300)
            img_el = card.first.locator("img")
            print(f"{code} img src: {img_el.get_attribute('src')}")
            card.first.screenshot(path=os.path.join(artifact_dir, f"updated_{name}.png"))
            print(f"Saved {name} card screenshot")

    browser.close()
