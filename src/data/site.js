// Central place for all site content. Edit text, contact info, and projects here.

export const site = {
  name: 'Design by Labillois',
  designer: 'Alyssa Labillois',
  title: 'Interior Designer',
  location: 'Boston, MA',
  email: 'alyssa@designbylabillois.com',
  phone: '617-721-8820',
  instagramHandle: 'designbylabillois',
  instagramUrl: 'https://www.instagram.com/designbylabillois/',
  tagline: 'Modern, warm interiors rooted in calm neutrals and considered detail.',
}

// Hero images on the home page. Drop photos into /public/images and list them here.
// Until real photos are added, a tonal placeholder is shown instead.
export const heroImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
]

// Portfolio projects. `slug` becomes the URL: /portfolio/<slug>
// `cover` is the grid thumbnail; `images` are shown on the project page.
// NOTE: these are placeholder projects — replace with Alyssa's real work.
export const projects = [
  {
    slug: 'back-bay-brownstone',
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
    slug: 'beacon-hill-residence',
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
    slug: 'south-end-loft',
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
    slug: 'cape-cod-retreat',
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
    slug: 'wellesley-family-home',
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
    slug: 'seaport-condo',
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
