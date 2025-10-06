'use client';

import { useState } from 'react';

import { Loader2, Mail, Send, Sparkles, Wand2 } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { toast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [improveComment, setImproveComment] = useState('');
  const [hasDraft, setHasDraft] = useState(false);

  const formspreeFormId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
  const FORMSPREE_ENDPOINT = formspreeFormId ? `https://formspree.io/f/${formspreeFormId}` : undefined;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!FORMSPREE_ENDPOINT) {
      toast({
        title: 'Configuration error',
        description: 'Missing NEXT_PUBLIC_FORMSPREE_FORM_ID. Please configure your Formspree form ID.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Message Sent! 🚀',
          description: "Thanks for reaching out! I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setHasDraft(false);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Something went wrong',
        description: 'Your message could not be sent. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDraftEnabled = Boolean(formData.name && formData.email && formData.subject);
  const isImproveEnabled = Boolean(hasDraft && formData.message && improveComment);

  const handleCreateDraft = async () => {
    if (!isDraftEnabled || isDrafting) return;
    setIsDrafting(true);
    try {
      const result = await api.post<{ draft: string }, { name: string; email: string; subject: string }>(
        'api/contact/draft',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
        },
      );

      const draftMessage = (result as { draft?: string }).draft || '';
      if (draftMessage) {
        setFormData((prev) => ({
          ...prev,
          message: draftMessage,
        }));
        setHasDraft(true);
        toast({ title: 'Draft created', description: 'Draft message inserted into the form.' });
      } else {
        toast({ title: 'No draft returned', description: 'The server did not return a draft.', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error creating draft:', error);
      toast({ title: 'Draft failed', description: 'Could not create a draft. Please try again.', variant: 'destructive' });
    } finally {
      setIsDrafting(false);
    }
  };

  const handleImproveDraft = async () => {
    if (!isImproveEnabled || isImproving) return;
    setIsImproving(true);
    try {
      const result = await api.post<{ draft: string }, { draft: string; comment: string }>('api/contact/draft/improve', {
        draft: formData.message,
        comment: improveComment,
      });

      const improved = (result as { draft?: string }).draft || '';
      if (improved) {
        setFormData((prev) => ({ ...prev, message: improved }));
        setImproveComment('');
        toast({ title: 'Draft improved', description: 'Your draft has been refined.' });
      } else {
        toast({
          title: 'No improvement returned',
          description: 'The server did not return a draft.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error improving draft:', error);
      toast({
        title: 'Improve failed',
        description: 'Could not improve the draft. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsImproving(false);
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/josé-pedro-mota-7395a6191/',
      icon: FaLinkedin,
      color: 'text-primary hover:text-primary/80',
      description: 'Connect professionally',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/zepedroc',
      icon: FaGithub,
      color: 'text-primary hover:text-primary/80',
      description: 'View my code',
    },
    {
      name: 'Email',
      url: 'mailto:zepedrocm@hotmail.com',
      icon: Mail,
      color: 'text-primary hover:text-primary/80',
      description: 'Send direct email',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-gradient mb-6">Let's Connect</h1>
          <p className="text-xl text-muted-foreground">Ready to discuss your next project or just want to say hello?</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="glass-card p-8 animate-fade-in-up">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Send a Message</h2>
              <p className="text-muted-foreground">Fill out the form below and I'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-foreground">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary"
                  placeholder="What's this about?"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="message" className="text-foreground">
                    Message
                  </Label>
                  <span
                    className="inline-block"
                    title={!isDraftEnabled ? 'Fill name, email, and subject to create a draft' : 'Create a draft message'}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={handleCreateDraft}
                      disabled={!isDraftEnabled || isDrafting}
                      aria-label="Create draft"
                    >
                      {isDrafting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    </Button>
                  </span>
                </div>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                  placeholder="Tell me about your project or just say hi!"
                />
                {hasDraft && formData.message && (
                  <div className="flex items-center gap-2">
                    <Input
                      id="improve-comment"
                      name="improve-comment"
                      value={improveComment}
                      onChange={(e) => setImproveComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          e.stopPropagation();
                          if (isImproveEnabled && !isImproving) {
                            handleImproveDraft();
                          }
                        }
                      }}
                      placeholder="Let me know how to improve the draft (tone, length, details...)"
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                    <span
                      className="inline-block"
                      title={
                        !formData.message
                          ? 'Create or paste a draft message first'
                          : !improveComment
                            ? 'Add a comment describing the changes you want'
                            : 'Improve the current draft'
                      }
                    >
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="h-9 w-9"
                        onClick={handleImproveDraft}
                        disabled={!isImproveEnabled || isImproving}
                        aria-label="Improve draft"
                      >
                        {isImproving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                      </Button>
                    </span>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 neon-glow" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </Card>

          {/* Social Links */}
          <div className="space-y-8 animate-slide-in-right">
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Connect on Social</h2>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-lg bg-background/30 hover:bg-background/50 transition-all duration-200 group"
                  >
                    <link.icon className={`w-6 h-6 ${link.color} transition-colors`} />
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {link.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
