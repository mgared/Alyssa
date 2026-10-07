# Design by Labillois

Portfolio website for Alyssa Labillois, interior designer, Boston, MA. Built with React, Vite and React Router.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Editing content

Alyssa edits the portfolio, home slideshow, About page and contact details herself at **`/admin`**. That page needs a free Supabase project; see [docs/ADMIN_SETUP.md](docs/ADMIN_SETUP.md). Without it, the site shows the defaults below and `/admin` runs in demo mode, where nothing is saved.

- **Default text, contact info, projects:** `src/data/site.js`
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
| `/admin` | Sign-in and content editor for Alyssa |

## Deploying

Works on Netlify (`public/_redirects`) or Vercel (`vercel.json`). Both are already set up for client-side routing.

## Private preview

`npm run build:preview` bundles the whole site into one file, `dist-preview/labillois-preview.html`, for sharing a preview link before the site goes live. Add `#admin` to the end of the preview link to open the admin page in demo mode.
