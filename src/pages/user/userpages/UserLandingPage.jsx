
// import Navigation from "./landing/navigation"
// import Hero from "./landing/hero"
// import JoinSection from "./landing/join-section"
// import Features from "./landing/features"
// import Footer from "./landing/footer"

import Navigation from "../../../component/landing/navigation"
import Hero from "../../../component/landing/hero"
import JoinSection from "../../../component/landing/join-section"
import Features from "../../../component/landing/features"
import Footer from "../../../component/landing/footer"

export default function LandingPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#0a0118] text-white overflow-x-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute w-96 h-96 bg-purple-600 top-20 left-10 rounded-full blur-[80px] opacity-40"
          style={{ animation: "blob 20s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-blue-600 top-40 right-20 rounded-full blur-[80px] opacity-40"
          style={{ animation: "blob 20s ease-in-out infinite 2s" }}
        ></div>
        <div
          className="absolute w-72 h-72 bg-cyan-600 bottom-20 left-1/3 rounded-full blur-[80px] opacity-40"
          style={{ animation: "blob 20s ease-in-out infinite 4s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <JoinSection />
        <Features />
        <Footer />
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -50px) scale(1.1); }
          50% { transform: translate(-50px, 50px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #9fbad0ff 0%, #a2a6acff 50%, #05292fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glow-button {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
          transition: all 0.3s ease;
        }

        .glow-button:hover {
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
          transform: translateY(-2px);
        }

        .card-hover {
          transition: all 0.4s ease;
        }

        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(168, 85, 247, 0.3);
        }
      `}</style>
    </div>
  )
}
