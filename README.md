# Growthline Digital — Freelance Marketing Website

A fast, dependency-free website for a freelance digital marketing agency, built to turn visitors into client enquiries.

**Sections:** hero with call to action · stats · services · case-study results · why work with me · 4-step process · pricing packages · testimonials · FAQ · contact form · floating WhatsApp button.

## Make it yours

| What | Where |
| --- | --- |
| Agency name ("Growthline Digital") | `index.html` (header, footer, `<title>`, meta tags) |
| Email address | `index.html` (`hello@example.com`) and `CONFIG.email` in `script.js` |
| WhatsApp number | `index.html`: replace `10000000000` in both `wa.me` links with your number incl. country code |
| Stats, case studies, testimonials | `index.html`: **replace the sample content with your real numbers and client quotes** |
| Prices and currency | `index.html`, `#pricing` section |
| Brand colours | `styles.css`, `:root` variables (`--primary`, `--accent`) |

## Contact form

By default, submitting the form opens the visitor's email app with their enquiry filled in.
To get submissions straight to your inbox instead:

1. Create a free form at [formspree.io](https://formspree.io).
2. Paste its endpoint into `CONFIG.formEndpoint` in `script.js`.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Publish (free)

- **GitHub Pages:** Repo Settings → Pages → deploy from branch → root folder.
- **Netlify / Vercel:** drag and drop the folder, or connect this repo. No build step needed.
