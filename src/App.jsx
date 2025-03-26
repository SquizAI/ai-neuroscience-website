import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import EnhancedMarkdown from './components/EnhancedMarkdown'
import TestVisualizations from './components/TestVisualizations'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chart" element={<MermaidChart />} />
            <Route path="/articles/:articleId" element={<ArticleView />} />
            <Route path="/sections/:sectionId" element={<SectionView />} />
            <Route path="/test-visualizations" element={<TestVisualizations />} />
            <Route path="/book" element={<BookView />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <NavLink to="/" className="text-2xl font-bold text-primary-600">
              <span className="text-gray-900">Beyond</span>Scaling
            </NavLink>
          </div>
          <nav className="flex space-x-2">
            <NavLink to="/" 
              className={({isActive}) => isActive ? 'nav-link-active' : 'nav-link'}
              end
            >
              Home
            </NavLink>
            <NavLink to="/book" 
              className={({isActive}) => isActive ? 'nav-link-active' : 'nav-link'}
            >
              Interactive Book
            </NavLink>
            <NavLink to="/chart" 
              className={({isActive}) => isActive ? 'nav-link-active' : 'nav-link'}
            >
              Concept Map
            </NavLink>
            <NavLink to="/sections/scaling" 
              className={({isActive}) => isActive ? 'nav-link-active' : 'nav-link'}
            >
              Scaling
            </NavLink>
            <NavLink to="/test-visualizations" 
              className={({isActive}) => isActive ? 'nav-link-active' : 'nav-link'}
            >
              Test Viz
            </NavLink>
            <NavLink to="/sections/neuroscience" 
              className={({isActive}) => isActive ? 'nav-link-active' : 'nav-link'}
            >
              Neuroscience
            </NavLink>
            <NavLink to="/sections/practical" 
              className={({isActive}) => isActive ? 'nav-link-active' : 'nav-link'}
            >
              Applications
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}

