import { Calendar, ExternalLink, Github, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function ExperiencePage() {
  const workExperience = [
    {
      title: 'JavaScript Developer',
      company: 'Emergn',
      location: 'Remote',
      period: 'Jun 2022 - Present',
      description:
        'Led a team of engineers in the development and successful launch of cutting-edge learning platforms. Oversaw complete implementation processes, ensuring scalability, performance, and exceptional user experience.',
      technologies: [
        'Next.js',
        'NestJS',
        'MongoDB',
        'Playwright',
        'GraphQL',
        'DatoCMS',
        'React.js',
        'TypeScript',
        'SASS',
        'SAPUI5',
        'Jest',
        'Cypress',
        'LlamaIndex',
        'SQL',
        'Cursor',
        'SQL Server Management Studio',
      ],
      achievements: [
        'Enhanced Fiori Elements by developing new frontend components for Fiori Apps (Jun 2022 - Jan 2023)',
        'Developed analytics dashboard and chatbot for Emergn Learning Platform (Jan 2023 - Dec 2023)',
        'Led team development of Praxis by Emergn learning platform for product managers (Jan 2024 - Present)',
        'Contributing to Pulse development - internal web platform for employee management processes (Jul 2025 - Present)',
        'Created integration tests to enhance project reliability',
        'Optimized and refactored existing code for better performance',
      ],
    },
    {
      title: 'Software Developer',
      company: 'Particle Forward',
      location: 'Remote',
      period: 'May 2022 - Jun 2022',
      description:
        'Developed the frontend for União Zoófila website using Contentful as headless CMS. Created reusable components for multiple websites.',
      technologies: ['JavaScript', 'React.js', 'TypeScript', 'Next.js', 'Contentful', 'CSS3', 'HTML5'],
      achievements: [
        'Built complete frontend architecture for União Zoófila website',
        'Integrated Contentful CMS for dynamic content management',
        'Developed independent components for reuse across multiple websites',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'Natixis (via Altran)',
      location: 'Remote',
      period: 'Nov 2020 - Dec 2021',
      description:
        'Transformed legacy internal sites into modern ReactJS applications by developing new components using SharePoint Framework for migration to SharePoint.',
      technologies: ['JavaScript', 'React.js', 'TypeScript', 'SASS', 'SharePoint', 'CSS3', 'HTML5'],
      achievements: [
        'Successfully migrated internal sites to SharePoint Framework',
        'Developed modern ReactJS components replacing legacy systems',
        'Improved user experience with contemporary web technologies',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'Celfinet (via Helppier)',
      location: 'Remote',
      period: 'Aug 2019 - Nov 2019',
      description:
        'Re-structured GeoMap Platform UI to work with Redux as state manager. Created new components using MaterialUI for improved user interface.',
      technologies: ['JavaScript', 'React.js', 'Redux', 'SASS', 'OpenLayers', 'HTML5', 'Material-UI'],
      achievements: [
        'Refactored entire UI structure to implement Redux state management',
        'Created new components using MaterialUI design system',
        'Enhanced geospatial data visualization with OpenLayers integration',
      ],
    },
    {
      title: 'Fullstack Developer',
      company: 'Helppier',
      location: 'Remote',
      period: 'Feb 2018 - Nov 2020',
      description:
        'Developed a step-by-step tutorial widget for client websites, enhancing existing features and building new screens. Created complete backend logic for the tutorial system.',
      technologies: ['JavaScript', 'React.js', 'Redux', 'Node.js', 'MongoDB', 'MeteorJS', 'SASS', 'HTML5', 'Figma'],
      achievements: [
        'Built complete tutorial widget system for client integration',
        'Developed entire backend architecture and logic',
        'Enhanced user onboarding experience across multiple client websites',
        'Created intuitive UI/UX for tutorial creation and management',
      ],
    },
  ];

  const sideProjects = [
    {
      title: 'AI-Powered Code Assistant',
      description:
        'A VS Code extension that uses machine learning to provide intelligent code suggestions and bug detection.',
      technologies: ['TypeScript', 'Python', 'TensorFlow', 'VS Code API'],
      status: 'Active',
      github: 'https://github.com/josemota/ai-code-assistant',
      demo: 'https://marketplace.visualstudio.com/items?itemName=josemota.ai-assistant',
    },
    {
      title: 'Robotic Arm Controller',
      description:
        'Web-based interface for controlling a 6-DOF robotic arm with real-time feedback and computer vision integration.',
      technologies: ['React', 'WebRTC', 'Python', 'OpenCV', 'Arduino'],
      status: 'Beta',
      github: 'https://github.com/josemota/robotic-arm-controller',
      demo: 'https://robot-controller.josemota.dev',
    },
    {
      title: 'Neural Network Visualizer',
      description:
        'Interactive web application for visualizing and understanding neural network architectures and training processes.',
      technologies: ['D3.js', 'WebGL', 'Python', 'FastAPI', 'PyTorch'],
      status: 'Completed',
      github: 'https://github.com/josemota/neural-viz',
      demo: 'https://neural-viz.josemota.dev',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-gradient mb-6">Experience & Projects</h1>
          <p className="text-xl text-muted-foreground">A journey through my professional experience and passion projects</p>
        </div>

        {/* Work Experience */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Calendar className="mr-3 text-primary" />
            Professional Experience
          </h2>

          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <Card
                key={index}
                className="glass-card p-8 hover:neon-glow transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{job.title}</h3>
                    <p className="text-xl text-primary font-semibold mb-2">{job.company}</p>
                    <div className="flex items-center text-muted-foreground space-x-4 mb-4">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {job.period}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{job.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Side Projects */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Github className="mr-3 text-accent" />
            Side Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sideProjects.map((project, index) => (
              <Card
                key={index}
                className="glass-card p-6 hover:purple-glow transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className={
                        project.status === 'Active'
                          ? 'border-neon-green text-neon-green'
                          : project.status === 'Beta'
                            ? 'border-neon-cyan text-neon-cyan'
                            : 'border-accent text-accent'
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-border/50">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" className="flex-1 bg-primary/20 hover:bg-primary/30" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
