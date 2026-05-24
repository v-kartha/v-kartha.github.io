# vivekkartha.com — Personal Portfolio Site (v2)

A single-page portfolio for Vivek Kartha. Bright, colorful, data-forward aesthetic with an animated chart hero, gradient project cards, and a vibrant timeline. Built with plain HTML, CSS, and a small vanilla JS file — no build step, no framework.

**Stack:** HTML, CSS, vanilla JS. Google Fonts CDN. Total payload ~45KB excluding fonts.

---

## File Structure

```
.
├── index.html              # Page structure + content + inline SVG visualisations
├── styles.css              # All styling
├── script.js               # Scroll reveals + nav
├── profile.jpg             # OPTIONAL — replaces the "VK" gradient placeholder
├── Vivek_Kartha_CV.pdf     # CV download (add this file yourself)
└── README.md               # This file
```

---

## What's Included Out of the Box

- **Hero**: Headline with gradient "Analyst" word + italic Bricolage Grotesque accent line, animated user-growth line chart visualisation (the actual 2K→650K story), floating metric cards
- **Stats strip**: Four icon-led metric cards (650K+, 60%, 10yrs, MSc 2026)
- **About**: Profile photo placeholder with animated rainbow conic-gradient ring, floating UK/Data/MSc badges, color-highlighted body copy
- **Selected Work**: Three project cards with vibrant gradient headers and SVG dashboard mockups (purple-pink, amber-coral, teal-cyan)
- **Experience**: Vertical timeline with color-gradient connector line and colored role dots
- **Stack**: Six skill cards with emoji icons and colored top borders that flood-color the chips on hover
- **Contact CTA**: Dark gradient card with blob decorations, gradient title, glassmorphic contact links

---

## Customisation

### Replace the profile placeholder with a real photo

In `index.html`, find this block in the About section:

```html
<div class="profile-photo">
  <!-- Replace with: <img src="profile.jpg" alt="Vivek Kartha" /> -->
  <div class="profile-placeholder">VK</div>
</div>
```

Swap to:

```html
<div class="profile-photo">
  <img src="profile.jpg" alt="Vivek Kartha" />
</div>
```

Drop a square photo (recommended 480×480px JPG/WebP) named `profile.jpg` in the same folder. The animated rainbow ring around it stays.

### Change the colour scheme

All colors are CSS variables at the top of `styles.css`:

```css
--indigo:  #4f46e5;    /* primary brand */
--coral:   #f43f5e;    /* secondary accent */
--mint:    #10b981;    /* success/availability */
--amber:   #f59e0b;    /* highlight */
--purple:  #a855f7;
--teal:    #14b8a6;
```

Change these once and the whole site updates — gradients, hover states, accent borders, everything.

### Update content

All content is in `index.html`. Sections are commented (`<!-- HERO -->`, `<!-- WORK -->`, etc). Find the section and edit text directly.

### Update the hero chart

The line chart in the hero is hand-drawn SVG paths. To update the growth curve, edit the `d=""` attribute on the `<path class="viz-line">` and `<path class="viz-area">` elements in `index.html`. The viewBox is `0 0 400 220` — keep your path coordinates within that range.

To change start/end labels, edit the text in `.viz-label-start` and `.viz-label-end` divs.

### Replace project mock visuals

Each project card has an inline SVG mockup in `.project-mock`. To use a real screenshot instead:

```html
<!-- Replace the <svg class="project-mock">...</svg> with: -->
<img src="fraud-detection-screenshot.png" alt="Project preview" class="project-mock" />
```

Recommended screenshot size: 800×480px.

---

## Deployment to DigitalOcean

### Option 1 — DigitalOcean App Platform (Recommended, Free for Static)

1. Push these files to a GitHub repo (`v-kartha/vivekkartha-site`)
2. Go to https://cloud.digitalocean.com/apps → **Create App**
3. Connect your GitHub repo, select branch `main`
4. DigitalOcean auto-detects as a **Static Site** ($0/month)
5. Click **Create Resources**
6. In **Domains**, add `vivekkartha.com` and `www.vivekkartha.com`
7. Update your domain registrar's DNS to point to the records DigitalOcean provides
8. SSL is automatic and free

Result: auto-deploys on every git push, global CDN, free SSL.

### Option 2 — DigitalOcean Droplet with Nginx

```bash
# On your droplet:
apt update && apt install -y nginx
mkdir -p /var/www/vivekkartha
# Upload files from local machine:
# scp -r ./*  root@DROPLET_IP:/var/www/vivekkartha/
```

Create `/etc/nginx/sites-available/vivekkartha`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name vivekkartha.com www.vivekkartha.com;
    root /var/www/vivekkartha;
    index index.html;

    location / { try_files $uri $uri/ =404; }

    location ~* \.(css|js|jpg|jpeg|png|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

```bash
ln -s /etc/nginx/sites-available/vivekkartha /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
apt install -y certbot python3-certbot-nginx
certbot --nginx -d vivekkartha.com -d www.vivekkartha.com
```

---

## Performance

- Total page weight: ~250KB first load (including Google Fonts), ~50KB on revisit (fonts cached)
- All visuals are SVG (sharp on retina, tiny file size)
- No images required to deploy
- Lighthouse score should be 95+ out of the box
- Respects `prefers-reduced-motion` for accessibility

---

## Before You Deploy

1. **Add your CV** as `Vivek_Kartha_CV.pdf` in the root
2. **Add a profile photo** as `profile.jpg` (optional — placeholder works too)
3. **Test on mobile** — open `index.html` in your browser, use device emulation
4. **Take down the old WordPress site first** so the new one cleanly takes over

---

## Things to Add Later

- A favicon set (the inline SVG favicon works in browsers; add a PNG set for iOS home screen)
- An Open Graph image (`og-image.png`, 1200×630px) for richer LinkedIn/Twitter link previews
- Real project screenshots in each project card once you have them
- Once the MSc fraud detection project ships in September 2026, update the "In progress" pill and add live demo + GitHub links

---

Built May 2026.
