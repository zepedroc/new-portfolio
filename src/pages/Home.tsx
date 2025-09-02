import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code, Brain, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import Astronaut3D from "@/components/Astronaut3D";

const Home = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl font-bold text-gradient animate-glow-pulse">
                  José Mota
                </h1>
                <p className="text-xl text-muted-foreground">
                  Web Developer & Tech Enthusiast
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-lg text-foreground/90 leading-relaxed">
                  Passionate about creating the future through{" "}
                  <span className="text-primary font-semibold">Software</span>,{" "}
                  <span className="text-accent font-semibold">AI</span>, and{" "}
                  <span className="text-neon-green font-semibold">Robotics</span>.
                </p>
                <p className="text-muted-foreground">
                  Building digital experiences that push the boundaries of what's possible.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/experience">
                  <Button className="bg-primary hover:bg-primary/90 neon-glow group">
                    View My Work
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                    Chat with Me
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-96 lg:h-[500px] animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent rounded-full blur-3xl"></div>
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                </div>
              }>
                <Astronaut3D />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">
              Areas of Expertise
            </h2>
            <p className="text-muted-foreground text-lg">
              Exploring the intersection of technology and innovation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card p-8 text-center hover:neon-glow transition-all duration-300 group">
              <div className="mb-6">
                <Code className="w-16 h-16 mx-auto text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Software Development</h3>
              <p className="text-muted-foreground">
                Building scalable web applications with modern technologies and best practices.
              </p>
            </Card>

            <Card className="glass-card p-8 text-center hover:purple-glow transition-all duration-300 group">
              <div className="mb-6">
                <Brain className="w-16 h-16 mx-auto text-accent group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Artificial Intelligence</h3>
              <p className="text-muted-foreground">
                Leveraging AI and machine learning to solve complex problems and enhance user experiences.
              </p>
            </Card>

            <Card className="glass-card p-8 text-center hover:text-neon-green hover:shadow-[0_0_30px_hsl(120_100%_50%_/_0.5)] transition-all duration-300 group">
              <div className="mb-6">
                <Cpu className="w-16 h-16 mx-auto text-neon-green group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Robotics</h3>
              <p className="text-muted-foreground">
                Designing and programming robotic systems that bridge the physical and digital worlds.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12 border-gradient">
            <h2 className="text-3xl font-bold text-gradient mb-6">
              Ready to Build the Future Together?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let's discuss your next project and explore how we can bring your ideas to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 neon-glow">
                  Get In Touch
                </Button>
              </Link>
              <Link to="/chat">
                <Button size="lg" variant="outline" className="border-accent/50 hover:bg-accent/10">
                  Start a Conversation
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