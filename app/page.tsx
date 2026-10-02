import { BottomCta } from "@/components/homepage/BottomCta";
import { FeatureSplit } from "@/components/homepage/FeatureSplit";
import { Hero } from "@/components/homepage/Hero";
import { Testimonial } from "@/components/homepage/Testimonial";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const findJobsPoints = [
  {
    heading: "Find jobs that actually fit",
    body: "Search by title and location or paste a job link. Get matched roles you can actually score.",
  },
  {
    heading: "Know the Company Before You Apply",
    body: "Stop guessing what a company is about. JobPilot browses their pages and gives you everything you need.",
  },
  {
    heading: "Keep track of every application",
    body: "Keep a clear view of every job you've found, tailored, and researched. Your activity and progress all stay in one simple place.",
  },
];

const confidencePoints = [
  {
    heading: "Understand your match score",
    body: "See how your profile lines up with each role before you apply. Get a clear breakdown of what fits and what is missing.",
  },
  {
    heading: "AI Powered Job Matching",
    body: "Stop guessing which jobs are worth applying to. JobPilot scores every role against your actual skills so you focus on the ones that matter.",
  },
  {
    heading: "Focus on the right roles",
    body: "Filter out low fit jobs and stay on the ones that actually matter. Spend less time sorting and more time applying.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 py-6">
        <Hero />
        <FeatureSplit
          title="Manage Your Job Search With Ease"
          points={findJobsPoints}
          imageSrc="/images/jobs-lists.png"
          imageAlt="Jobs list preview"
        />
        <FeatureSplit
          title="Apply With More Confidence, Every Time"
          points={confidencePoints}
          imageSrc="/images/agnet-log.png"
          imageAlt="JobPilot agent activity logs"
          imageOnLeft
        />
        <Testimonial />
        <BottomCta />
      </main>
      <Footer />
    </div>
  );
}