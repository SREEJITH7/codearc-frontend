import {Link} from "react-router-dom"

export default function Hero() {
  return (
    <section className="px-6 py-20 md:py-32">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8 floating">
          <svg className="w-80 h-40 mx-auto" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              className="pulse-glow"
              stroke="url(#gradient)"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              d="M 50 75 C 50 25, 100 25, 150 75 C 200 125, 250 125, 250 75 C 250 25, 200 25, 150 75 C 100 125, 50 125, 50 75 Z"
            />
          </svg>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Master Code.
          <br />
          <span className="gradient-text">Arc Your Career.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
          The ultimate platform combining algorithmic challenges, AI-powered tutoring, and direct connections to top
          tech recruiters.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          {/* <a
            href="/signup"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-xl text-lg glow-button inline-block"
          >
            Get Started
          </a> */}
          
          <Link
  to="/user/signup"
  className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 
  hover:from-purple-600 hover:to-blue-600 text-white font-semibold 
  px-8 py-4 rounded-xl text-lg glow-button"
>
  Get Started
</Link>


          <button className="border-2 border-purple-500/50 hover:border-purple-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all">
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div>
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">10K+</div>
            <div className="text-gray-400 text-sm md:text-base">Active Users</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">500+</div>
            <div className="text-gray-400 text-sm md:text-base">Companies</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">2K+</div>
            <div className="text-gray-400 text-sm md:text-base">Problems</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">95%</div>
            <div className="text-gray-400 text-sm md:text-base">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
