# ⬡ ServerlessHQ — Static Website

A fully serverless static website hosted on **AWS S3 + CloudFront**.

## 📁 Folder Structure

```
/
├── index.html          ← Main page (S3 index document)
├── error.html          ← 404 error page (S3 error document)
├── README.md
├── css/
│   └── main.css
├── js/
│   └── script.js
└── images/
    ├── cloud-dashboard.webp   ← Hero image (1200×800px)
    ├── aws-architecture.png   ← Architecture diagram (800×600px)
    ├── s3-icon.svg            ← Feature icon (200×200px)
    ├── cloudfront-globe.svg   ← Feature icon (200×200px)
    └── https-secure.svg       ← Feature icon (200×200px)
```

## 🖼 Images Required

| File | Size | Description |
|------|------|-------------|
| `images/cloud-dashboard.webp` | 1200×800px | Hero section — screenshot of AWS console or cloud dashboard |
| `images/aws-architecture.png` | 800×600px | About section — S3 → CloudFront architecture diagram |
| `images/s3-icon.svg` | 200×200px | Feature card — Amazon S3 bucket icon |
| `images/cloudfront-globe.svg` | 200×200px | Feature card — CloudFront globe graphic |
| `images/https-secure.svg` | 200×200px | Feature card — HTTPS/lock security icon |

## 🚀 Deploy to AWS

1. **Create S3 Bucket** — enable Static Website Hosting, set `index.html` as index document, `error.html` as error document.
2. **Upload files** — maintain the folder structure above.
3. **Set bucket policy** — allow public `GetObject` access.
4. **Create CloudFront Distribution** — origin = S3 bucket, default root object = `index.html`.
5. **(Optional)** Add custom domain via Route 53 + ACM certificate.

## 🛠 Tech Stack

- HTML5 / CSS3 / Vanilla JS
- Google Fonts (Syne + DM Sans)
- AWS S3 (hosting) + CloudFront (CDN)
