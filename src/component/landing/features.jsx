
export default function Features() {
  const features = [
    {
      title: "AI-Powered Learning",
      description: "Get instant feedback and personalized hints from our AI tutor to accelerate your learning.",
      icon: "lightbulb",
      color: "purple",
    },
    {
      title: "Real-Time Coding",
      description: "Practice in our advanced code editor with instant execution and detailed test cases.",
      icon: "zap",
      color: "blue",
    },
    {
      title: "Direct Hiring",
      description: "Connect directly with recruiters from top companies looking for talented developers.",
      icon: "users",
      color: "cyan",
    },
  ]

  const colorClasses = {
    purple: "bg-purple-500/20 text-purple-400 hover:border-purple-500/50",
    blue: "bg-blue-500/20 text-blue-400 hover:border-blue-500/50",
    cyan: "bg-cyan-500/20 text-cyan-400 hover:border-cyan-500/50",
  }

  const iconMap = {
    lightbulb:
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    zap: "M13 10V3L4 14h7v7l9-11h-7z",
    users:
      "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  }

  return (
    <section id="features" className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">CodeArc</span>?
          </h2>
          <p className="text-xl text-gray-400">Everything you need to master coding and advance your career</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 transition-all ${colorClasses[feature.color]}`}
            >
              <div
                className={`w-12 h-12 ${colorClasses[feature.color]} rounded-xl flex items-center justify-center mb-6`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconMap[feature.icon]}></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
