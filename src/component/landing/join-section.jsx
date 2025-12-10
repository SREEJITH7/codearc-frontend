import { Link } from "react-router-dom"


export default function JoinSection() {
  return (
    <section id="join" className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Path</span>
          </h2>
          <p className="text-xl text-gray-400">Join CodeArc as a learner or connect with top talent as a recruiter</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Developer Card */}
          <div className="relative group card-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 md:p-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  ></path>
                </svg>
              </div>

              <h3 className="text-3xl font-bold mb-4">For Developers</h3>
              <p className="text-gray-400 mb-8 text-lg">
                Master algorithms, build your portfolio, get AI-powered guidance, and land your dream job.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "2000+ coding challenges",
                  "AI tutor for personalized help",
                  "Direct access to recruiters",
                  "Interview preparation tools",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              {/* <a
                href="/signup/user"
                className="block w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl text-center text-lg transition-all glow-button"
              >
                Join as Developer
              </a> */}

              <Link
              to="/user/signup"
            className="block w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl text-center text-lg transition-all glow-button"
              >
              Join as Developer
              </Link>


            </div>
          </div>

          {/* Recruiter Card */}
          <div className="relative group card-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 md:p-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>

              <h3 className="text-3xl font-bold mb-4">For Recruiters</h3>
              <p className="text-gray-400 mb-8 text-lg">
                Find pre-vetted talent, review coding portfolios, and hire developers who've proven their skills.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Access verified developer profiles",
                  "Review coding challenge solutions",
                  "Post job openings instantly",
                  "Smart candidate matching",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

            <Link
            to="/recruiter/signup"
                className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl text-center text-lg transition-all glow-button"
            >
                Join as Recruiter
            </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}