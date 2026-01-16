import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";

export const metadata = {
  title: "Terms of Service - CGAZ",
  description: "Terms of service for the Cashew Growers Association of Zambia website.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Hero
        title="Terms of Service"
        subtitle="Terms and conditions for using CGAZ services"
        height="small"
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-8 lg:p-12 bg-white">
            <div className="prose prose-lg prose-neutral max-w-none">
              <p className="text-neutral-600 mb-6">
                <strong>Last Updated:</strong> January 2025
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-neutral-600 mb-6">
                By accessing and using the Cashew Growers Association of Zambia (CGAZ) website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                2. Membership
              </h2>
              <p className="text-neutral-600 mb-4">
                CGAZ membership is open to all cashew farmers in Zambia. By becoming a member, you agree to:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
                <li>Provide accurate and complete registration information</li>
                <li>Pay applicable membership fees</li>
                <li>Abide by CGAZ rules and regulations</li>
                <li>Participate in democratic governance processes</li>
                <li>Support the association&apos;s mission and values</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                3. Training Programs
              </h2>
              <p className="text-neutral-600 mb-6">
                CGAZ offers various training programs for members. By registering for training, you agree that:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
                <li>Registration is subject to availability and approval</li>
                <li>Training fees, once paid, may not be refundable except in exceptional circumstances</li>
                <li>CGAZ may reschedule or cancel training due to unforeseen circumstances</li>
                <li>Certificates are awarded upon successful completion of training requirements</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                4. Use of Website
              </h2>
              <p className="text-neutral-600 mb-4">
                When using this website, you agree not to:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
                <li>Submit false or misleading information</li>
                <li>Use the website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of the website</li>
                <li>Copy, distribute, or modify any content without permission</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-neutral-600 mb-6">
                All content on this website, including text, images, logos, and documents, is the property of CGAZ or its licensors and is protected by copyright laws. You may not reproduce, distribute, or use any content without written permission.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-neutral-600 mb-6">
                CGAZ provides this website and its services &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from your use of our website or services, except where required by law.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                7. Changes to Terms
              </h2>
              <p className="text-neutral-600 mb-6">
                CGAZ reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to this website. Your continued use of our services constitutes acceptance of any modifications.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                8. Contact Us
              </h2>
              <p className="text-neutral-600 mb-6">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <p className="text-neutral-600">
                  <strong>CGAZ Head Office</strong><br />
                  Zambia Agriculture Research Institute, Room 09<br />
                  Next to Mongu Civic Centre<br />
                  P.O. Box 910067 Mongu<br />
                  Email: allanchinambu666@gmail.com<br />
                  Phone: +260 977 429 666
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
