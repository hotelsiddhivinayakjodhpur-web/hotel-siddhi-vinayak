# Video Optimization Report — Hotel Siddhi Vinayak

Source: best walkthrough clip from the Drive `VIDEOS` folder (`BESTBU~1.MP4`, 6.8 MB, 720×1280).

## Professional processing (ffmpeg)
| Step | Filter | Purpose |
|------|--------|---------|
| Stabilization | `vidstabdetect` + `vidstabtransform` (smoothing 30) | Smooths handheld shake (2-pass) |
| Color grade | `eq=contrast=1.08:brightness=0.02:saturation=1.14` | Richer, brighter, more vivid |
| Sharpen | `unsharp=5:5:0.5` | Crisper detail |
| Scale | `scale=-2:1080` | Max 1080p |
| Trim | `-t 14` | Tight 14-second hero loop |
| Encode | H.264 high, CRF 27, `+faststart` | Fast start, web-optimized |
| Audio | stripped (`-an`) | Muted autoplay (browser policy) |

## Result
| | Original | Optimized |
|---|---|---|
| File | `BESTBU~1.MP4` | `/videos/hero.mp4` |
| Size | 6.8 MB | **4.0 MB** (14s, graded + stabilized) |
| Format | H.264 | H.264 high, faststart, muted |
| Poster | — | `/videos/hero-poster.jpg` |

Used as the **desktop** homepage hero background (muted autoplay loop, reduced-motion → poster).
Mobile uses the optimized exterior WebP for a fast LCP.
