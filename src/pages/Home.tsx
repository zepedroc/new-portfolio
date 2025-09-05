import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen pt-16 grid-pattern">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12 animate-fade-in-up lg:text-left text-center mx-auto lg:mx-0">
              <div className="space-y-6">
                <h1 className="text-7xl md:text-8xl font-thin text-gradient tracking-tighter">José Mota</h1>
                <div className="space-y-2">
                  <p className="text-xl text-muted-foreground font-light">Web Developer</p>
                  <div className="h-px w-24 bg-foreground lg:mx-0 mx-auto"></div>
                </div>
              </div>

              <div className="space-y-6 max-w-sm">
                <p className="text-lg text-foreground/90 font-light leading-relaxed">
                  Passionate about clean UIs, good software and everything AI.
                </p>
              </div>

              <div className="flex gap-6 lg:justify-start justify-center isolate">
                <Link to="/experience">
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-light px-4 py-3 group"
                    style={{ borderRadius: '2px' }}
                  >
                    View Work
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div
              className="relative h-96 lg:h-[600px] animate-slide-in-right hidden lg:block transform-gpu"
              style={{ willChange: 'transform' }}
            >
              <img src="/assets/astro.png" alt="Astronaut" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
