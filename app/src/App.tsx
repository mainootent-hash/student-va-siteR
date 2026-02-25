import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Database, 
  Search, 
  HeadphonesIcon, 
  Clock,
  Users,
  Briefcase,
  Rocket,
  ArrowRight,
  Menu,
  Globe,
  Send
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    education: '',
    skills: '',
    experience: '',
    pitch: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const sec2Ref = useRef<HTMLDivElement>(null);
  const sec3Ref = useRef<HTMLDivElement>(null);
  const sec4Ref = useRef<HTMLDivElement>(null);
  const sec5Ref = useRef<HTMLDivElement>(null);
  const sec6Ref = useRef<HTMLDivElement>(null);
  const sec7Ref = useRef<HTMLDivElement>(null);
  const sec8Ref = useRef<HTMLDivElement>(null);

  // Hero load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo('.hero-bg', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.6 }
      );
      gsap.fromTo('.hero-overlay', 
        { opacity: 0 }, 
        { opacity: 0.74, duration: 0.6 }
      );
      gsap.fromTo('.hero-title span', 
        { y: 24, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.03, duration: 0.9, delay: 0.3 }
      );
      gsap.fromTo('.hero-subtitle', 
        { y: 16, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, delay: 0.6 }
      );
      gsap.fromTo('.hero-cta', 
        { scale: 0.92, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.5, delay: 0.8, ease: 'back.out(1.6)' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scroll animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section 2 - What is a VA
      const sec2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec2Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      sec2Tl
        .fromTo('.sec2-headline', 
          { x: '-18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo('.sec2-body', 
          { x: '18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0.06)
        .fromTo('.sec2-img-left', 
          { x: '-30vw', y: '20vh', opacity: 0 }, 
          { x: 0, y: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo('.sec2-img-right', 
          { x: '30vw', y: '20vh', opacity: 0 }, 
          { x: 0, y: 0, opacity: 1, ease: 'none' }, 0.14)
        .to('.sec2-headline, .sec2-body', 
          { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.sec2-img-left', 
          { x: '-40vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.sec2-img-right', 
          { x: '40vw', opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 3 - Who are our assistants
      const sec3Tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec3Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      sec3Tl
        .fromTo('.sec3-img', 
          { x: '-55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo('.sec3-headline', 
          { x: '18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0.08)
        .fromTo('.sec3-body', 
          { x: '18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo('.sec3-badge', 
          { scale: 0.9, opacity: 0 }, 
          { scale: 1, opacity: 1, ease: 'back.out(1.8)' }, 0.18)
        .to('.sec3-img', 
          { x: '-45vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.sec3-headline, .sec3-body, .sec3-badge', 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 4 - What does a VA do
      const sec4Tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec4Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      sec4Tl
        .fromTo('.sec4-headline', 
          { x: '-18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo('.sec4-body', 
          { x: '-18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0.08)
        .fromTo('.sec4-img', 
          { x: '55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo('.sec4-task', 
          { y: 16, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0.18)
        .to('.sec4-headline, .sec4-body, .sec4-task', 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.sec4-img', 
          { x: '45vw', opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 5 - How does it work
      const sec5Tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec5Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      sec5Tl
        .fromTo('.sec5-img', 
          { x: '-55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo('.sec5-headline', 
          { x: '18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0.08)
        .fromTo('.sec5-body', 
          { x: '18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo('.sec5-step', 
          { y: 18, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0.16)
        .to('.sec5-img', 
          { x: '-45vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.sec5-headline, .sec5-body, .sec5-step', 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 6 - Who is this for
      const sec6Tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec6Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      sec6Tl
        .fromTo('.sec6-headline', 
          { x: '-18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo('.sec6-body', 
          { x: '-18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0.08)
        .fromTo('.sec6-img', 
          { x: '55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo('.sec6-pill', 
          { scale: 0.92, opacity: 0 }, 
          { scale: 1, opacity: 1, stagger: 0.03, ease: 'back.out(1.6)' }, 0.18)
        .to('.sec6-headline, .sec6-body, .sec6-pill', 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.sec6-img', 
          { x: '45vw', opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 7 - Get started
      const sec7Tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec7Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        }
      });

      sec7Tl
        .fromTo('.sec7-img', 
          { x: '-55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo('.sec7-headline', 
          { x: '18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0.08)
        .fromTo('.sec7-body', 
          { x: '18vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo('.sec7-cta', 
          { y: 18, scale: 0.94, opacity: 0 }, 
          { y: 0, scale: 1, opacity: 1, ease: 'back.out(1.7)' }, 0.18)
        .to('.sec7-img', 
          { x: '-45vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .to('.sec7-headline, .sec7-body, .sec7-cta', 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);

      // Section 8 - Flowing section with reveal
      gsap.fromTo('.sec8-heading',
        { y: 24, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          scrollTrigger: {
            trigger: sec8Ref.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5
          }
        }
      );

      gsap.fromTo('.sec8-form',
        { x: '10vw', opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          scrollTrigger: {
            trigger: sec8Ref.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5
          }
        }
      );

      // Global snap for pinned sections
      const pinned = ScrollTrigger.getAll().filter(st => st.vars.pin).sort((a, b) => a.start - b.start);
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (maxScroll && pinned.length > 0) {
        const pinnedRanges = pinned.map(st => ({
          start: st.start / maxScroll,
          end: (st.end ?? st.start) / maxScroll,
          center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
        }));

        ScrollTrigger.create({
          snap: {
            snapTo: (value: number) => {
              const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
              if (!inPinned) return value;
              
              const target = pinnedRanges.reduce((closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
                pinnedRanges[0]?.center ?? 0
              );
              return target;
            },
            duration: { min: 0.15, max: 0.35 },
            delay: 0,
            ease: 'power2.out'
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // API Configuration
  // Change this to your backend URL when deploying
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file upload support
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) submitData.append(key, value);
      });

      // Add CV file if selected
      const cvInput = document.querySelector('input[name="cv"]') as HTMLInputElement;
      if (cvInput?.files?.[0]) {
        submitData.append('cv', cvInput.files[0]);
      }

      const response = await fetch(`${API_BASE_URL}/api/apply`, {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setApplyDialogOpen(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          country: '',
          education: '',
          skills: '',
          experience: '',
          pitch: ''
        });
        // Reset file input
        if (cvInput) cvInput.value = '';
      } else {
        toast.error(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6 flex justify-between items-center">
        <div className="text-[#F6F4EF] font-semibold text-lg tracking-tight mix-blend-difference">
          Student Virtual Assistant
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setApplyDialogOpen(true)}
            className="px-5 py-2 rounded-full text-sm font-medium bg-[#F6F4EF] text-[#111827] hover:bg-white transition-colors"
          >
            Apply
          </button>
          <button 
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 rounded-full bg-[#F6F4EF]/10 backdrop-blur-sm flex items-center justify-center text-[#F6F4EF] hover:bg-[#F6F4EF]/20 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Menu Dialog */}
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="sm:max-w-md bg-[#0B1A3A] border-none text-[#F6F4EF]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#F6F4EF]">Menu</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <button onClick={() => scrollToSection(sec2Ref)} className="text-left py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-lg">
              What is a VA
            </button>
            <button onClick={() => scrollToSection(sec3Ref)} className="text-left py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-lg">
              Who we are
            </button>
            <button onClick={() => scrollToSection(sec5Ref)} className="text-left py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-lg">
              How it works
            </button>
            <button onClick={() => setApplyDialogOpen(true)} className="text-left py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-lg">
              Apply
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Apply Dialog */}
      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Apply Now</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="+1 234 567 890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country *</label>
                <input 
                  type="text" 
                  name="country" 
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="United States"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Education Level</label>
              <select 
                name="education" 
                value={formData.education}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Select education level</option>
                <option value="high-school">High School</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Skills</label>
              <input 
                type="text" 
                name="skills" 
                value={formData.skills}
                onChange={handleInputChange}
                className="input-field"
                placeholder="e.g., Microsoft Office, Communication, Data Entry"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Work Experience</label>
              <textarea 
                name="experience" 
                rows={3}
                value={formData.experience}
                onChange={handleInputChange}
                className="input-field resize-none"
                placeholder="Briefly describe your relevant work experience..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Why should we hire you? *</label>
              <textarea 
                name="pitch" 
                rows={4}
                required
                value={formData.pitch}
                onChange={handleInputChange}
                className="input-field resize-none"
                placeholder="Tell us about yourself and why you'd be a great fit..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Upload CV (optional)</label>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                className="input-field py-2"
              />
              <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="animate-spin">
                  <Clock className="w-5 h-5" />
                </span>
              ) : (
                <Send className="w-5 h-5" />
              )}
              {isSubmitting ? 'Submitting...' : 'Send Application'}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Section 1: Hero */}
      <section ref={heroRef} className="section-pinned z-10">
        <div className="hero-bg absolute inset-0">
          <img 
            src="/hero_lifestyle.jpg" 
            alt="Work from home" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hero-overlay absolute inset-0 bg-[#0B1A3A]" style={{ opacity: 0.74 }} />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold text-[#F6F4EF] mb-6">
            {'Work from home.'.split('').map((char, i) => (
              <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>
          <p className="hero-subtitle text-lg md:text-xl text-[#F6F4EF]/80 max-w-2xl mx-auto mb-8">
            Student Virtual Assistant connects motivated people with remote work—so you can earn on your own schedule.
          </p>
          <button 
            onClick={() => setApplyDialogOpen(true)}
            className="hero-cta btn-secondary"
          >
            Apply now
          </button>
        </div>
      </section>

      {/* Section 2: What is a VA */}
      <section ref={sec2Ref} className="section-pinned bg-[#F6F4EF] z-20">
        <div className="w-full h-full px-8 lg:px-16 py-20 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12">
            <div className="sec2-headline">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827]">
                What is a virtual assistant?
              </h2>
              <div className="w-10 h-1 bg-[#4B6DFF] mt-6" />
            </div>
            <div className="sec2-body">
              <p className="text-lg text-[#6B7280] leading-relaxed">
                A virtual assistant is a remote professional who helps businesses with tasks like email, scheduling, research, and customer support—so teams can focus on what matters most.
              </p>
              <p className="font-mono-label text-[#4B6DFF] mt-6">
                Remote • Flexible • Professional
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="sec2-img-left image-card h-48 md:h-64">
              <img 
                src="/sec2_laptop_coffee.jpg" 
                alt="Laptop and coffee" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sec2-img-right image-card h-48 md:h-64">
              <img 
                src="/sec2_workspace_topdown.jpg" 
                alt="Workspace" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Who are our assistants */}
      <section ref={sec3Ref} className="section-pinned bg-[#F6F4EF] z-30">
        <div className="w-full h-full px-8 lg:px-16 py-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="sec3-img image-card w-full lg:w-2/5 h-80 lg:h-[60vh]">
            <img 
              src="/sec3_portrait.jpg" 
              alt="Our assistants" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-3/5">
            <h2 className="sec3-headline text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] mb-6">
              Who are our assistants?
            </h2>
            <p className="sec3-body text-lg text-[#6B7280] leading-relaxed max-w-xl">
              Smart, reliable people—many of them students—who are trained to help businesses run smoothly. Organized, communicative, and ready to support your team.
            </p>
            <div className="sec3-badge inline-flex items-center gap-2 px-4 py-2 bg-[#4B6DFF]/10 rounded-full mt-8">
              <Users className="w-4 h-4 text-[#4B6DFF]" />
              <span className="text-sm font-medium text-[#4B6DFF]">Students & graduates welcome</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: What does a VA do */}
      <section ref={sec4Ref} className="section-pinned bg-[#F6F4EF] z-40">
        <div className="w-full h-full px-8 lg:px-16 py-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="sec4-headline text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] mb-6">
              What does a VA do?
            </h2>
            <p className="sec4-body text-lg text-[#6B7280] leading-relaxed mb-8">
              Our assistants handle the day-to-day tasks that keep a business moving—so you can focus on strategy, sales, and growth.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Mail, label: 'Email & calendar' },
                { icon: Database, label: 'Data entry' },
                { icon: Search, label: 'Research' },
                { icon: HeadphonesIcon, label: 'Customer support' },
              ].map((task, i) => (
                <div key={i} className="sec4-task flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <task.icon className="w-5 h-5 text-[#4B6DFF]" />
                  <span className="text-sm font-medium text-[#111827]">{task.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="sec4-img image-card w-full lg:w-1/2 h-80 lg:h-[60vh] order-1 lg:order-2">
            <img 
              src="/sec4_workspace_notebook.jpg" 
              alt="VA workspace" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 5: How does it work */}
      <section ref={sec5Ref} className="section-pinned bg-[#F6F4EF] z-50">
        <div className="w-full h-full px-8 lg:px-16 py-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="sec5-img image-card w-full lg:w-2/5 h-80 lg:h-[60vh]">
            <img 
              src="/sec5_typing_laptop.jpg" 
              alt="How it works" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-3/5">
            <h2 className="sec5-headline text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] mb-6">
              How does it work?
            </h2>
            <p className="sec5-body text-lg text-[#6B7280] leading-relaxed mb-8">
              We match you with a trained assistant, set clear goals, and stay close to make sure the work stays on track.
            </p>
            <div className="space-y-4">
              {[
                { num: '01', text: 'Match with an assistant' },
                { num: '02', text: 'Set tasks & priorities' },
                { num: '03', text: 'Scale up as you grow' },
              ].map((step, i) => (
                <div key={i} className="sec5-step flex items-center gap-4">
                  <span className="font-mono-label text-[#4B6DFF]">{step.num}</span>
                  <span className="text-lg text-[#111827]">{step.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Who is this for */}
      <section ref={sec6Ref} className="section-pinned bg-[#F6F4EF] z-[60]">
        <div className="w-full h-full px-8 lg:px-16 py-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="sec6-headline text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] mb-6">
              Who is this for?
            </h2>
            <p className="sec6-body text-lg text-[#6B7280] leading-relaxed mb-8">
              Founders, small teams, and busy professionals who need reliable help—without the overhead of a full-time hire.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Briefcase, text: 'Small business owners' },
                { icon: Rocket, text: 'Startup teams' },
              ].map((pill, i) => (
                <div key={i} className="sec6-pill inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <pill.icon className="w-4 h-4 text-[#4B6DFF]" />
                  <span className="text-sm font-medium text-[#111827]">{pill.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="sec6-img image-card w-full lg:w-1/2 h-80 lg:h-[60vh] order-1 lg:order-2">
            <img 
              src="/sec6_notebook_pen.jpg" 
              alt="Who is this for" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 7: Get started */}
      <section ref={sec7Ref} className="section-pinned bg-[#F6F4EF] z-[70]">
        <div className="w-full h-full px-8 lg:px-16 py-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="sec7-img image-card w-full lg:w-2/5 h-80 lg:h-[60vh]">
            <img 
              src="/sec7_workspace_topdown.jpg" 
              alt="Get started" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-3/5">
            <h2 className="sec7-headline text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] mb-6">
              Get started today.
            </h2>
            <p className="sec7-body text-lg text-[#6B7280] leading-relaxed mb-8">
              Apply in minutes. If you're a motivated student or recent grad looking for flexible remote work, we'd love to meet you.
            </p>
            <button 
              onClick={() => setApplyDialogOpen(true)}
              className="sec7-cta btn-primary inline-flex items-center gap-2"
            >
              Apply now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 8: Contact / Application Form */}
      <section ref={sec8Ref} className="relative bg-[#F6F4EF] z-[80] min-h-screen py-20">
        <div className="px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left side - Info */}
            <div className="sec8-heading">
              <h2 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">
                Apply now
              </h2>
              <p className="text-lg text-[#6B7280] leading-relaxed mb-12">
                Tell us a bit about yourself. We review applications weekly and reply within 2–3 business days.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#4B6DFF]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#4B6DFF]" />
                  </div>
                  <div>
                    <p className="font-mono-label text-[#6B7280] mb-1">Email</p>
                    <p className="text-[#111827]">hello@studentvirtualassistant.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#4B6DFF]/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[#4B6DFF]" />
                  </div>
                  <div>
                    <p className="font-mono-label text-[#6B7280] mb-1">Location</p>
                    <p className="text-[#111827]">Based worldwide • Remote-first</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="sec8-form form-card">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country *</label>
                    <input 
                      type="text" 
                      name="country" 
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="United States"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Education Level</label>
                  <select 
                    name="education" 
                    value={formData.education}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select education level</option>
                    <option value="high-school">High School</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Skills</label>
                  <input 
                    type="text" 
                    name="skills" 
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., Microsoft Office, Communication, Data Entry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Work Experience</label>
                  <textarea 
                    name="experience" 
                    rows={2}
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="input-field resize-none"
                    placeholder="Briefly describe your relevant work experience..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Why should we hire you? *</label>
                  <textarea 
                    name="pitch" 
                    rows={3}
                    required
                    value={formData.pitch}
                    onChange={handleInputChange}
                    className="input-field resize-none"
                    placeholder="Tell us about yourself and why you'd be a great fit..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Upload CV (optional)</label>
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    className="input-field py-2"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="animate-spin">
                      <Clock className="w-5 h-5" />
                    </span>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {isSubmitting ? 'Submitting...' : 'Send Application'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 bg-[#0B1A3A] py-12">
          <div className="px-8 lg:px-16 text-center">
            <p className="text-[#F6F4EF]/60 text-sm">
              © Student Virtual Assistant. All rights reserved.
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default App;
