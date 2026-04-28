import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import FeatureCard from '../components/landing/FeatureCard';
import { Camera, BarChart3, ShieldAlert, BookOpen, Smartphone, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Camera,
      title: "Instant Recognition",
      description: "Simply upload a photo of your cattle or buffalo and our AI identifies the breed in under 2 seconds."
    },
    {
      icon: BarChart3,
      title: "Market Valuation",
      description: "Get accurate price estimates based on breed, age indicators, and current Indian market trends."
    },
    {
      icon: ShieldAlert,
      title: "Health Prediction",
      description: "Predict potential future diseases based on breed-specific vulnerabilities and visual indicators."
    },
    {
      icon: BookOpen,
      title: "Breed Intelligence",
      description: "Detailed insights on milk production, region of origin, and optimal environment for each breed."
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Access your dashboard and perform recognitions on the go with our fully responsive platform."
    },
    {
      icon: Zap,
      title: "Cloud Reports",
      description: "Save and download detailed recognition reports for your livestock records and insurance."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection />

        {/* Features Section */}
        <section id="features" className="py-24 bg-white dark:bg-slate-950 transition-colors">
          <div className="section-padding">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 dark:text-white">Cutting-edge Features for Modern Dairy Farming</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                We combine artificial intelligence with traditional farming knowledge to provide actionable insights for your livestock.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index} 
                  {...feature} 
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors">
          <div className="section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 dark:text-white">How It Works</h2>
                <div className="space-y-8">
                  {[
                    { step: "01", title: "Capture & Upload", text: "Take a clear photo of the animal from the side or front profile." },
                    { step: "02", title: "AI Analysis", text: "Our proprietary deep learning models analyze 200+ visual features." },
                    { step: "03", title: "Detailed Report", text: "Receive a comprehensive report with breed details, health tips, and valuation." }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="flex gap-6"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-lg">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 dark:text-white">{item.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1545468835-0552467d5830?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Cattle Farming" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 p-6 glass-card border-primary-100 max-w-[200px]">
                  <p className="text-sm font-semibold dark:text-white">Trusted by 500+ Dairy Cooperatives across India.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="section-padding">
            <div className="bg-agriculture-gradient rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to revolutionize your dairy farm?</h2>
                <p className="text-primary-50 text-xl mb-12 opacity-90">
                  Join thousands of farmers using AI to improve their livestock management and profitability.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-primary-700 font-bold px-10 py-5 rounded-2xl shadow-xl hover:bg-primary-50 transition-all hover:scale-105 active:scale-100">
                    Get Started Free
                  </button>
                  <button className="bg-primary-700/30 backdrop-blur-md border border-primary-400/30 text-white font-bold px-10 py-5 rounded-2xl hover:bg-primary-700/40 transition-all">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
