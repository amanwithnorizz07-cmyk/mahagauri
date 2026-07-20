import { Hero } from '@/components/home/hero'
import { FeaturedCollections } from '@/components/home/featured-collections'
import { BestSellers } from '@/components/home/best-sellers'
import { BrandStory } from '@/components/home/brand-story'
import { Craftsmanship } from '@/components/home/craftsmanship'
import { Testimonials } from '@/components/home/testimonials'
import { InstagramGallery } from '@/components/home/instagram-gallery'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <BestSellers />
      <BrandStory />
      <Craftsmanship />
      <Testimonials />
      <InstagramGallery />
    </>
  )
}
