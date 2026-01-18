import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Search, 
  ArrowRight, 
  Calendar, 
  User,
  Clock,
  ChevronRight,
  Tag
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  featured: boolean
}

const BlogPage = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const postsRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-hero-content',
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      gsap.fromTo('.blog-card',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: postsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
    
    return () => ctx.revert()
  }, [])
  
  const categories = [
    'all',
    'transport-tips',
    'mercedes-benz',
    'market-insights',
    'international',
    'classic-cars'
  ]
  
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '5 Essential Tips for Shipping Your Classic Mercedes-Benz Safely',
      excerpt: 'Transporting a classic Mercedes-Benz requires special attention and expertise. Learn the key considerations to ensure your investment arrives in pristine condition.',
      category: 'transport-tips',
      author: 'James Mitchell',
      date: 'Jan 15, 2024',
      readTime: '6 min read',
      image: '/images/blog-classic.jpg',
      featured: true
    },
    {
      id: '2',
      title: 'International Vehicle Transport: What You Need to Know',
      excerpt: 'Shipping your Mercedes-Benz across borders involves complex documentation and regulations. Here\'s everything you need to understand before booking.',
      category: 'international',
      author: 'Sarah Chen',
      date: 'Jan 12, 2024',
      readTime: '8 min read',
      image: '/images/blog-transport.jpg',
      featured: false
    },
    {
      id: '3',
      title: 'Enclosed vs. Open Transport: Making the Right Choice',
      excerpt: 'Understanding the key differences between enclosed and open transport can save you money while ensuring your vehicle receives appropriate protection.',
      category: 'transport-tips',
      author: 'Michael Torres',
      date: 'Jan 8, 2024',
      readTime: '5 min read',
      image: '/images/blog-enclosed.jpg',
      featured: false
    },
    {
      id: '4',
      title: '2024 Mercedes-Benz Market Outlook: Investment Perspective',
      excerpt: 'An in-depth analysis of the Mercedes-Benz collector market and transport considerations for high-value acquisitions in the coming year.',
      category: 'market-insights',
      author: 'Emily Watson',
      date: 'Jan 5, 2024',
      readTime: '10 min read',
      image: '/images/hero-car.jpg',
      featured: false
    },
    {
      id: '5',
      title: 'Preparing Your Vehicle for Winter Transport',
      excerpt: 'Cold weather poses unique challenges for vehicle transport. Learn how to prepare your Mercedes-Benz for safe shipping during winter months.',
      category: 'transport-tips',
      author: 'David Park',
      date: 'Dec 28, 2023',
      readTime: '4 min read',
      image: '/images/features-car.jpg',
      featured: false
    },
    {
      id: '6',
      title: 'The Rise of Electric Mercedes: Transport Considerations',
      excerpt: 'As Mercedes-Benz expands its electric lineup, new transport considerations emerge. Here\'s what owners of EQ models need to know.',
      category: 'mercedes-benz',
      author: 'Lisa Anderson',
      date: 'Dec 22, 2023',
      readTime: '7 min read',
      image: '/images/cta-car.jpg',
      featured: false
    }
  ]
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  const featuredPost = blogPosts.find(post => post.featured)
  
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-polaron-crimson/10 to-black" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
              Insights & News
            </span>
            <h1 className="blog-hero-content text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              Latest from
              <span className="text-polaron-crimson"> Polaron</span>
            </h1>
            <p className="blog-hero-content text-lg text-white/70 leading-relaxed">
              Expert insights on vehicle transport, Mercedes-Benz collecting, 
              and industry trends from our team of specialists.
            </p>
          </div>
        </div>
      </section>
      
      {/* Search & Filter Section */}
      <section className="py-12 relative overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-polaron-crimson text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {category === 'all' ? 'All' : category.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Post */}
      {featuredPost && selectedCategory === 'all' && !searchQuery && (
        <section className="py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10">
              <div className="grid lg:grid-cols-2">
                <div className="aspect-[16/10] lg:aspect-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-polaron-crimson/20 text-polaron-crimson text-xs font-medium rounded-full">
                      Featured
                    </span>
                    <span className="flex items-center gap-1 text-white/50 text-xs">
                      <Tag size={12} />
                      {featuredPost.category.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-2 text-polaron-crimson font-medium hover:gap-3 transition-all">
                    Read Article
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Blog Posts Grid */}
      <section ref={postsRef} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <>
              {searchQuery || selectedCategory !== 'all' ? (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-white">
                    {searchQuery ? `Search results for "${searchQuery}"` : 
                     selectedCategory !== 'all' ? 
                     selectedCategory.split('-').map(word => 
                       word.charAt(0).toUpperCase() + word.slice(1)
                     ).join(' ') : 'All Articles'}
                  </h2>
                  <p className="text-white/60 mt-2">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              ) : (
                <h2 className="text-2xl font-semibold text-white mb-8">Recent Articles</h2>
              )}
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.filter(post => !post.featured || (searchQuery || selectedCategory !== 'all')).map((post) => (
                  <article
                    key={post.id}
                    className="blog-card group rounded-xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-polaron-crimson/30 transition-all duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded">
                          {post.category.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </span>
                        <span className="text-white/40 text-xs">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-polaron-crimson transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <Calendar size={12} />
                          {post.date}
                        </div>
                        <button className="flex items-center gap-1 text-polaron-crimson text-sm font-medium group-hover:gap-2 transition-all">
                          Read
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* Load More */}
              <div className="text-center mt-12">
                <button className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white font-medium rounded hover:bg-white/5 transition-all duration-300">
                  Load More Articles
                  <ArrowRight size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Search size={48} className="mx-auto text-white/30 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Articles Found</h3>
              <p className="text-white/60">
                {searchQuery ? `No articles found for "${searchQuery}"` : 'No articles in this category'}
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-24 relative overflow-hidden border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-polaron-crimson/10 to-black border border-polaron-crimson/20 p-12">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }} />
            </div>
            
            <div className="relative">
              <h2 className="text-3xl font-semibold text-white mb-4">
                Stay Informed
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                Subscribe to our newsletter for the latest transport tips, 
                market insights, and exclusive member content.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
                <button className="px-8 py-3 bg-polaron-crimson text-white font-medium rounded hover:bg-polaron-crimson/90 transition-all duration-300">
                  Subscribe
                </button>
              </form>
              <p className="text-white/40 text-sm mt-4">
                Join 2,000+ subscribers. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