function Home() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const inspirationalQuotes = [
    { text: "The brain is wider than the sky, for, put them side by side, the one the other will include with ease, and you beside.", author: "Emily Dickinson" },
    { text: "Understanding how the brain works will be the most important scientific discovery of the 21st century.", author: "Michio Kaku" },
    { text: "The goal of AI is not to replicate human intelligence, but to understand it—and then surpass it.", author: "Demis Hassabis" },
    { text: "Intelligence is not a single dimension, but a diverse array of information-processing capabilities.", author: "Howard Gardner" },
    { text: "The brain is a world consisting of a number of unexplored continents and great stretches of unknown territory.", author: "Santiago Ramón y Cajal" }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveQuote((prev) => (prev + 1) % inspirationalQuotes.length);
        setIsAnimating(false);
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-16 text-center"
      >
        {/* Hero Section with Dynamic Background */}
        <div className="relative overflow-hidden rounded-2xl mb-12 py-16 px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white shadow-xl">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-8 tracking-tight relative z-10"
            data-component-name="Home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="block">Beyond Scaling:</span>
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              Why AI Needs Neuroscience to Achieve True Intelligence
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-blue-100 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            An exploration of the limitations of the current scaling paradigm in AI and how neuroscience principles 
            offer a path to more genuine artificial intelligence.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/sections/scaling" className="inline-block px-8 py-3 bg-white text-blue-900 font-medium rounded-lg mr-4 shadow-lg hover:bg-blue-50 transition-colors duration-300">
              Start Exploring
            </Link>
            <Link to="/test-visualizations" className="inline-block px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-300">
              View Visualizations
            </Link>
          </motion.div>
        </div>
        
        {/* Animated Quote Section */}
        <motion.div 
          className="relative overflow-hidden bg-white border border-gray-200 p-8 rounded-xl shadow-sm max-w-3xl mx-auto my-12"
          animate={{ opacity: isAnimating ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <svg className="absolute top-4 left-4 h-10 w-10 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <div className="ml-16">
            <p className="text-2xl font-light text-gray-800 mb-4">"{inspirationalQuotes[activeQuote].text}"</p>
            <p className="text-right text-gray-500 font-medium">— {inspirationalQuotes[activeQuote].author}</p>
          </div>
        </motion.div>
      </motion.div>

      <section className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 inline-block relative">
            <span className="relative z-10">Explore Key Topics</span>
            <span className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100 transform -skew-x-12 -z-10"></span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Each section offers insights into a different aspect of the intersection between AI and neuroscience</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <ArticleCard 
            title="Scaling Limitations" 
            id="1_scaling_limitations"
            colorClass="from-red-500 to-orange-500"
            delay={0.1}
            description="Explore the theoretical and practical limits of the 'bigger is better' approach to AI." 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />
          <ArticleCard 
            title="Neuroscience Principles" 
            id="2_neuroscience_principles"
            colorClass="from-blue-500 to-indigo-500"
            delay={0.2}
            description="Discover how the Free Energy Principle and metastability provide frameworks for genuine intelligence." 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>}
          />
          <ArticleCard 
            title="Consciousness vs. Intelligence" 
            id="3_consciousness_vs_intelligence"
            colorClass="from-purple-500 to-pink-500"
            delay={0.3}
            description="Understanding the distinction between functional intelligence and subjective experience." 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
          />
          <ArticleCard 
            title="Prediction Mechanisms" 
            id="4_prediction_mechanisms"
            colorClass="from-green-500 to-teal-500"
            delay={0.4}
            description="How prediction works differently in AI systems versus the brain." 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          />
          <ArticleCard 
            title="Practical Recommendations" 
            id="5_practical_recommendations"
            colorClass="from-yellow-500 to-amber-500"
            delay={0.5}
            description="Concrete research directions and implementation strategies for neuroscience-informed AI." 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
          />
          <ArticleCard 
            title="References & Resources" 
            id="6_references_and_resources"
            colorClass="from-cyan-500 to-blue-500"
            delay={0.6}
            description="Key publications, researchers, and resources for further exploration." 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
          />
        </div>
      
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold mb-2">How to Navigate This Site</h3>
            <p className="text-gray-600">Use these tools to get the most out of your experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <motion.div 
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900">Home</h4>
                <p className="text-gray-600 mt-1">Return to this landing page for an overview of all content and the latest updates.</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900">Concept Map</h4>
                <p className="text-gray-600 mt-1">Explore relationships between key concepts in AI and neuroscience through an interactive visualization.</p>
              </div>
            </motion.div>
          <div className="flex items-start space-x-3">
            <div className="bg-scaling p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Scaling</h4>
              <p className="text-sm text-gray-600">Understand the limitations of the "bigger is better" approach in modern AI systems.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-neuroscience p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Neuroscience</h4>
              <p className="text-sm text-gray-600">Discover principles from neuroscience that could guide the next generation of AI systems.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-practical p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Applications</h4>
              <p className="text-sm text-gray-600">Explore concrete research directions and practical implementations of neuroscience-informed AI.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-primary-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Test Viz</h4>
              <p className="text-sm text-gray-600">View our interactive visualizations in one place to better understand complex concepts.</p>
            </div>
          </div>
        </div>
      </div>
      </section>

      <section className="mb-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-6 inline-block relative">
            <span className="relative z-10">Interactive Visualizations</span>
            <span className="absolute -bottom-2 left-0 right-0 h-3 bg-purple-100 transform -skew-x-12 -z-10"></span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Explore complex concepts through our interactive visual experiences</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm group hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">AI & Neuroscience Concept Map</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Explore the intricate relationships between AI and neuroscience concepts through our interactive diagram. Discover how these fields connect and influence each other.
              </p>
              <div className="relative overflow-hidden rounded-lg mb-6 h-40 bg-gray-100 group-hover:bg-gray-50 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-indigo-900/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 16C15 16.5523 15.4477 17 16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 19C13 19.5523 13.4477 20 14 20C14.5523 20 15 19.5523 15 19C15 18.4477 14.5523 18 14 18C13.4477 18 13 18.4477 13 19Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 19C17 19.5523 17.4477 20 18 20C18.5523 20 19 19.5523 19 19C19 18.4477 18.5523 18 18 18C17.4477 18 17 18.4477 17 19Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16C13 15.4477 13.4477 15 14 15C14.5523 15 15 15.4477 15 16" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 16C17 16.5523 17.4477 17 18 17C18.5523 17 19 16.5523 19 16" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18 18C18 17.4477 18.4477 17 19 17C19.5523 17 20 17.4477 20 18" />
                  </svg>
                </div>
              </div>
              <Link to="/chart" className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-sm">
                Explore Concept Map
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm group hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg text-white mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Test All Visualizations</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Experience all our interactive visualizations in one place, from scaling limitations to prediction mechanisms and consciousness-intelligence mappings.
              </p>
              <div className="relative overflow-hidden rounded-lg mb-6 h-40 bg-gray-100 group-hover:bg-gray-50 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <Link to="/test-visualizations" className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-sm">
                View All Visualizations
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function ArticleCard({ title, id, description, colorClass, delay, icon }) {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/articles/${id}`)}
    >
      <div className={`h-2 w-full bg-gradient-to-r ${colorClass}`}></div>
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClass} text-white mr-4`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
        <div className="mt-4 flex justify-end">
          <div className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
            Read more
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MermaidChart() {
  const [activeSection, setActiveSection] = useState('overview');
  
  // Define the sections of the concept map
  const sections = [
    { id: 'overview', title: 'Overview', icon: '🔍' },
    { id: 'scaling', title: 'Scaling Limitations', icon: '📈' },
    { id: 'neuroscience', title: 'Neuroscience Principles', icon: '🧠' },
    { id: 'applications', title: 'Practical Applications', icon: '⚙️' }
  ];
  
  // Content for each section
  const sectionContent = {
    overview: {
      title: 'AI and Neuroscience: A Conceptual Framework',
      description: 'This interactive map explores the intersection of artificial intelligence and neuroscience, highlighting how principles from the human brain can inform the next generation of AI systems.',
      image: '/chart.svg',
      points: [
        'Modern AI systems rely primarily on scaling parameters, data, and compute',
        'Neuroscience offers alternative principles for building intelligent systems',
        'The integration of these fields could lead to more efficient and capable AI'
      ]
    },
    scaling: {
      title: 'The Limitations of Scaling',
      description: 'While scaling has produced impressive results, it faces fundamental challenges that may prevent further progress toward artificial general intelligence.',
      image: '/scaling-diagram.png',
      points: [
        'Diminishing returns: Each doubling of model size yields smaller improvements',
        'Resource constraints: Training costs grow exponentially with model size',
        'Generalization issues: Larger models still struggle with novel scenarios',
        'Reasoning limitations: Scale alone does not solve fundamental reasoning problems'
      ]
    },
    neuroscience: {
      title: 'Key Neuroscience Principles',
      description: 'The human brain operates on fundamentally different principles than current AI systems, offering valuable insights for alternative approaches.',
      image: '/brain-principles.png',
      points: [
        'Predictive processing: The brain constantly generates and updates predictions',
        'Free energy principle: Intelligence aims to minimize prediction errors',
        'Hierarchical processing: Information flows through multiple levels of abstraction',
        'Embodied cognition: Intelligence emerges from interaction with the environment'
      ]
    },
    applications: {
      title: 'Practical Applications',
      description: 'Applying neuroscience principles to AI development could lead to systems that are more efficient, adaptable, and capable of human-like reasoning.',
      image: '/applications-diagram.png',
      points: [
        'Energy-efficient architectures inspired by neural circuits',
        'Predictive models that learn from fewer examples',
        'Systems that build causal models of their environment',
        'Approaches that integrate perception, action, and reasoning'
      ]
    }
  };
  
  // Interactive diagram code
  const mermaidCode = `
    graph TD
      A[AI Development] --> B[Current Scaling Approach]
      A --> C[Neuroscience-Informed Approach]
      
      B --> D[Larger Models]
      B --> E[More Data]
      B --> F[More Compute]
      
      C --> G[Predictive Processing]
      C --> H[Free Energy Principle]
      C --> I[Hierarchical Processing]
      
      D --> J[Limitations]
      E --> J
      F --> J
      
      G --> K[Benefits]
      H --> K
      I --> K
      
      J --> L[Future of AI]
      K --> L
  `;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header with Medium-style title */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI and Neuroscience</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A visual exploration of how brain science can transform artificial intelligence
        </p>
      </div>
      
      {/* Navigation tabs */}
      <div className="flex overflow-x-auto mb-8 border-b border-gray-200 pb-1">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center px-4 py-2 mr-4 font-medium text-sm transition-colors ${activeSection === section.id 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-gray-600 hover:text-gray-900'}`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.title}
          </button>
        ))}
      </div>
      
      {/* Active section content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {sectionContent[activeSection].title}
          </h2>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {sectionContent[activeSection].description}
          </p>
          
          {/* Medium-style image with caption */}
          <div className="mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              {activeSection === 'scaling' && (
                <object type="image/svg+xml" data="/scaling-diagram.svg" className="w-full h-auto rounded-md mb-2" style={{ maxHeight: '400px' }}>
                  Your browser does not support SVG
                </object>
              )}
              {activeSection === 'neuroscience' && (
                <object type="image/svg+xml" data="/brain-principles.svg" className="w-full h-auto rounded-md mb-2" style={{ maxHeight: '400px' }}>
                  Your browser does not support SVG
                </object>
              )}
              {activeSection === 'applications' && (
                <object type="image/svg+xml" data="/applications-diagram.svg" className="w-full h-auto rounded-md mb-2" style={{ maxHeight: '400px' }}>
                  Your browser does not support SVG
                </object>
              )}
              {activeSection === 'overview' && (
                <img 
                  src="/chart.svg" 
                  alt={`Diagram for ${sectionContent[activeSection].title}`}
                  className="w-full h-auto rounded-md mb-2"
                />
              )}
              <p className="text-sm text-gray-500 italic text-center">
                Figure: {sectionContent[activeSection].title} - Interactive diagram with clickable elements
              </p>
            </div>
          </div>
          
          {/* Key points with Medium-style formatting */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-4">Key Points</h3>
            <ul className="space-y-3">
              {sectionContent[activeSection].points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center mr-3 text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Interactive SVG diagram */}
          {activeSection === 'overview' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Interactive Concept Map</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <object type="image/svg+xml" data="/concept-map.svg" className="w-full h-auto" style={{ maxHeight: '500px' }}>
                    Your browser does not support SVG
                  </object>
                </div>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  This interactive diagram visualizes the relationships between AI approaches and neuroscience principles.
                  <br />
                  <a href="/sections/scaling" className="text-primary-600 hover:underline">Learn more about these concepts in our detailed sections</a>
                </p>
              </div>
            </div>
          )}
          
          {/* Call to action */}
          <div className="flex justify-center mt-8">
            <Link 
              to={`/sections/${activeSection === 'overview' ? 'scaling' : activeSection}`}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Explore {activeSection === 'overview' ? 'Scaling Limitations' : sectionContent[activeSection].title} in Depth
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Medium-style footnotes */}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">References & Further Reading</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>
            <a href="https://www.nature.com/articles/s41583-020-0277-4" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Predictive processing and the representation of meaning in the brain
            </a>
            <span className="block text-gray-500">Nature Reviews Neuroscience (2020)</span>
          </li>
          <li>
            <a href="https://arxiv.org/abs/2001.04451" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Scaling Laws for Neural Language Models
            </a>
            <span className="block text-gray-500">OpenAI (2020)</span>
          </li>
          <li>
            <a href="https://www.frontiersin.org/articles/10.3389/fpsyg.2018.02751" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
              The Free Energy Principle for Action and Perception: A Mathematical Review
            </a>
            <span className="block text-gray-500">Frontiers in Psychology (2018)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ArticleView({ articleId: propArticleId }) {
  const params = useParams();
  // Use the prop articleId if provided, otherwise use the one from URL params
  const articleId = propArticleId || params.articleId;
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log('ArticleView rendering with articleId:', articleId);
  
  // Map article IDs to titles
  const articleTitles = {
    '1_scaling_limitations': 'Scaling Limitations in AI: A Deeper Analysis',
    '2_neuroscience_principles': 'Neuroscience Principles for AI Development',
    '3_consciousness_vs_intelligence': 'Consciousness vs. Intelligence: Critical Distinctions',
    '4_prediction_mechanisms': 'Prediction Mechanisms: AI vs. Brain',
    '5_practical_recommendations': 'Practical Recommendations for Neuroscience-Informed AI Research',
    '6_references_and_resources': 'References and Resources',
    'draft_doc': 'Beyond Scaling: Why AI Needs Neuroscience to Achieve True Intelligence',
    'test-visualizations': 'Interactive Visualizations Test Page'
  };
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    setTitle(articleTitles[articleId] || 'Article Not Found');
    
    console.log('Attempting to load article:', articleId);
    
    // Fetch the markdown content from the file
    console.log(`Fetching markdown content for: ${articleId}.md`);
    fetch(`/${articleId}.md`)
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        if (!response.ok) {
          console.error(`Failed to load ${articleId}.md with status ${response.status}`);
          throw new Error(`Failed to load ${articleId}.md`);
        }
        return response.text();
      })
      .then(text => {
        console.log('Loaded markdown content:', text.substring(0, 200) + '...');
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading markdown:', err);
        setError(`Failed to load content for ${articleId}.md. Please make sure the file exists.`);
        setLoading(false);
      });
  }, [articleId]);
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="heading-1 mb-6">{title}</h1>
        <div className="card p-8">
          <div className="prose max-w-none">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse text-gray-400">Loading...</div>
              </div>
            ) : error ? (
              <div className="text-red-500 py-4">{error}</div>
            ) : (
              <div className="markdown-content">
                {/* Using EnhancedMarkdown to render the content with interactive visualizations */}
                <EnhancedMarkdown content={content} />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function SectionView() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChapter, setActiveChapter] = useState(0);
  
  // Define the main sections
  const sections = [
    { id: 'scaling', title: 'The Problem with Current AI', color: 'from-red-50 to-red-100', icon: '🔍' },
    { id: 'neuroscience', title: 'Neuroscience Principles', color: 'from-blue-50 to-blue-100', icon: '🧠' },
    { id: 'practical', title: 'Practical Applications', color: 'from-green-50 to-green-100', icon: '⚙️' },
  ];
  
  // Define chapters within each section
  const sectionChapters = {
    'scaling': [
      { id: 'scaling_intro', title: 'Introduction to Scaling Issues', file: 'scaling_intro.md' },
      { id: 'scaling_limitations', title: 'Limitations of Current Approaches', file: 'scaling_limitations.md' },
      { id: 'scaling_conclusion', title: 'Beyond Scaling', file: 'scaling_conclusion.md' },
      { id: 'overview', title: 'Conceptual Overview', file: 'overview.md' },
    ],
    'neuroscience': [
      { id: 'neuroscience_intro', title: 'Introduction to Neuroscience Principles', file: 'neuroscience_principles.md' },
      { id: 'consciousness_intelligence', title: 'Consciousness vs. Intelligence', file: 'consciousness_intelligence.md' },
      { id: 'prediction_mechanisms', title: 'Prediction Mechanisms', file: 'prediction_mechanisms.md' },
      { id: 'free_energy', title: 'Free Energy Principle', file: 'free_energy.md' },
    ],
    'practical': [
      { id: 'practical_intro', title: 'Practical Applications Overview', file: 'practical_applications.md' },
      { id: 'practical_recommendations', title: 'Research Recommendations', file: 'practical_recommendations.md' },
      { id: 'resources', title: 'References & Resources', file: 'resources.md' },
    ]
  };
  
  // Get current section and its chapters
  const currentSectionIndex = sections.findIndex(section => section.id === sectionId);
  const currentSection = sections[currentSectionIndex];
  const chapters = sectionChapters[sectionId] || [];
  const currentChapter = chapters[activeChapter] || {};
  
  // Get previous and next sections
  const prevSection = currentSectionIndex > 0 ? sections[currentSectionIndex - 1] : null;
  const nextSection = currentSectionIndex < sections.length - 1 ? sections[currentSectionIndex + 1] : null;
  
  // Get previous and next chapters
  const prevChapter = activeChapter > 0 ? chapters[activeChapter - 1] : null;
  const nextChapter = activeChapter < chapters.length - 1 ? chapters[activeChapter + 1] : null;
  
  // Handle navigation between chapters
  const goToChapter = (index) => {
    setActiveChapter(index);
    window.scrollTo(0, 0);
  };
  
  // Load chapter content
  useEffect(() => {
    if (!currentChapter.file) return;
    
    setLoading(true);
    fetch(`/${currentChapter.file}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load chapter: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading chapter:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [sectionId, activeChapter, currentChapter.file]);
  
  // Handle navigation to previous section's last chapter
  const goToPrevSection = () => {
    if (prevSection) {
      const prevSectionChapters = sectionChapters[prevSection.id] || [];
      navigate(`/sections/${prevSection.id}`);
      setActiveChapter(prevSectionChapters.length - 1);
    }
  };
  
  // Handle navigation to next section's first chapter
  const goToNextSection = () => {
    if (nextSection) {
      navigate(`/sections/${nextSection.id}`);
      setActiveChapter(0);
    }
  };

  if (!currentSection) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Section Not Found</h2>
          <p className="mb-4">The section you're looking for doesn't exist.</p>
          <Link to="/book" className="text-primary-600 hover:underline font-medium">
            Return to Book Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed sidebar navigation - inspired by OpenAI Academy */}
      <div className="w-72 bg-white shadow-lg fixed left-0 top-0 h-screen overflow-y-auto z-10 transition-all duration-300 transform lg:translate-x-0">
        <div className="sticky top-0 bg-white z-20 border-b border-gray-100 p-5">
          <Link 
            to="/book"
            className="flex items-center text-gray-600 hover:text-primary-600 mb-6 group transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Book Overview</span>
          </Link>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
            <span className="text-2xl mr-2">{currentSection.icon}</span>
            {currentSection.title}
          </h2>
          
          <div className="h-1 w-24 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full mb-4"></div>
        </div>
        
        <nav className="p-5 pt-3">
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">In This Section</h3>
            <div className="space-y-1">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => goToChapter(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${index === activeChapter 
                    ? 'bg-primary-50 text-primary-700 font-medium shadow-sm' 
                    : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-medium ${index === activeChapter ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-500'}`}>
                      {index + 1}
                    </div>
                    <span className="text-sm">{chapter.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Other Sections</h3>
            <div className="space-y-1">
              {sections.map((section, index) => (
                section.id !== sectionId && (
                  <Link 
                    key={section.id}
                    to={`/sections/${section.id}`}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{section.icon}</span>
                      <span className="text-sm">{section.title}</span>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>
        </nav>
      </div>
      
      {/* Mobile menu button - only visible on small screens */}
      <div className="fixed top-4 left-4 z-20 lg:hidden">
        <button 
          className="p-2 rounded-md bg-white shadow-md text-gray-700 hover:text-primary-600 transition-colors"
          onClick={() => document.querySelector('.sidebar').classList.toggle('-translate-x-full')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 lg:ml-72 transition-all duration-300">
        {/* Reading progress - fixed at top */}
        <div className="sticky top-0 z-10 bg-white bg-opacity-95 backdrop-blur-sm shadow-sm px-6 py-4 border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span className="font-medium">Chapter {activeChapter + 1} of {chapters.length}</span>
              <span>{Math.round(((activeChapter + 1) / chapters.length) * 100)}% complete</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="bg-primary-600 h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${((activeChapter + 1) / chapters.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Content container */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Chapter title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
            {currentChapter.title}
          </h1>
          
          {/* Chapter content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-md">
                <h2 className="text-xl font-bold mb-2">Error Loading Content</h2>
                <p>{error}</p>
              </div>
            ) : (
              <div className="p-8">
                <EnhancedMarkdown content={content} />
              </div>
            )}
          </div>
          
          {/* Chapter navigation */}
          <div className="flex justify-between mt-12 pt-6 border-t border-gray-200">
            {prevChapter ? (
              <button
                className="flex items-center px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow group"
                onClick={() => goToChapter(activeChapter - 1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500 mb-1">Previous</span>
                  <span className="font-medium">{prevChapter.title}</span>
                </div>
              </button>
            ) : prevSection ? (
              <button
                className="flex items-center px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow group"
                onClick={goToPrevSection}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500 mb-1">Previous Section</span>
                  <span className="font-medium">{prevSection.title}</span>
                </div>
              </button>
            ) : (
              <div></div>
            )}
            
            {nextChapter ? (
              <button
                className="flex items-center px-5 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-sm hover:shadow group"
                onClick={() => goToChapter(activeChapter + 1)}
              >
                <div className="flex flex-col items-end">
                  <span className="text-xs text-primary-200 mb-1">Next</span>
                  <span className="font-medium">{nextChapter.title}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            ) : nextSection ? (
              <button
                className="flex items-center px-5 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-sm hover:shadow group"
                onClick={goToNextSection}
              >
                <div className="flex flex-col items-end">
                  <span className="text-xs text-primary-200 mb-1">Next Section</span>
                  <span className="font-medium">{nextSection.title}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            ) : (
              <button
                className="flex items-center px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-sm hover:shadow group"
                onClick={() => navigate('/book')}
              >
                <div className="flex flex-col items-end mr-2">
                  <span className="text-xs text-green-200 mb-1">Complete!</span>
                  <span className="font-medium">Return to Book Overview</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>© 2025 Beyond Scaling Project. All content is for educational purposes.</p>
      </div>
    </footer>
  )
}

function BookView() {
  // Main sections in the narrative
  const sections = [
    { id: 'scaling', title: 'The Problem with Current AI', path: '/sections/scaling', color: 'from-red-50 to-red-100', icon: '🔍', description: 'Understand the limitations of current AI scaling approaches and why they fall short.' },
    { id: 'neuroscience', title: 'Neuroscience Principles', path: '/sections/neuroscience', color: 'from-blue-50 to-blue-100', icon: '🧠', description: 'Explore key principles from neuroscience that can inform better AI systems.' },
    { id: 'practical', title: 'Practical Applications', path: '/sections/practical', color: 'from-green-50 to-green-100', icon: '⚙️', description: 'Discover practical applications and recommendations for future AI development.' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Beyond Scaling: A Neuroscience Approach to AI</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          An interactive exploration of how neuroscience can transform artificial intelligence
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {sections.map((section, index) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`bg-gradient-to-br ${section.color} p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow`}
          >
            <div className="text-4xl mb-4">{section.icon}</div>
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-white text-gray-800 flex items-center justify-center font-bold text-sm mr-3">
                {index + 1}
              </div>
              <h2 className="text-xl font-bold">{section.title}</h2>
            </div>
            <p className="text-gray-700 mb-6 min-h-[80px]">
              {section.description}
            </p>
            <div className="mt-auto">
              <Link 
                to={section.path}
                className="w-full block text-center px-5 py-3 bg-white text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors border border-gray-300 shadow-sm"
              >
                Start Reading
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-10">
        <h2 className="text-2xl font-bold mb-4">How to Navigate This Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              Sequential Reading
            </h3>
            <p className="text-gray-600">
              For the best experience, start with section 1 and progress through each section in order. 
              Each chapter builds on concepts from previous ones.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Navigation Features
            </h3>
            <p className="text-gray-600">
              Within each section, you'll find navigation controls to move between sections, 
              a sidebar table of contents, and interactive elements to explore concepts in depth.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Link 
          to="/chart" 
          className="flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>
          View Complete Concept Map
        </Link>
      </div>
    </div>
  );
}



export default App
