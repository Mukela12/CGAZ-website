export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-cashew-green mb-6">
            Cashew Growers Association of Zambia
          </h1>
          <p className="text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto mb-8">
            Empowering 22,490 cashew farmers across Zambia through sustainable
            agricultural practices, training programs, and community development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#about"
              className="px-8 py-3 bg-cashew-green text-white rounded-lg font-semibold hover:bg-cashew-dark-green transition-colors"
            >
              Learn More
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-cashew-green text-cashew-green rounded-lg font-semibold hover:bg-cashew-green hover:text-white transition-colors"
            >
              Get Involved
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 backdrop-blur-md bg-white/60 rounded-2xl border border-white/20 shadow-glass">
            <div className="text-4xl font-bold text-cashew-green mb-2">
              22,490
            </div>
            <div className="text-neutral-700">Active Members</div>
          </div>
          <div className="text-center p-6 backdrop-blur-md bg-white/60 rounded-2xl border border-white/20 shadow-glass">
            <div className="text-4xl font-bold text-cashew-green mb-2">145</div>
            <div className="text-neutral-700">Development Centers</div>
          </div>
          <div className="text-center p-6 backdrop-blur-md bg-white/60 rounded-2xl border border-white/20 shadow-glass">
            <div className="text-4xl font-bold text-cashew-green mb-2">10</div>
            <div className="text-neutral-700">Districts Covered</div>
          </div>
        </div>
      </main>
    </div>
  );
}
