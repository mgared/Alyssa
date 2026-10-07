# Design by Labillois

Portfolio website for Alyssa Labillois, interior designer, Boston, MA. Built with React, Vite and React Router.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Editing content

- **Text, contact info, projects:** `src/data/site.js`
- **Photos:** `public/images/` (see the README there)
- **Colors & fonts:** variables at the top of `src/index.css`
- **Logo:** `src/components/Logo.jsx`. Preview all versions and the color palette at `/brand`.

## Pages

| Path | Page |
| --- | --- |
| `/` | Home: full-width photo slideshow |
| `/portfolio` | All projects |
| `/portfolio/:slug` | Project detail gallery |
| `/contact` | Contact form (opens email) and details |
| `/about` | About Alyssa |
| `/brand` | Unlisted logo and palette preview |

## Deploying

Works on Netlify (`public/_redirects`) or Vercel (`vercel.json`). Both are already set up for client-side routing.
