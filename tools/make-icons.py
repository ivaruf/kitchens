#!/usr/bin/env python3
"""Generate the Kitchens icon set.

    python3 tools/make-icons.py

Writes icons/icon-192.png, icon-512.png, icon-180.png and
icon-maskable-512.png. Pillow only: no network, no fonts, no assets. The
script is the source of truth, not the PNGs (hub CLAUDE.md §4).

THE MOTIF: a terracotta pot, side on, on a shutter-blue wall, with three
white wisps of steam rising out of it — the game's own stove, reduced to the
one thing that says "something is cooking". Three masses with hard value
breaks keep it legible at 24 px: the BLUE ground, the warm TERRACOTTA pot
(the only saturated warm thing in the frame), and the WHITE steam. The rim
highlight, the handles and the lemon-yellow flame under the pot are 512-px
detail and are allowed to disappear when small.

Rendered 4x and downsampled with LANCZOS. Colours are css/style.css's own:
--blue is the manifest's theme and background colour.
"""

import math
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "icons")

BLUE = (31, 95, 139)       # --blue
BLUE_DEEP = (22, 71, 102)  # --blue-deep
TERRA = (179, 90, 54)      # --terra
TERRA_LT = (196, 106, 67)  # the rim
TERRA_DK = (158, 75, 44)   # the handles
WASH = (251, 248, 241)     # --paper, the steam
LEMON = (232, 197, 71)     # --lemon, the flame

SS = 4


def draw(size, inset):
    """The motif inside a safe area `inset` (0..0.5) from each edge."""
    S = size * SS
    img = Image.new("RGB", (S, S), BLUE)
    d = ImageDraw.Draw(img)

    # A deeper band low down: the counter's shadow, so the pot sits on something.
    d.rectangle([0, int(S * 0.80), S, S], fill=BLUE_DEEP)

    a = S * inset
    span = S - 2 * a

    def P(u, v):
        return (a + u * span, a + v * span)

    # Flame: a row of small lemon tongues under the pot.
    for i in range(5):
        u = 0.30 + i * 0.1
        x0, y0 = P(u - 0.025, 0.80)
        x1, y1 = P(u + 0.025, 0.86)
        d.ellipse([x0, y0, x1, y1], fill=LEMON)

    # Handles, then the pot body, then the rim over the top edge.
    for u0, u1 in ((0.10, 0.20), (0.80, 0.90)):
        x0, y0 = P(u0, 0.50)
        x1, y1 = P(u1, 0.58)
        d.rounded_rectangle([x0, y0, x1, y1], radius=span * 0.03, fill=TERRA_DK)
    x0, y0 = P(0.17, 0.46)
    x1, y1 = P(0.83, 0.80)
    d.rounded_rectangle([x0, y0, x1, y1], radius=span * 0.07, fill=TERRA)
    x0, y0 = P(0.14, 0.44)
    x1, y1 = P(0.86, 0.50)
    d.rounded_rectangle([x0, y0, x1, y1], radius=span * 0.02, fill=TERRA_LT)

    # Steam: three S-curves, drawn as chains of short thick segments.
    w = max(2, int(span * 0.045))
    for k, u in enumerate((0.36, 0.50, 0.64)):
        top = 0.12 + (0.04 if k != 1 else 0)
        pts = []
        for i in range(25):
            t = i / 24
            v = 0.38 - t * (0.38 - top)
            du = 0.035 * math.sin(t * 6.28 + k)
            pts.append(P(u + du, v))
        d.line(pts, fill=WASH, width=w, joint="curve")
        r = w / 2
        for x, y in (pts[0], pts[-1]):
            d.ellipse([x - r, y - r, x + r, y + r], fill=WASH)

    return img.resize((size, size), Image.LANCZOS)


def main():
    os.makedirs(OUT, exist_ok=True)
    draw(192, 0.06).save(os.path.join(OUT, "icon-192.png"))
    draw(512, 0.06).save(os.path.join(OUT, "icon-512.png"))
    draw(180, 0.06).save(os.path.join(OUT, "icon-180.png"))
    # Maskable: launchers crop to a circle or squircle, so the motif shrinks
    # into the central 80% safe zone while the blue still fills every corner.
    draw(512, 0.16).save(os.path.join(OUT, "icon-maskable-512.png"))


if __name__ == "__main__":
    main()
