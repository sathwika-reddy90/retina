#!/usr/bin/env python3
"""Generate the colour visualizer's lighting maps from each room overlay's wall mask.

The room overlays in src/assets/rooms/*.png have their walls cut out (transparent), so
the selected paint colour shows through only where there is wall. These maps put back
believable light on that flat colour:
  <room>-shade.png  multiply map: contact shadows around furniture, ceiling fall-off,
                    vignette and a faint paint texture (255 = untouched)
  <room>-light.png  screen map: soft daylight from the room's window (0 = untouched)

Usage:  python3 scripts/generate-lightmaps.py   (requires numpy and Pillow)
"""
import os
import numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src', 'assets', 'rooms')
OUT = os.path.join(SRC, 'light')
os.makedirs(OUT, exist_ok=True)

# Per-room art direction. Offsets/radii are fractions of image width.
CFG = {
  'living-room': dict(contact=0.55, ambient=0.20, shift=(-0.012, 0.004), ceiling=0.16, vignette=0.10, light=(0.80, 0.30, 0.30, 0.45, 0.16), noise=0.012),
  'bedroom':     dict(contact=0.60, ambient=0.24, shift=(-0.010, 0.006), ceiling=0.22, vignette=0.14, light=(0.95, 0.30, 0.30, 0.55, 0.14), noise=0.012),
  'kids-room':   dict(contact=0.45, ambient=0.16, shift=(0.008, 0.006),  ceiling=0.14, vignette=0.10, light=(0.18, 0.25, 0.35, 0.50, 0.12), noise=0.012),
  'kitchen':     dict(contact=0.40, ambient=0.14, shift=(0.006, 0.006),  ceiling=0.10, vignette=0.10, light=(0.30, 0.20, 0.35, 0.45, 0.10), noise=0.007),
  'dining':      dict(contact=0.55, ambient=0.22, shift=(0.0, 0.008),    ceiling=0.20, vignette=0.14, light=(0.50, 0.22, 0.28, 0.35, 0.16), noise=0.007),
  'apartment':   dict(contact=0.10, ambient=0.05, shift=(0, 0),          ceiling=0.0,  vignette=0.0,  light=None, noise=0.0),
  'house':       dict(contact=0.10, ambient=0.05, shift=(0, 0),          ceiling=0.0,  vignette=0.0,  light=None, noise=0.0),
}

def blur(arr, r):
    im = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    return np.asarray(im.filter(ImageFilter.GaussianBlur(r)), dtype=np.float32) / 255

def build(name):
    c = CFG[name]
    im = Image.open(os.path.join(SRC, name + '.png')).convert('RGBA')
    W0 = im.width
    if im.width > 1280:
        im = im.resize((1280, round(im.height * 1280 / im.width)), Image.LANCZOS)
    a = np.asarray(im, dtype=np.float32)[..., 3] / 255
    H, W = a.shape
    obj = (a > 0.5).astype(np.float32)          # furniture, floor, windows…
    dx, dy = int(c['shift'][0] * W), int(c['shift'][1] * W)
    shifted = np.roll(np.roll(obj, dy, axis=0), dx, axis=1)
    contact = blur(shifted, W * 0.010)
    ambient = blur(obj, W * 0.060)
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    ny, nx = yy / H, xx / W
    mult = 1 - c['contact'] * contact * 0.6 - c['ambient'] * ambient
    mult *= 1 - c['ceiling'] * (1 - ny) ** 3
    mult *= 1 - c['vignette'] * (((nx - 0.5) ** 2 + (ny - 0.5) ** 2) / 0.5)
    if c['noise']:
        rng = np.random.default_rng(7)
        n = blur(rng.random((H, W)).astype(np.float32), 0.8) - 0.5
        mult *= 1 + n * c['noise'] * 4
    mult = np.clip(mult, 0.45, 1)
    light = np.zeros_like(mult)
    if c['light']:
        lx, ly, sx, sy, k = c['light']
        light = k * np.exp(-(((nx - lx) ** 2) / (2 * sx ** 2) + ((ny - ly) ** 2) / (2 * sy ** 2)))
    Image.fromarray((mult * 255).astype(np.uint8)).convert('L').save(os.path.join(OUT, f'{name}-shade.png'), optimize=True)
    Image.fromarray((np.clip(light, 0, 1) * 255).astype(np.uint8)).convert('L').save(os.path.join(OUT, f'{name}-light.png'), optimize=True)
    return im, mult, light

if __name__ == '__main__':
    for room in CFG:
        build(room)
        print('wrote', room)
