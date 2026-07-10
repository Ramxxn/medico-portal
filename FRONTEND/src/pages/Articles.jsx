import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineSearch } from 'react-icons/hi'

const ARTICLES = [
  { id: 1, category: 'Ayurveda', title: 'Understanding Your Prakriti: The Foundation of Ayurvedic Health', excerpt: 'Discover how knowing your unique body constitution can transform your approach to diet, lifestyle, and natural healing.', author: 'Dr. Meera Sharma', date: 'Jan 15, 2025', readTime: '5 min read', featured: true },
  { id: 2, category: 'Yoga Therapy', title: '7 Yoga Poses That Naturally Relieve Chronic Back Pain', excerpt: 'Evidence-based yoga postures recommended by certified yoga therapists for managing and preventing lower back pain.', author: 'Yogi Arjun Patel', date: 'Jan 10, 2025', readTime: '4 min read', featured: true },
  { id: 3, category: 'Naturopathy', title: 'The Science Behind Intermittent Fasting in Naturopathic Medicine', excerpt: 'How naturopaths use structured fasting protocols to support detoxification, metabolic health, and cellular repair.', author: 'Dr. Priya Nair', date: 'Jan 5, 2025', readTime: '6 min read', featured: false },
  { id: 4, category: 'Mental Health', title: 'Mindfulness-Based Stress Reduction: A Practical Guide', excerpt: 'A step-by-step introduction to MBSR techniques that clinical psychologists use to help patients manage anxiety and stress.', author: 'Dr. Kavya Reddy', date: 'Dec 28, 2024', readTime: '7 min read', featured: false },
  { id: 5, category: 'Homeopathy', title: 'Homeopathy for Seasonal Allergies: What the Research Says', excerpt: 'An evidence-informed look at how homeopathic remedies are used to address seasonal allergic rhinitis and related conditions.', author: 'Dr. Suresh Kumar', date: 'Dec 20, 2024', readTime: '5 min read', featured: false },
  { id: 6, category: 'Physiotherapy', title: 'Post-Surgery Rehabilitation: A Physiotherapist\'s Roadmap', excerpt: 'What to expect during recovery and how physiotherapy accelerates healing after common orthopedic surgeries.', author: 'Dr. Anita Joshi', date: 'Dec 15, 2024', readTime: '8 min read', featured: false },
]

const CATEGORIES = ['All', 'Ayurveda', 'Yoga Therapy', 'Naturopathy', 'Mental Health', 'Homeopathy', 'Physiotherapy']

const Articles = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = ARTICLES.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = filtered.filter(a => a.featured)
  const rest = filtered.filter(a => !a.featured)

  return (
    <div className='page'>
      <nav className='text-xs text-text-muted mb-6 flex items-center gap-2'>
        <Link to='/' className='hover:text-primary transition-colors'>Home</Link>
        <span>/</span>
        <span className='text-text-secondary'>Articles</span>
      </nav>

      <div className='text-center mb-10'>
        <p className='section-label mb-2'>Knowledge Hub</p>
        <h1 className='text-4xl font-bold text-text-primary'>Articles & Insights</h1>
        <p className='mt-4 text-text-secondary max-w-xl mx-auto'>Expert-written articles on natural health, wellness practices, and holistic healing from our certified practitioners.</p>
      </div>

      {/* Search */}
      <div className='relative max-w-md mx-auto mb-8'>
        <HiOutlineSearch className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted' />
        <input type='text' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search articles...' className='input pl-10' />
      </div>

      {/* Category Filter */}
      <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-10 justify-center flex-wrap'>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 transition-colors ${
              activeCategory === cat ? 'bg-primary text-white' : 'border border-border text-text-secondary hover:border-primary hover:text-primary'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className='grid md:grid-cols-2 gap-5 mb-6'>
          {featured.map(a => (
            <div key={a.id} onClick={() => navigate(`/articles/${a.id}`)} className='card-hover cursor-pointer overflow-hidden'>
              <div className='bg-surface-2 h-40 flex items-center justify-center border-b border-border'>
                <span className='text-xs font-semibold text-text-muted uppercase tracking-wider'>Featured Article</span>
              </div>
              <div className='p-6'>
                <span className='badge-primary'>{a.category}</span>
                <h2 className='font-bold text-text-primary text-lg mt-3 mb-2 leading-tight'>{a.title}</h2>
                <p className='text-sm text-text-secondary leading-relaxed mb-4'>{a.excerpt}</p>
                <div className='flex items-center justify-between text-xs text-text-muted'>
                  <span>{a.author}</span>
                  <span className='flex items-center gap-1'>{a.date} · {a.readTime} <HiOutlineArrowRight className='w-3 h-3' /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rest */}
      {rest.length > 0 && (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {rest.map(a => (
            <div key={a.id} onClick={() => navigate(`/articles/${a.id}`)} className='card-hover cursor-pointer p-5'>
              <span className='badge-primary'>{a.category}</span>
              <h2 className='font-semibold text-text-primary mt-3 mb-2 text-sm leading-snug'>{a.title}</h2>
              <p className='text-xs text-text-secondary leading-relaxed mb-4 line-clamp-2'>{a.excerpt}</p>
              <div className='flex items-center justify-between text-xs text-text-muted'>
                <span>{a.author}</span>
                <span>{a.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className='card text-center py-20'>
          <HiOutlineSearch className='w-10 h-10 text-text-muted mx-auto mb-3' />
          <p className='text-text-secondary font-medium'>No articles found</p>
          <button onClick={() => { setSearch(''); setActiveCategory('All') }} className='mt-3 text-primary text-sm underline'>Clear filters</button>
        </div>
      )}
    </div>
  )
}

export default Articles
