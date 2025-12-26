

// // -----------------------------------------------------------------

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { RecruiterNav } from "@/components/recruiter-nav"
// import { Briefcase, Calendar, Users, TrendingUp, ArrowRight, Search, Target } from "lucide-react"

// export default function RecruiterPortal() {
//   return (
//     <div className="min-h-screen bg-background">
//       <RecruiterNav />

//       <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
//         {/* Hero Section */}
//         <div className="mb-16">
//           <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
//             Find Top Tech Talent{" "}
//             <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
//               Faster Than Ever
//             </span>
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
//             AlgoNest streamlines your recruitment process with intelligent matching, automated workflows, and
//             data-driven insights to help you hire the best developers.
//           </p>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
//           <Card className="border-border bg-card/50 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
//                   <Users className="size-5 text-primary" />
//                 </div>
//                 <span className="text-3xl font-bold">2.4K+</span>
//               </div>
//               <p className="text-sm text-muted-foreground">Active Candidates</p>
//             </CardContent>
//           </Card>

//           <Card className="border-border bg-card/50 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center">
//                   <Target className="size-5 text-accent" />
//                 </div>
//                 <span className="text-3xl font-bold">89%</span>
//               </div>
//               <p className="text-sm text-muted-foreground">Match Accuracy</p>
//             </CardContent>
//           </Card>

//           <Card className="border-border bg-card/50 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
//                   <TrendingUp className="size-5 text-primary" />
//                 </div>
//                 <span className="text-3xl font-bold">12 Days</span>
//               </div>
//               <p className="text-sm text-muted-foreground">Avg Time to Hire</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Action Cards */}
//         <div className="grid lg:grid-cols-2 gap-8">
//           <Card className="border-border bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all group">
//             <CardContent className="p-8">
//               <div className="size-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//                 <Briefcase className="size-7 text-primary" />
//               </div>

//               <h3 className="text-2xl font-bold mb-3">Post a New Job</h3>
//               <p className="text-muted-foreground mb-6 leading-relaxed">
//                 Create detailed job postings with skill requirements, experience levels, and compensation ranges to
//                 attract qualified candidates.
//               </p>

//               <Link href="/recruiter/jobpost">
//                 <Button size="lg" className="group/btn">
//                   Get Started
//                   <ArrowRight className="ml-2 size-4 group-hover/btn:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>

//           <Card className="border-border bg-gradient-to-br from-accent/5 to-accent/10 hover:shadow-lg hover:shadow-accent/20 transition-all group">
//             <CardContent className="p-8">
//               <div className="size-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//                 <Search className="size-7 text-accent" />
//               </div>

//               <h3 className="text-2xl font-bold mb-3">Browse Candidates</h3>
//               <p className="text-muted-foreground mb-6 leading-relaxed">
//                 Search our talent pool with advanced filters for skills, experience, location, and availability to find
//                 your perfect match.
//               </p>

//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="group/btn border-accent/50 hover:bg-accent/10 hover:border-accent bg-transparent"
//               >
//                 Explore Talent
//                 <ArrowRight className="ml-2 size-4 group-hover/btn:translate-x-1 transition-transform" />
//               </Button>
//             </CardContent>
//           </Card>

//           <Card className="border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all group">
//             <CardContent className="p-8">
//               <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//                 <Calendar className="size-7 text-primary" />
//               </div>

//               <h3 className="text-2xl font-bold mb-3">Schedule Interviews</h3>
//               <p className="text-muted-foreground mb-6 leading-relaxed">
//                 Coordinate interviews seamlessly with automated scheduling, calendar sync, and candidate communication
//                 tools.
//               </p>

//               <Button size="lg" variant="secondary" className="group/btn">
//                 View Calendar
//                 <ArrowRight className="ml-2 size-4 group-hover/btn:translate-x-1 transition-transform" />
//               </Button>
//             </CardContent>
//           </Card>

//           <Card className="border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all group">
//             <CardContent className="p-8">
//               <div className="size-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//                 <TrendingUp className="size-7 text-accent" />
//               </div>

//               <h3 className="text-2xl font-bold mb-3">Analytics & Insights</h3>
//               <p className="text-muted-foreground mb-6 leading-relaxed">
//                 Track recruitment metrics, candidate pipeline health, and team performance with comprehensive analytics
//                 dashboards.
//               </p>

//               <Button size="lg" variant="secondary" className="group/btn">
//                 View Reports
//                 <ArrowRight className="ml-2 size-4 group-hover/btn:translate-x-1 transition-transform" />
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }


import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  Users,
  TrendingUp,
  ArrowRight,
  Search,
  Target,
} from "lucide-react";
import RecruiterLayout from "../../../layouts/RecruiterLayout";

export default function RecruiterPortalPage() {
  return (
    <RecruiterLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Top Tech Talent{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Faster Than Ever
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            AlgoNest streamlines your recruitment process with intelligent
            matching, automated workflows, and data-driven insights.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <Stat icon={<Users />} value="2.4K+" label="Active Candidates" />
          <Stat icon={<Target />} value="89%" label="Match Accuracy" />
          <Stat icon={<TrendingUp />} value="12 Days" label="Avg Time to Hire" />
        </div>

        {/* Action Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          <ActionCard
            icon={<Briefcase />}
            title="Post a New Job"
            desc="Create detailed job postings with skills, experience, and salary ranges."
            to="/recruiter/jobpost"
            gradient="from-primary/5 to-primary/10"
            iconBg="bg-primary/20"
            iconColor="text-primary"
          />

          <ActionCard
            icon={<Search />}
            title="Browse Candidates"
            desc="Search candidates using advanced filters for skills and experience."
            to="/recruiter/candidates"
            gradient="from-accent/5 to-accent/10"
            iconBg="bg-accent/20"
            iconColor="text-accent"
          />

          <ActionCard
            icon={<Calendar />}
            title="Schedule Interviews"
            desc="Coordinate interviews with smart scheduling tools."
            to="/recruiter/interview"
            iconBg="bg-primary/10"
            iconColor="text-primary"
          />

          <ActionCard
            icon={<TrendingUp />}
            title="Analytics & Insights"
            desc="Track hiring metrics and pipeline performance."
            to="/recruiter/analytics"
            iconBg="bg-accent/10"
            iconColor="text-accent"
          />
        </div>
      </div>
    </RecruiterLayout>
  );
}

/* ---------------- Components ---------------- */

function Stat({ icon, value, label }) {
  return (
    <div className="rounded-xl border bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  desc,
  to,
  gradient = "from-card to-card/50",
  iconBg,
  iconColor,
}) {
  return (
    <Link
      to={to}
      className={`group rounded-xl border bg-gradient-to-br ${gradient}
      hover:shadow-lg transition-all`}
    >
      <div className="p-8">
        <div
          className={`size-14 rounded-xl ${iconBg}
          flex items-center justify-center mb-6
          group-hover:scale-110 transition-transform ${iconColor}`}
        >
          {icon}
        </div>

        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6">{desc}</p>

        <span className="inline-flex items-center gap-2 text-primary font-medium">
          Get Started
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
