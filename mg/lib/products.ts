export type Collection =
  | 'Signature'
  | 'Evening'
  | 'Heritage'
  | 'Limited Edition'
  | 'New Arrivals'

export type Product = {
  id: string
  slug: string
  name: string
  collection: Collection
  price: number
  material: string
  color: string
  colorHex: string
  colors: { name: string; hex: string }[]
  image: string
  hoverImage: string
  gallery: string[]
  badge?: 'New' | 'Bestseller' | 'Limited'
  availability: 'In Stock' | 'Made to Order' | 'Sold Out'
  description: string
  details: string[]
}

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'aurelia-top-handle',
    name: 'Aurelia Top Handle',
    collection: 'Signature',
    price: 3450,
    material: 'Calf Leather',
    color: 'Matte Black',
    colorHex: '#0A0A0A',
    colors: [
      { name: 'Matte Black', hex: '#0A0A0A' },
      { name: 'Champagne', hex: '#C9A86A' },
      { name: 'Ivory', hex: '#F9F7F3' },
    ],
    image: '/images/products/aurelia-black.png',
    hoverImage: '/images/products/aurelia-model.png',
    gallery: [
      '/images/products/aurelia-black.png',
      '/images/products/aurelia-model.png',
      '/images/craftsmanship.png',
    ],
    badge: 'Bestseller',
    availability: 'In Stock',
    description:
      'The Aurelia is the definitive MahaGauri silhouette — a structured top-handle carry-all finished with our signature champagne hardware. Hand-assembled over three days by a single artisan.',
    details: [
      'Structured calf leather body with reinforced base',
      'Champagne gold-plated hardware',
      'Suede-lined interior with zip pocket',
      'Detachable and adjustable shoulder strap',
    ],
  },
  {
    id: 'p2',
    slug: 'serena-shoulder',
    name: 'Serena Shoulder Bag',
    collection: 'Signature',
    price: 2890,
    material: 'Nappa Leather',
    color: 'Soft Beige',
    colorHex: '#E9E2D5',
    colors: [
      { name: 'Soft Beige', hex: '#E9E2D5' },
      { name: 'Matte Black', hex: '#0A0A0A' },
    ],
    image: '/images/products/serena-beige.png',
    hoverImage: '/images/products/serena-model.png',
    gallery: [
      '/images/products/serena-beige.png',
      '/images/products/serena-model.png',
    ],
    badge: 'Bestseller',
    availability: 'In Stock',
    description:
      'A softly slouched shoulder bag in buttery nappa leather. Effortless, unstructured, and made to be lived in.',
    details: [
      'Supple nappa leather',
      'Gold magnetic clasp',
      'Microfiber-lined interior',
      'Single shoulder strap with 22cm drop',
    ],
  },
  {
    id: 'p3',
    slug: 'celine-evening-clutch',
    name: 'Céleste Evening Clutch',
    collection: 'Evening',
    price: 1980,
    material: 'Satin & Leather',
    color: 'Dark Charcoal',
    colorHex: '#1C1C1C',
    colors: [
      { name: 'Dark Charcoal', hex: '#1C1C1C' },
      { name: 'Champagne', hex: '#C9A86A' },
    ],
    image: '/images/products/celine-clutch.png',
    hoverImage: '/images/collections/evening.png',
    gallery: [
      '/images/products/celine-clutch.png',
      '/images/collections/evening.png',
    ],
    badge: 'New',
    availability: 'In Stock',
    description:
      'An architectural envelope clutch in hand-pleated satin, finished with a fine gold chain that tucks away for a sculptural hold.',
    details: [
      'Hand-pleated satin over leather frame',
      'Removable fine gold chain',
      'Magnetic closure',
      'Fits essentials and a slim phone',
    ],
  },
  {
    id: 'p4',
    slug: 'mila-crossbody',
    name: 'Mila Quilted Crossbody',
    collection: 'New Arrivals',
    price: 2450,
    material: 'Quilted Lambskin',
    color: 'Ivory',
    colorHex: '#F9F7F3',
    colors: [
      { name: 'Ivory', hex: '#F9F7F3' },
      { name: 'Matte Black', hex: '#0A0A0A' },
      { name: 'Champagne', hex: '#C9A86A' },
    ],
    image: '/images/products/mila-crossbody.png',
    hoverImage: '/images/collections/signature.png',
    gallery: [
      '/images/products/mila-crossbody.png',
      '/images/collections/signature.png',
    ],
    badge: 'New',
    availability: 'In Stock',
    description:
      'A compact quilted crossbody with a convertible chain strap — worn long, doubled, or as a top handle.',
    details: [
      'Diamond-quilted lambskin',
      'Convertible gold chain strap',
      'Interior card slots',
      'Push-lock closure',
    ],
  },
  {
    id: 'p5',
    slug: 'isabella-tote',
    name: 'Isabella Shopper Tote',
    collection: 'Heritage',
    price: 3180,
    material: 'Vegetable-Tanned Leather',
    color: 'Cognac',
    colorHex: '#8B5A2B',
    colors: [
      { name: 'Cognac', hex: '#8B5A2B' },
      { name: 'Matte Black', hex: '#0A0A0A' },
    ],
    image: '/images/products/isabella-tote.png',
    hoverImage: '/images/collections/heritage.png',
    gallery: [
      '/images/products/isabella-tote.png',
      '/images/collections/heritage.png',
    ],
    badge: 'Bestseller',
    availability: 'Made to Order',
    description:
      'A generous everyday shopper in vegetable-tanned leather that develops a rich patina over time. Heritage craftsmanship, built to be inherited.',
    details: [
      'Vegetable-tanned full-grain leather',
      'Riveted rolled handles',
      'Unlined interior with slip pocket',
      'Develops a unique patina with wear',
    ],
  },
  {
    id: 'p6',
    slug: 'valentina-mini',
    name: 'Valentina Mini Box',
    collection: 'Limited Edition',
    price: 4200,
    material: 'Box Calf Leather',
    color: 'Matte Black',
    colorHex: '#0A0A0A',
    colors: [
      { name: 'Matte Black', hex: '#0A0A0A' },
      { name: 'Champagne', hex: '#C9A86A' },
    ],
    image: '/images/products/valentina-black.png',
    hoverImage: '/images/hero-bag.png',
    gallery: [
      '/images/products/valentina-black.png',
      '/images/hero-bag.png',
    ],
    badge: 'Limited',
    availability: 'Made to Order',
    description:
      'A jewel-like geometric box bag from our numbered Limited Edition. Only 200 pieces produced, each engraved with its individual number.',
    details: [
      'Rigid box calf leather construction',
      'Numbered edition of 200',
      'Sculpted gold top handle',
      'Presented in a lacquered keepsake box',
    ],
  },
]

export const collections: {
  name: Collection
  tagline: string
  image: string
}[] = [
  {
    name: 'Signature',
    tagline: 'The icons that define the house.',
    image: '/images/collections/signature.png',
  },
  {
    name: 'Evening',
    tagline: 'Sculptural pieces for after dark.',
    image: '/images/collections/evening.png',
  },
  {
    name: 'Heritage',
    tagline: 'Built to be inherited.',
    image: '/images/collections/heritage.png',
  },
]

export const materials = [
  'Calf Leather',
  'Nappa Leather',
  'Satin & Leather',
  'Quilted Lambskin',
  'Vegetable-Tanned Leather',
  'Box Calf Leather',
]

export const colorFilters = [
  { name: 'Matte Black', hex: '#0A0A0A' },
  { name: 'Ivory', hex: '#F9F7F3' },
  { name: 'Soft Beige', hex: '#E9E2D5' },
  { name: 'Champagne', hex: '#C9A86A' },
  { name: 'Cognac', hex: '#8B5A2B' },
  { name: 'Dark Charcoal', hex: '#1C1C1C' },
]

export const collectionNames: Collection[] = [
  'Signature',
  'Evening',
  'Heritage',
  'Limited Edition',
  'New Arrivals',
]

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}
