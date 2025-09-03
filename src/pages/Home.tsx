import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Astronaut3D from "@/components/Astronaut3D";

const Home = () => {
  return (
    <div className="min-h-screen pt-16 grid-pattern">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12 animate-fade-in-up">
              <div className="space-y-6">
                <h1 className="text-7xl md:text-8xl font-thin text-gradient tracking-tighter">
                  José Mota
                </h1>
                <div className="space-y-2">
                  <p className="text-xl text-muted-foreground font-light">
                    Web Developer
                  </p>
                  <div className="h-px w-24 bg-foreground"></div>
                </div>
              </div>
              
              <div className="space-y-6 max-w-md">
                <p className="text-lg text-foreground/90 font-light leading-relaxed">
                  Passionate about creating the future through{" "}
                  <span className="text-primary font-normal">Software</span>,{" "}
                  <span className="text-foreground font-normal">AI</span>, and{" "}
                  <span className="text-foreground font-normal">Robotics</span>.
                </p>
              </div>

              <div className="flex gap-6">
                <Link to="/experience">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-light px-8 py-3 group">
                    View Work
                    <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-border hover:bg-secondary font-light px-8 py-3">
                    Contact
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-96 lg:h-[600px] animate-slide-in-right">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-minimal-pulse text-muted-foreground">Loading...</div>
                </div>
              }>
                <Astronaut3D />
              </Suspense>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <div className="glass-card p-16 border-minimal scan-line">
            <h2 className="text-3xl font-thin text-gradient mb-8 tracking-tight">
              Let's Build Something
            </h2>
            <p className="text-muted-foreground text-lg mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              Interested in collaborating on your next project? 
              Let's discuss how we can bring your ideas to life.
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-light px-10 py-4">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;