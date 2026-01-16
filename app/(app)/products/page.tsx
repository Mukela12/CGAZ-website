"use client";

import { Hero } from "@/components/shared/Hero";
import { GlassCard } from "@/components/shared/GlassCard";
import { Button } from "@/components/shared/Button";
import { Footer } from "@/components/shared/Footer";
import { Package, Shield, Leaf, Award, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const products = [
    {
      icon: Package,
      title: "Raw Cashew Nuts",
      description:
        "Premium quality raw cashew nuts sourced directly from Zambian farmers. Perfect for processing, roasting, or wholesale distribution.",
      features: ["Grade A Quality", "Direct from Farms", "Bulk Available", "Export Ready"],
      color: "bg-cashew-brown",
    },
    {
      icon: Package,
      title: "Roasted Cashews",
      description:
        "Expertly roasted cashew nuts with a perfect crunch. Available in salted, unsalted, and flavored varieties for retail and wholesale.",
      features: ["Freshly Roasted", "Multiple Flavors", "Sealed Packaging", "Long Shelf Life"],
      color: "bg-cashew-green",
    },
    {
      icon: Package,
      title: "Cashew Oil",
      description:
        "Cold-pressed cashew oil rich in nutrients and flavor. Ideal for cooking, cosmetics, and health applications.",
      features: ["Cold Pressed", "100% Pure", "Rich in Vitamins", "Versatile Use"],
      color: "bg-zambia-copper",
    },
    {
      icon: Package,
      title: "Cashew Butter",
      description:
        "Smooth, creamy cashew butter made from premium roasted cashews. A nutritious and delicious alternative to traditional nut butters.",
      features: ["No Additives", "Rich Texture", "High Protein", "Natural Taste"],
      color: "bg-sky-blue",
    },
  ];

  const certifications = [
    {
      icon: Shield,
      title: "Quality Certified",
      description: "All products meet international quality standards",
    },
    {
      icon: Leaf,
      title: "Sustainably Sourced",
      description: "Environmentally responsible farming practices",
    },
    {
      icon: Award,
      title: "Export Approved",
      description: "Certified for international markets",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Our Products"
        subtitle="Premium cashew products from Zambia's finest farmers, meeting international quality standards."
        height="medium"
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379294/WomenWorkingInACashewProcessingFactoryInMongu19_orkqwl.jpg"
        objectPosition="center 20%"
      />

      {/* Products Grid */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Premium Cashew Products
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Discover our range of high-quality cashew products, all sourced from
              Zambian farmers and processed to meet the highest standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <GlassCard
                key={index}
                hoverable
                className="p-8 bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${product.color} text-white mb-6`}
                >
                  <product.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                  {product.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <div className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-cashew-green flex-shrink-0" />
                      <span className="text-sm text-neutral-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Quality You Can Trust
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our products are certified and meet international standards for quality,
              sustainability, and safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cashew-green/10 text-cashew-green mb-4">
                  <cert.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {cert.title}
                </h3>
                <p className="text-neutral-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Specifications */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Product Specifications
            </h2>
            <p className="text-lg text-neutral-600">
              All products are available in various packaging sizes and quantities to
              meet your business needs.
            </p>
          </div>

          <GlassCard className="p-8 bg-white">
            <div className="space-y-6">
              <div className="border-b border-neutral-200 pb-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Packaging Options
                </h3>
                <p className="text-neutral-600">
                  Retail packs (100g, 250g, 500g), Bulk bags (5kg, 10kg, 25kg),
                  Custom packaging available for wholesale orders
                </p>
              </div>
              <div className="border-b border-neutral-200 pb-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Minimum Order Quantity
                </h3>
                <p className="text-neutral-600">
                  Retail: No minimum | Wholesale: 100kg | Export: Contact for details
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Delivery & Shipping
                </h3>
                <p className="text-neutral-600">
                  Local delivery within Zambia, international shipping available,
                  export documentation provided
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cashew-green to-cashew-dark-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Interested in Our Products?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Contact us for pricing, samples, or to discuss your wholesale and export
            needs. We&apos;re ready to supply premium cashew products to your business.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button
                variant="glass"
                size="lg"
                iconAfter={<ArrowRight className="w-5 h-5" />}
                className="bg-white text-cashew-green hover:bg-white/90"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
