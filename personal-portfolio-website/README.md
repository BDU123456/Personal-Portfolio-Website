# Biruk Taye — Personal Portfolio Website

A modern, responsive personal portfolio built with **HTML5**, **CSS3**, and **vanilla JavaScript** as part of a Full Stack Development Internship. There is no React app and no backend server.

## Project structure

```text
personal-portfolio-website/
├── index.html                 # All page sections
├── css/
│   └── styles.css             # Layout, theme, responsive rules
├── js/
│   └── main.js                # Navigation, scroll, form validation
├── assets/
│   ├── cv.html                # Downloadable / printable CV
│   └── images/
│       ├── favicon.svg
│       └── profile-placeholder.svg
└── README.md
```

## Sections

1. **Home** — name, title, introduction, profile placeholder, Download CV, navigation
2. **About Me** — personal introduction, education, career objectives
3. **Skills** — technical skills, languages, frameworks, tools (card layout)
4. **Projects** — descriptions, technologies, GitHub and demo links
5. **Contact** — validated form, email, and social links

## How to run locally

You can open `index.html` in a browser. A local server is better so navigation and assets load consistently.

### Option A: Python

```bash
cd personal-portfolio-website
python -m http.server 5500
```

Then open [http://localhost:5500](http://localhost:5500).

### Option B: VS Code / Cursor Live Server

Open the folder and start Live Server on `index.html`.

No `npm install` is required.

## Contact form behavior

The form checks name, email, subject, and message in the browser.

- Name: required, at least 2 letters (letters, spaces, hyphens, apostrophes)
- Email: required, standard `name@domain.tld` format
- Subject: required, at least 3 characters
- Message: required, at least 20 characters

If validation passes, the site opens a `mailto:` draft to **biruktaye01@gmail.com**. That is a real send path through your email app. The site does **not** claim that a message was delivered, because this project has no mail server.

To use a hosted form service later (Formspree, Getform, Netlify Forms), replace the submit handler in `js/main.js` and point the form `action` at that service.

## Customize your details

Update these files when you have a photo, GitHub username, or education specifics:

| Item | Where to change |
| --- | --- |
| Name, bio, education, projects | `index.html` and `assets/cv.html` |
| Email | `index.html` and `CONTACT_EMAIL` in `js/main.js` |
| GitHub / LinkedIn URLs | `index.html` (project and social links) |
| Profile photo | Replace `assets/images/profile-placeholder.svg` and keep the same `src` in `index.html`, or change the `src` |
| CV as PDF | Export `assets/cv.html` with Print → Save as PDF, then point the Download CV button at that PDF |

## Deploy with GitHub Pages

1. Create a GitHub repository (for example `personal-portfolio-website`).
2. Push this folder to the default branch:

   ```bash
   git add .
   git commit -m "Add personal portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages**.
4. Source: **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)`.
6. Save. After a minute, the site is at:

   `https://YOUR_USERNAME.github.io/YOUR_REPO/`

If the repository is named `YOUR_USERNAME.github.io`, the site is available at `https://YOUR_USERNAME.github.io/`.

After you have a live URL, set the portfolio project’s **Live demo** link in `index.html` to that address.

## Other hosting options

- **Netlify**: drag the project folder onto [https://app.netlify.com/drop](https://app.netlify.com/drop), or connect the GitHub repo.
- **Cloudflare Pages**: connect the repo and set the output directory to `/`.

## Browser support

Recent versions of Chrome, Edge, Firefox, and Safari. Layout is tested for desktop, tablet, and mobile widths.
