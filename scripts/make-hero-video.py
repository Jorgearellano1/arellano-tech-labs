"""
Genera el video de fondo del hero: manchas de color muy suaves que derivan
lentamente sobre un lienzo casi liso. Bucle perfecto (movimiento periódico).
Salida: public/video/hero-{light,dark}.mp4 + poster .webp
"""
import math, os, subprocess, sys
import numpy as np
from PIL import Image

W, H = 640, 360          # render (se escala a 1280x720 al codificar)
FPS, SECONDS = 24, 12
N = FPS * SECONDS
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'video')
TMP = '/private/tmp/claude-501/-Users-jorgearellano1/e164e987-017a-4cdd-ac9e-2d7fbe89942b/scratchpad/frames'

THEMES = {
    'light': {
        'bg': (247, 248, 252),
        'blobs': [  # color, radio relativo, fuerza
            ((232, 181, 71), 0.42, 0.55),
            ((245, 195, 216), 0.38, 0.5),
            ((196, 215, 255), 0.46, 0.6),
        ],
    },
    'dark': {
        'bg': (11, 17, 30),
        'blobs': [
            ((232, 181, 71), 0.40, 0.30),
            ((94, 234, 212), 0.36, 0.22),
            ((99, 102, 241), 0.48, 0.30),
        ],
    },
}

yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
xx /= W; yy /= H

def center(i, t):
    # Lissajous con periodos que dividen SECONDS → bucle exacto
    a = 2 * math.pi * t / SECONDS
    if i == 0: return 0.28 + 0.18 * math.sin(a), 0.36 + 0.14 * math.cos(2 * a)
    if i == 1: return 0.72 + 0.16 * math.cos(a), 0.30 + 0.16 * math.sin(2 * a + 1.0)
    return 0.50 + 0.22 * math.sin(a + 2.0), 0.78 + 0.10 * math.cos(a)

def frame(theme, t):
    bg = np.array(theme['bg'], np.float32)
    img = np.broadcast_to(bg, (H, W, 3)).copy()
    for i, (col, r, k) in enumerate(theme['blobs']):
        cx, cy = center(i, t)
        d2 = ((xx - cx) ** 2 + ((yy - cy) * H / W) ** 2)
        g = np.exp(-d2 / (2 * (r * 0.55) ** 2)) * k
        img += g[..., None] * (np.array(col, np.float32) - bg)
    # grano muy leve, estable en el tiempo (no parpadea)
    return np.clip(img, 0, 255).astype(np.uint8)

rng = np.random.default_rng(7)
grain = rng.normal(0, 1.6, (H, W, 1)).astype(np.float32)

for name, theme in THEMES.items():
    d = os.path.join(TMP, name); os.makedirs(d, exist_ok=True)
    for n in range(N):
        f = frame(theme, n / FPS).astype(np.float32) + grain
        Image.fromarray(np.clip(f, 0, 255).astype(np.uint8)).save(os.path.join(d, f'f_{n:04d}.png'))
    mp4 = os.path.join(OUT, f'hero-{name}.mp4')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-i', os.path.join(d, 'f_%04d.png'),
                    '-vf', 'scale=1280:720:flags=lanczos', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'main',
                    '-crf', '30', '-preset', 'slow', '-tune', 'film', '-movflags', '+faststart', '-an', mp4], check=True)
    Image.fromarray(frame(theme, 0)).resize((1280, 720), Image.LANCZOS).save(os.path.join(OUT, f'hero-{name}.webp'), quality=70)
    print(name, os.path.getsize(mp4) // 1024, 'KB')
