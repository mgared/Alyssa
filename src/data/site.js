// Central place for all site content. Edit text, contact info, and projects here.

// Fixed brand details that don't change from the admin page.
export const site = {
  name: 'Design by Labillois',
  designer: 'Alyssa Labillois',
  title: 'Interior Designer',
}

// Default content. Once the admin backend is connected, anything Alyssa saves
// from /admin replaces these values on the live site.
export const defaultContent = {
  contact: {
    email: 'alyssa@designbylabillois.com',
    phone: '617-721-8820',
    location: 'Boston, MA',
    instagramHandle: 'designbylabillois',
  },
  hero: {
    // Home page slideshow. Missing files show a tonal placeholder instead.
    images: ['/images/hero-1.jpg', '/images/hero-2.jpg', '/images/hero-3.jpg'],
  },
  about: {
    photo: '/images/alyssa.jpg',
    paragraphs: [
      'Design by Labillois is a Boston-based interior design studio led by Alyssa Labillois. The studio creates modern, livable spaces grounded in a warm, neutral palette: taupes, creams, and rich browns layered with natural materials and texture.',
      'Every project begins with listening. Alyssa believes a home should feel calm, personal, and effortless to live in, and she balances clean modern lines with softness and warmth so each room feels both elevated and welcoming.',
      'From full renovations to furnishing and styling, the studio guides clients through every detail with care, from the first concept to the final pillow.',
    ],
  },
}

export const instagramUrl = (handle) => `https://www.instagram.com/${handle}/`

// Portfolio projects. `slug` becomes the URL: /portfolio/<slug>
// `cover` is the grid thumbnail; `images` are shown on the project page.
// These are only used until the admin backend is connected.
// NOTE: these are placeholder projects — replace with Alyssa's real work.
export const defaultProjects = [
  {
    id: 'back-bay-brownstone',
    slug: 'back-bay-brownstone',
    published: true,
    name: 'Back Bay Brownstone',
    location: 'Boston, MA',
    scope: 'Full Renovation',
    description:
      'A historic brownstone reimagined with soft plaster walls, warm oak, and layered linen textures that honor the architecture while feeling entirely of the moment.',
    cover: '/images/projects/back-bay-brownstone/cover.jpg',
    images: [
      '/images/projects/back-bay-brownstone/1.jpg',
      '/images/projects/back-bay-brownstone/2.jpg',
      '/images/projects/back-bay-brownstone/3.jpg',
      '/images/projects/back-bay-brownstone/4.jpg',
    ],
  },
  {
    id: 'beacon-hill-residence',
    slug: 'beacon-hill-residence',
    published: true,
    name: 'Beacon Hill Residence',
    location: 'Boston, MA',
    scope: 'Furnishing & Styling',
    description:
      'Quiet luxury for a young family — sculptural lighting, tonal upholstery, and natural stone set against a palette of cream and walnut.',
    cover: '/images/projects/beacon-hill-residence/cover.jpg',
    images: [
      '/images/projects/beacon-hill-residence/1.jpg',
      '/images/projects/beacon-hill-residence/2.jpg',
      '/images/projects/beacon-hill-residence/3.jpg',
    ],
  },
  {
    id: 'south-end-loft',
    slug: 'south-end-loft',
    published: true,
    name: 'South End Loft',
    location: 'Boston, MA',
    scope: 'Interior Architecture',
    description:
      'Exposed brick and steel softened with boucle, travertine, and custom millwork for an open loft that feels warm and grounded.',
    cover: '/images/projects/south-end-loft/cover.jpg',
    images: [
      '/images/projects/south-end-loft/1.jpg',
      '/images/projects/south-end-loft/2.jpg',
      '/images/projects/south-end-loft/3.jpg',
    ],
  },
  {
    id: 'cape-cod-retreat',
    slug: 'cape-cod-retreat',
    published: true,
    name: 'Cape Cod Retreat',
    location: 'Chatham, MA',
    scope: 'New Construction',
    description:
      'A coastal getaway with washed oak floors, natural fibers, and an easy, sun-filled palette designed for slow summer days.',
    cover: '/images/projects/cape-cod-retreat/cover.jpg',
    images: [
      '/images/projects/cape-cod-retreat/1.jpg',
      '/images/projects/cape-cod-retreat/2.jpg',
      '/images/projects/cape-cod-retreat/3.jpg',
    ],
  },
  {
    id: 'wellesley-family-home',
    slug: 'wellesley-family-home',
    published: true,
    name: 'Wellesley Family Home',
    location: 'Wellesley, MA',
    scope: 'Full Home Design',
    description:
      'Livable elegance for a busy household — durable performance fabrics in soft taupes, warm wood tones, and spaces made for gathering.',
    cover: '/images/projects/wellesley-family-home/cover.jpg',
    images: [
      '/images/projects/wellesley-family-home/1.jpg',
      '/images/projects/wellesley-family-home/2.jpg',
      '/images/projects/wellesley-family-home/3.jpg',
    ],
  },
  {
    id: 'seaport-condo',
    slug: 'seaport-condo',
    published: true,
    name: 'Seaport Condo',
    location: 'Boston, MA',
    scope: 'Furnishing & Styling',
    description:
      'A modern high-rise softened with rounded silhouettes, tactile neutrals, and a curated mix of vintage and contemporary pieces.',
    cover: '/images/projects/seaport-condo/cover.jpg',
    images: [
      '/images/projects/seaport-condo/1.jpg',
      '/images/projects/seaport-condo/2.jpg',
      '/images/projects/seaport-condo/3.jpg',
    ],
  },
]
