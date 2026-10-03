# Himanshu Saha — Portfolio

A framework-free, production-oriented portfolio for a Full Stack Developer specializing in Flutter mobile applications, backend APIs, real-time systems and native integrations.

## Structure

```text
himanshu-portfolio/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── data/
│   │   ├── site.js
│   │   ├── projects.js
│   │   ├── experience.js
│   │   ├── skills.js
│   │   └── engineering.js
│   ├── js/main.js
│   ├── images/projects/
│   └── documents/Himanshu-Resume.pdf
├── .gitignore
└── README.md
```

## Why the refactor?

`main.js` contains behavior only: rendering, filtering, navigation, animation and the interactive handshake demo. Portfolio content is separated into `assets/data/*.js`, so changing a project, skill, social link or experience entry does not require editing application logic.

Static HTML remains responsible for the semantic page structure and SEO metadata. This keeps the site easy to host while making the codebase easier to maintain.

## Run locally

Because the site uses ES modules, run it through a local HTTP server instead of opening `index.html` directly.

### VS Code
1. Open this folder.
2. Install **Live Server**.
3. Right-click `index.html` → **Open with Live Server**.

### Python
```bash
python -m http.server 5500
```
Then open `http://localhost:5500`.

## Deploy

This is a static site and can be deployed directly to GitHub Pages, Netlify, Vercel or Cloudflare Pages.

Before deployment, replace `ADD_LINK_HERE` in `index.html` / `assets/data/site.js` with the final canonical URL if required.

## Images

The project cards currently use local visual placeholders for projects where real screenshots were not supplied. Replace them with approved app screenshots inside `assets/images/projects/` without changing the data structure.
