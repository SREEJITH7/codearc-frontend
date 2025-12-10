export default function Footer() {
  return (
    <footer className="px-6 py-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto text-center text-gray-400">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-lg font-bold text-white">CA</span>
          </div>
          <span className="text-xl font-bold gradient-text">CodeArc</span>
        </div>
        <p className="mb-4">© 2025 CodeArc. All rights reserved.</p>
        <div className="flex items-center justify-center space-x-6">
          <a href="#" className="hover:text-white transition">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}