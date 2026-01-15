"use client";

import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { Button } from "@/components/shared/Button";
import {
  Trophy,
  TrendingUp,
  Users,
  MapPin,
  Quote,
  ArrowRight,
} from "lucide-react";

interface SuccessStory {
  name: string;
  location: string;
  memberSince: string;
  image: string;
  story: string;
  achievements: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  quote: string;
}

export default function SuccessStoriesPage() {
  const featuredStories: SuccessStory[] = [
    {
      name: "Daniel Tembo",
      location: "Choma District",
      memberSince: "2016",
      image: "/images/stories/daniel-tembo.jpg",
      story:
        "Daniel joined CGAZ in 2016 with just 2 hectares of poorly managed cashew trees. Through CGAZ training programs, he learned modern farming techniques and proper pest management. Today, he manages 8 hectares of productive cashew farms and has become a mentor to new farmers in his community.",
      achievements: [
        "Increased farm size from 2 to 8 hectares",
        "Tripled annual harvest through better practices",
        "Trained 50+ farmers as a CGAZ mentor",
        "Built new home and sent 3 children to university",
      ],
      metrics: [
        { label: "Income Increase", value: "320%" },
        { label: "Harvest Yield", value: "2.5 tons/ha" },
        { label: "Trees Planted", value: "1,200+" },
      ],
      quote:
        "CGAZ didn't just teach me how to farm better—they gave me a vision for what my farm could become. Today, I'm not just surviving, I'm thriving.",
    },
    {
      name: "Grace Mwale",
      location: "Livingstone District",
      memberSince: "2018",
      image: "/images/stories/grace-mwale.jpg",
      story:
        "As a widow with four children, Grace struggled to make ends meet with traditional farming. After joining CGAZ and attending training programs, she transformed her 3-hectare farm into a model of sustainable cashew production. She now employs 6 workers during harvest season and has started a cashew processing cooperative.",
      achievements: [
        "Started community cashew processing cooperative",
        "Created 6 permanent jobs in her community",
        "Won 2022 CGAZ Innovation Award",
        "Mentoring women farmers across 3 districts",
      ],
      metrics: [
        { label: "Annual Revenue", value: "ZMW 85,000" },
        { label: "Jobs Created", value: "6" },
        { label: "Women Trained", value: "120+" },
      ],
      quote:
        "CGAZ showed me that farming could be a real business, not just subsistence. Now I'm creating opportunities for other women in my community.",
    },
    {
      name: "Peter Banda",
      location: "Monze District",
      memberSince: "2014",
      image: "/images/stories/peter-banda.jpg",
      story:
        "Peter inherited a 5-hectare farm from his father but had no training in cashew farming. CGAZ's comprehensive training programs taught him everything from soil management to market access. He now exports premium cashews to international markets and has expanded to 15 hectares.",
      achievements: [
        "Achieved premium quality certification",
        "First farmer in district to export directly",
        "Expanded operations to 15 hectares",
        "Purchased processing equipment",
      ],
      metrics: [
        { label: "Export Revenue", value: "$12,000" },
        { label: "Quality Grade", value: "Premium A" },
        { label: "Farm Size", value: "15 ha" },
      ],
      quote:
        "The market connections CGAZ provided opened doors I didn't even know existed. I'm now selling directly to buyers in Europe.",
    },
  ];

  const quickWins = [
    {
      icon: TrendingUp,
      stat: "85%",
      label: "Average Income Increase",
      description: "Members report significant income growth within 2 years",
    },
    {
      icon: Users,
      stat: "15,000+",
      label: "Farmers Trained",
      description: "Members completed comprehensive training programs",
    },
    {
      icon: Trophy,
      stat: "500+",
      label: "Success Stories",
      description: "Documented transformations across all districts",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Success Stories"
        subtitle="Real farmers. Real results. Get inspired by the transformative journeys of CGAZ members."
        height="medium"
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379304/Womenbeneficiariesatthelaunchofthe2025_26plantingseason3_xmpfxh.jpg"
      />

      {/* Introduction */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            From Struggle to Success
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-6">
            Every CGAZ member has a unique story, but they all share one thing
            in common: a commitment to improving their farms and livelihoods.
            These stories showcase the real impact of quality training, market
            access, and community support.
          </p>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Whether you&apos;re just starting or looking to expand, these
            stories prove that transformation is possible with the right support
            and dedication.
          </p>
        </div>
      </section>

      {/* Quick Wins Stats */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickWins.map((item, index) => (
              <GlassCard
                key={index}
                className="p-8 bg-white shadow-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cashew-green/10 rounded-full mb-4">
                  <item.icon className="w-8 h-8 text-cashew-green" />
                </div>
                <div className="text-5xl font-bold text-cashew-green mb-2">
                  {item.stat}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {item.label}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Featured Success Stories
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Meet some of our most inspiring members who have transformed their
              farms and communities.
            </p>
          </div>

          <div className="space-y-12">
            {featuredStories.map((story, index) => (
              <GlassCard
                key={index}
                className="overflow-hidden bg-neutral-50 shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  {/* Image Section */}
                  <div className="lg:col-span-2 relative h-80 lg:h-auto">
                    <OptimizedImage
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-3xl font-bold mb-2">{story.name}</h3>
                      <div className="flex items-center gap-2 text-white/90 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{story.location}</span>
                      </div>
                      <div className="text-sm text-white/80">
                        Member since {story.memberSince}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:col-span-3 p-8 lg:p-10">
                    {/* Quote */}
                    <div className="mb-6 relative">
                      <Quote className="w-12 h-12 text-cashew-green/20 absolute -top-2 -left-2" />
                      <blockquote className="text-xl text-neutral-700 italic pl-8">
                        {story.quote}
                      </blockquote>
                    </div>

                    {/* Story */}
                    <p className="text-neutral-600 leading-relaxed mb-6">
                      {story.story}
                    </p>

                    {/* Key Achievements */}
                    <div className="mb-6">
                      <h4 className="font-bold text-neutral-900 mb-3">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-2">
                        {story.achievements.map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start gap-2 text-neutral-600"
                          >
                            <Trophy className="w-4 h-4 text-cashew-green flex-shrink-0 mt-1" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
                      {story.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center">
                          <div className="text-2xl font-bold text-cashew-green mb-1">
                            {metric.value}
                          </div>
                          <div className="text-xs text-neutral-600">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-900 to-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Hear From Our Members
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Watch video testimonials from farmers sharing their CGAZ journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((video) => (
              <GlassCard
                key={video}
                hoverable
                className="relative h-64 bg-neutral-800 border-white/10 overflow-hidden group cursor-pointer"
              >
                <OptimizedImage
                  src={`/images/video-thumb-${video}.jpg`}
                  alt={`Video testimonial ${video}`}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white font-semibold">
                    Success Story #{video}
                  </div>
                  <div className="text-white/80 text-sm">3:24</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-cashew-green to-cashew-dark-green rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Share Your Success Story
                </h2>
                <p className="text-lg text-white/90 mb-6 leading-relaxed">
                  Have you experienced transformation through CGAZ membership?
                  We&apos;d love to hear your story and share it with other
                  farmers to inspire them on their journey.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">
                      Inspire fellow farmers
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">
                      Get featured in our newsletter
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">
                      Win recognition awards
                    </span>
                  </li>
                </ul>
                <Button
                  variant="glass"
                  size="lg"
                  className="bg-white text-cashew-green hover:bg-neutral-100"
                  iconAfter={<ArrowRight className="w-5 h-5" />}
                >
                  Submit Your Story
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-64 h-64 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                  <Quote className="w-32 h-32 text-white/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            Your Success Story Starts Here
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            Join thousands of farmers who are transforming their livelihoods
            through CGAZ membership. Your journey to success begins today.
          </p>
          <Button variant="primary" size="lg">
            Become a CGAZ Member
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
