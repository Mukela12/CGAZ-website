"use client";

import { useState } from "react";
import { Hero } from "@/components/shared/Hero";
import { GlassCard } from "@/components/shared/GlassCard";
import { Button } from "@/components/shared/Button";
import { Footer } from "@/components/shared/Footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { submitContactForm } from "./actions";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitContactForm(formData);

    setIsSubmitting(false);

    if (result.success) {
      toast.success(result.message);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } else {
      toast.error(result.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Head Office",
      details: [
        "Zambia Agriculture Research Institute",
        "Room 09, Next to Mongu Civic Centre",
        "P.O. Box 910067 Mongu",
      ],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+260 977 429 666", "Mon-Fri: 8:00 AM - 5:00 PM"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["allanchinambu666@gmail.com", "info@cgaz.org.zm"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
    },
  ];

  const regionalOffices = [
    {
      name: "Mongu District",
      address: "ZARI, Room 09, Mongu",
      phone: "+260 977 429 666",
    },
    {
      name: "Limulunga District",
      address: "Limulunga CDC - 3,869 members",
      phone: "Contact Head Office",
    },
    {
      name: "Kalabo District",
      address: "Kalabo CDC - 2,520 members",
      phone: "Contact Head Office",
    },
    {
      name: "Senanga District",
      address: "Senanga CDC - 2,180 members",
      phone: "Contact Head Office",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Get in Touch"
        subtitle="Have questions or want to learn more about CGAZ? We're here to help. Reach out to us today."
        height="medium"
        backgroundImage="https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379296/ParticipantsAtTheNationalCashewConsultativeForumOnTheNationalCashewDevelopmentStrategy_NCDS_OrganisedByCGAZAndTheAgriculturalConsultativeForum_ACF_6_katljk.jpg"
        objectPosition="center 40%"
      />

      {/* Contact Info Cards */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <GlassCard
                key={index}
                className="p-6 bg-white border border-neutral-200 hover:border-cashew-green transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cashew-green/10 text-cashew-green mb-4">
                  <info.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-neutral-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-neutral-600 mb-8">
                Fill out the form below and our team will get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cashew-green focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cashew-green focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cashew-green focus:border-transparent transition-all"
                      placeholder="+260 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cashew-green focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="products">Product Information</option>
                    <option value="training">Training Programs</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cashew-green focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  iconAfter={<Send className="w-5 h-5" />}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Visit Our Office
              </h2>
              <p className="text-neutral-600 mb-8">
                Find us at our headquarters in Mongu, Western Province. We welcome
                visitors during business hours.
              </p>

              <GlassCard className="h-96 bg-neutral-200 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-cashew-green mx-auto mb-4" />
                  <p className="text-neutral-600 text-lg font-medium mb-2">
                    CGAZ Head Office
                  </p>
                  <p className="text-neutral-500 text-sm">
                    Zambia Agriculture Research Institute (ZARI)
                  </p>
                  <p className="text-neutral-500 text-sm">
                    Room 09, Next to Mongu Civic Centre
                  </p>
                  <p className="text-neutral-400 text-xs mt-4">
                    Mongu, Western Province, Zambia
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Offices */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              Regional Development Centers
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              CGAZ operates development centers across multiple districts to better
              serve our farming communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalOffices.map((office, index) => (
              <GlassCard
                key={index}
                className="p-6 bg-white border border-neutral-200 hover:border-cashew-green transition-colors"
              >
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  {office.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-cashew-green flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-600">{office.address}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-cashew-green flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-600">{office.phone}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-cashew-green to-cashew-dark-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Join CGAZ?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Become a member today and access training, resources, and market
            opportunities that will help your cashew farm thrive.
          </p>
          <Button
            variant="glass"
            size="lg"
            className="bg-white text-cashew-green hover:bg-white/90"
          >
            Membership Information
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
