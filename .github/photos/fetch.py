"""Recherche de photos libres (CC0 / domaine public) sur Openverse.

Étape « sheets » : pour chaque requête de queries.json, planches contact numérotées.
Étape « pick » : télécharge les photos retenues dans picks.json vers public/images/maquettes.
"""
import io, json, os, re, sys, time, urllib.parse, urllib.request
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.abspath(__file__))
UA = {"User-Agent": "neobatys-maquettes/1.0 (https://github.com/hoffertgabin-cmyk/neobatys)"}


def get(url, tries=4):
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001
            print("  retry", url[:90], e)
            time.sleep(30 if "429" in str(e) or "401" in str(e) else 3)
    return None


FREE = ("cc0", "public domain", "pd", "cc-zero")


def search(q, n=12):
    """Photos Wikimedia Commons en paysage, licences libres (CC0 / domaine public en tête)."""
    p = {
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {q}",
        "gsrnamespace": 6,
        "gsrlimit": 50,
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata",
        "iiurlwidth": 1400,
    }
    raw = get(f"https://commons.wikimedia.org/w/api.php?{urllib.parse.urlencode(p)}")
    if not raw:
        return []
    pages = sorted(json.loads(raw).get("query", {}).get("pages", {}).values(), key=lambda x: x.get("index", 0))
    free, other = [], []
    for pg in pages:
        ii = (pg.get("imageinfo") or [{}])[0]
        w, h = ii.get("width", 0), ii.get("height", 0)
        if w < 1200 or w < h * 1.2 or not ii.get("thumburl"):
            continue
        md = ii.get("extmetadata", {})
        lic = (md.get("LicenseShortName", {}).get("value") or "").strip()
        r = {
            "id": pg["pageid"],
            "url": ii["thumburl"],
            "thumb": ii["thumburl"].replace("/1400px-", "/330px-"),
            "license": lic,
            "creator": re.sub("<[^>]+>", "", md.get("Artist", {}).get("value") or "").strip(),
            "foreign_landing_url": ii.get("descriptionurl"),
            "title": pg["title"],
            "width": w,
            "height": h,
        }
        low = lic.lower()
        if any(f in low for f in FREE):
            free.append(r)
        elif low.startswith("cc by"):
            other.append(r)
    return (free + other)[:n]


def sheets():
    queries = json.load(open(f"{ROOT}/queries.json"))
    os.makedirs(f"{ROOT}/sheets", exist_ok=True)
    meta = {}
    for key, q in queries.items():
        print("search", key, q)
        res = search(q)
        thumbs = []
        for r in res:
            raw = get(r["thumb"], tries=2)
            if not raw:
                continue
            try:
                im = Image.open(io.BytesIO(raw)).convert("RGB")
            except Exception:  # noqa: BLE001
                continue
            im.thumbnail((300, 200))
            thumbs.append((im, r))
        meta[key] = [
            {k: r.get(k) for k in ("id", "url", "license", "creator", "foreign_landing_url", "title", "width", "height")}
            for _, r in thumbs
        ]
        sheet = Image.new("RGB", (4 * 310, 3 * 230), "white")
        d = ImageDraw.Draw(sheet)
        for i, (im, _) in enumerate(thumbs[:12]):
            x, y = (i % 4) * 310, (i // 4) * 230
            sheet.paste(im, (x + 5, y + 5))
            d.rectangle([x + 5, y + 5, x + 35, y + 30], fill="black")
            d.text((x + 12, y + 10), str(i), fill="white")
            d.text((x + 8, y + 208), thumbs[i][1]["license"][:40], fill="black")
        d.text((5, 3 * 230 - 14), f"{key}: {q}", fill="black")
        sheet.save(f"{ROOT}/sheets/{key}.jpg", quality=60)
        time.sleep(0.5)
    json.dump(meta, open(f"{ROOT}/sheets/meta.json", "w"), indent=1, ensure_ascii=False)


def pick():
    meta = json.load(open(f"{ROOT}/sheets/meta.json"))
    picks = json.load(open(f"{ROOT}/picks.json"))
    dest = os.path.join(ROOT, "..", "..", "public", "images", "maquettes")
    os.makedirs(dest, exist_ok=True)
    credits = {}
    for name, (key, idx) in picks.items():
        r = meta[key][idx]
        raw = get(r["url"])
        if not raw:
            print("FAILED", name)
            continue
        im = Image.open(io.BytesIO(raw)).convert("RGB")
        im.thumbnail((1400, 1000))
        im.save(f"{dest}/{name}.jpg", quality=74, optimize=True, progressive=True)
        credits[name] = {k: r[k] for k in ("title", "creator", "license", "foreign_landing_url")}
        print("ok", name, im.size)
    json.dump(credits, open(f"{dest}/credits.json", "w"), indent=1, ensure_ascii=False)


if __name__ == "__main__":
    {"sheets": sheets, "pick": pick}[sys.argv[1]]()
