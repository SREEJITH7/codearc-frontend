export default function Navigation() {
  return (
    <nav className="px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold">CA</span>
          </div>
          <span className="text-2xl font-bold gradient-text">CodeArc</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition">
            How It Works
          </a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition">
            Pricing
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            Login
          </a>
        </div>
      </div>
    </nav>
  )
}