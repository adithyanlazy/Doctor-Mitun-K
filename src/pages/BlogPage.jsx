import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import Reveal from '../components/ui/Reveal'
import { ArrowUpRight } from 'lucide-react'
import { blogPosts } from '../lib/data'

function Card({ post, featured }) {
  return (
    <article
      className={`card-cream group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_30px_60px_-30px_rgba(20,17,15,0.3)] ${
        featured ? 'md:flex-row' : ''
      }`}
    >
      <div className={`overflow-hidden ${featured ? 'md:w-1/2' : ''}`}>
        <img
          src={post.image}
          alt=""
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            featured ? 'h-56 md:h-full' : 'h-52'
          }`}
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3 text-xs">
          <span className="eyebrow rounded-full bg-emerald/10 px-3 py-1 text-emerald-600">
            {post.category}
          </span>
          <span className="text-ink/45">
            {post.date} · {post.read}
          </span>
        </div>
        <h3 className="font-display text-ink mt-4 text-xl leading-snug">{post.title}</h3>
        <p className="text-ink/60 mt-3 flex-1 text-sm leading-relaxed">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-deep">
          Read article
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  )
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        crumb="Blog"
        eyebrow="Notes & guides"
        title="Straight talk on"
        titleEm="straight teeth."
        sub="Educational articles on braces, aligners, early treatment and oral health — written to help you make a well-informed choice, not to sell you one."
      />
      <section className="bg-cream section">
        <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal
              key={post.title}
              delay={(i % 3) * 0.08}
              className={i === 0 ? 'md:col-span-2 lg:col-span-3' : ''}
            >
              <Card post={post} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  )
}
