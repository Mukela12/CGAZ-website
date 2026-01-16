import { Hero } from "@/components/shared/Hero";
import { Footer } from "@/components/shared/Footer";
import { GlassCard } from "@/components/shared/GlassCard";

export const metadata = {
  title: "Privacy Policy - CGAZ",
  description: "Privacy policy for the Cashew Growers Association of Zambia website.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Hero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
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
                1. Information We Collect
              </h2>
              <p className="text-neutral-600 mb-4">
                The Cashew Growers Association of Zambia (CGAZ) collects information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
                <li>Name, email address, and phone number when you register for training or contact us</li>
                <li>District and farming experience information for course registrations</li>
                <li>Payment information when you pay for membership or training</li>
                <li>Any additional information you choose to provide</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-neutral-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
                <li>Process your membership and training registrations</li>
                <li>Communicate with you about our programs and services</li>
                <li>Send you newsletters and updates (with your consent)</li>
                <li>Improve our services and develop new programs</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                3. Information Sharing
              </h2>
              <p className="text-neutral-600 mb-6">
                We do not sell or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
                <li>Partner organizations for project implementation purposes</li>
                <li>Government agencies when required by law</li>
                <li>Service providers who assist in our operations</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                4. Data Security
              </h2>
              <p className="text-neutral-600 mb-6">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                5. Your Rights
              </h2>
              <p className="text-neutral-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2 mb-6">
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                6. Contact Us
              </h2>
              <p className="text-neutral-600 mb-6">
                If you have any questions about this Privacy Policy, please contact us at:
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
