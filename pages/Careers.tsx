import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/GlassCard';
import { SectionHeading } from '../components/SectionHeading';
import { PageSEO } from '../components/PageSEO';
import { DottedSurface } from '../components/ui/dotted-surface';

const roleCards = [
  {
    id: 'ml-engineer',
    title: 'Senior ML Engineer',
    team: 'Applied AI',
    location: 'Remote • EMEA/NA',
    summary: 'Own model development, evaluation pipelines, and production deployment for mission-critical AI systems.',
    focus: ['LLM evaluation', 'RAG systems', 'MLOps orchestration'],
  },
  {
    id: 'fullstack',
    title: 'Lead Full-Stack Engineer',
    team: 'Product Engineering',
    location: 'Remote • Global',
    summary: 'Architect and deliver enterprise-grade web platforms with performance and reliability guarantees.',
    focus: ['React + TypeScript', 'API design', 'System observability'],
  },
  {
    id: 'infra',
    title: 'Cloud Infrastructure Lead',
    team: 'Platform',
    location: 'Hybrid • MENA/UK',
    summary: 'Design scalable infrastructure, secure deployments, and high-throughput data pipelines.',
    focus: ['Kubernetes', 'IaC', 'Zero-trust security'],
  },
];

const benefits = [
  {
    id: 'autonomy',
    title: 'Autonomy by Design',
    detail: 'Small pods, senior ownership, and direct access to decision-makers to remove bottlenecks.',
  },
  {
    id: 'growth',
    title: 'Structured Growth',
    detail: 'Clear expectations, mentorship cycles, and funded technical training every quarter.',
  },
  {
    id: 'impact',
    title: 'Enterprise Impact',
    detail: 'Work on systems that affect real business outcomes, not vanity projects.',
  },
  {
    id: 'flex',
    title: 'Flexible Operating Model',
    detail: 'Remote-first with intentional onsite sessions for major milestones and planning.',
  },
];

const processSteps = [
  {
    id: 'screen',
    title: 'Signal Check',
    description: 'A 20-minute intro focused on scope, alignment, and expectations.',
  },
  {
    id: 'technical',
    title: 'Technical Deep Dive',
    description: 'Scenario-based evaluation tailored to the role, no leetcode loops.',
  },
  {
    id: 'collab',
    title: 'Collaboration Sprint',
    description: 'Pair with a lead to validate delivery style and communication cadence.',
  },
  {
    id: 'final',
    title: 'Leadership Review',
    description: 'Final confirmation of alignment, growth plan, and comp structure.',
  },
];

const highlights = [
  { id: 'projects', label: 'Active Enterprise Programs', value: '40+' },
  { id: 'impact', label: 'Annual Client ROI Generated', value: '$22M+' },
  { id: 'retention', label: 'Team Retention', value: '96%' },
];

const formSchema = z.object({
  name: z.string().min(2, { message: 'REQUIRED_FIELD' }),
  email: z.string().email({ message: 'INVALID_FORMAT' }),
  role: z.string().min(2, { message: 'REQUIRED_FIELD' }),
  location: z.string().min(2, { message: 'REQUIRED_FIELD' }),
  experience: z.string().min(1, { message: 'REQUIRED_FIELD' }),
  portfolio: z.string().url({ message: 'INVALID_FORMAT' }).optional().or(z.literal('')),
  resume: z.string().url({ message: 'INVALID_FORMAT' }).optional().or(z.literal('')),
  availability: z.enum(['Immediate', '2-4 Weeks', '1-2 Months', 'Flexible']),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const Careers: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availability: 'Flexible',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1400));
      console.log('Career Application:', data);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Application error:', error);
      setErrorMessage('Submission failed. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = 'w-full bg-paper border border-border rounded-none px-4 py-3 text-foreground placeholder-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-mono';
  const labelClasses = 'block text-xs font-bold text-foreground mb-2 uppercase tracking-wide';

  return (
    <>
      <PageSEO 
        title="Careers" 
        description="Join Cognetex and build the autonomous systems that power enterprise business. We are looking for senior talent in AI, Full-Stack, and Infrastructure."
      />
      
      {/* Editorial Header */}
      <section className="pt-32 md:pt-48 pb-24 bg-background border-b border-border relative overflow-hidden">
        <DottedSurface className="opacity-20 translate-y-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-end">
            <div className="lg:col-span-7">
              <span className="section-eyebrow mb-4 inline-block">04. Talent Network</span>
              <h1 className="text-6xl md:text-[7rem] font-bold text-foreground tracking-tighter uppercase leading-[0.9]">
                BUILD THE <br />
                <span className="text-signal">SYSTEMS</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted leading-relaxed mt-10 max-w-2xl font-medium">
                Cognetex teams ship autonomous systems for enterprise organizations. 
                We value clear thinking, extreme ownership, and craft. 
              </p>
            </div>
            <div className="lg:col-span-5 pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {highlights.map((item) => (
                  <div key={item.id} className="border border-border bg-paper p-6 hover:border-signal transition-colors">
                    <p className="text-4xl font-bold text-foreground font-mono mb-2 tracking-tighter">{item.value}</p>
                    <p className="text-[10px] text-muted uppercase tracking-widest font-bold leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Domains */}
      <section className="py-24 md:py-32 bg-paper border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="01. What You'll Own"
            title={
              <>
                CORE DOMAINS
                <br />
                OF IMPACT
              </>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">
            {benefits.map((benefit, idx) => (
              <Card key={benefit.id} className="h-full group hover:border-signal transition-colors p-8">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs text-muted">BEN_{benefit.id.substring(0, 2).toUpperCase()}</span>
                  <div className="w-10 h-10 border border-border flex items-center justify-center font-mono text-xs text-muted group-hover:bg-signal group-hover:text-background transition-colors">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight uppercase">{benefit.title}</h3>
                <p className="text-base text-muted leading-relaxed">{benefit.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Missions Grid */}
      <section className="py-24 md:py-32 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
            <div>
              <span className="section-eyebrow mb-4 inline-block text-signal">02. Open Missions</span>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tighter uppercase leading-none">CURRENT DEPLOYMENTS</h2>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-xl font-medium">
              We hire for depth, clarity, and delivery velocity. Each role owns outcomes from strategy through production-grade execution.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {roleCards.map((role) => (
              <Card key={role.id} className="h-full flex flex-col p-10 hover:border-signal transition-all duration-500">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-[10px] font-mono uppercase bg-signal/10 text-signal border border-signal/20 px-3 py-1 font-bold tracking-widest">
                    {role.team}
                  </span>
                  <span className="font-mono text-[10px] text-muted">REF_{role.id.substring(0, 3).toUpperCase()}</span>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4 uppercase tracking-tight">{role.title}</h3>
                <p className="text-xs font-mono text-signal mb-6 uppercase tracking-widest font-bold">{role.location}</p>
                <p className="text-lg text-muted leading-relaxed mb-10">{role.summary}</p>
                <div className="mt-auto">
                  <div className="h-px w-full bg-border mb-8" />
                  <ul className="space-y-3">
                    {role.focus.map((item) => (
                      <li key={item} className="text-xs font-mono text-foreground flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-signal" />
                        <span className="uppercase tracking-wide">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Protocol */}
      <section className="py-24 md:py-32 bg-paper border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
            <div>
              <span className="section-eyebrow mb-4 inline-block text-signal">03. Verification Protocol</span>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tighter uppercase leading-none">FOUR STEPS TO ONBOARD</h2>
            </div>
            <p className="text-lg text-muted leading-relaxed max-w-xl font-medium">
              Transparent, efficient, and optimized for senior-level candidates who value clarity over performance art.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={step.id} className="border border-border bg-background p-10 relative group hover:border-signal transition-colors">
                <span className="absolute top-6 right-6 text-[10px] font-mono text-muted group-hover:text-signal transition-colors font-bold">PROTOCOL_0{idx + 1}</span>
                <h3 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-tight">{step.title}</h3>
                <p className="text-base text-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Interface */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5 space-y-12">
              <div>
                <span className="section-eyebrow mb-4 inline-block text-signal">04. Transmission</span>
                <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter leading-none uppercase">SUBMIT YOUR <br />SIGNAL</h2>
              </div>
              <p className="text-xl text-muted leading-relaxed font-medium">
                We review every submission within 5 business days. No templates, just engineering depth.
              </p>

              <div className="space-y-6 text-sm font-mono text-foreground pt-8">
                <div className="flex items-center gap-6 p-6 border border-border bg-paper group hover:border-signal transition-colors">
                  <div className="w-2 h-2 bg-signal animate-pulse" />
                  <span className="uppercase tracking-widest font-bold">REMOTE-FIRST DELIVERY TEAMS</span>
                </div>
                <div className="flex items-center gap-6 p-6 border border-border bg-paper group hover:border-signal transition-colors">
                  <div className="w-2 h-2 bg-signal" />
                  <span className="uppercase tracking-widest font-bold">IMPACT-DRIVEN PROJECTS ONLY</span>
                </div>
                <div className="flex items-center gap-6 p-6 border border-border bg-paper group hover:border-signal transition-colors">
                  <div className="w-2 h-2 bg-signal" />
                  <span className="uppercase tracking-widest font-bold">GLOBAL MERITOCRACY MODEL</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Card className="bg-paper border-2 border-border" noPadding>
                <div className="bg-primary text-on-primary p-4 flex justify-between items-center">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest">INGRESS_PORTAL_VX.4</span>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 border border-on-primary/50"></div>
                    <div className="w-3 h-3 border border-on-primary/50 bg-on-primary"></div>
                  </div>
                </div>

                <div className="p-10 md:p-14">
                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-signal border-dashed bg-signal/5" role="status" aria-live="polite">
                      <Check size={64} className="text-signal mb-6" />
                      <h3 className="text-2xl font-bold text-foreground font-mono uppercase tracking-widest">Signal Received</h3>
                      <p className="text-muted text-sm mt-4 font-mono">Transmission verified. Awaiting internal review.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                      {errorMessage && (
                        <div className="border border-red-500 text-red-600 text-xs font-mono uppercase px-6 py-4 bg-red-500/5">
                          SYSTEM_ERROR: {errorMessage}
                        </div>
                      )}
                      
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label className={labelClasses}>Full Name</label>
                            <input {...register('name')} placeholder="Avery Morgan" className={inputClasses} />
                            {errors.name && <p className="text-red-600 text-[10px] font-mono mt-2 uppercase font-bold">Error: {errors.name.message}</p>}
                          </div>
                          <div>
                            <label className={labelClasses}>Email Address</label>
                            <input {...register('email')} placeholder="avery@cognetex.ai" type="email" className={inputClasses} />
                            {errors.email && <p className="text-red-600 text-[10px] font-mono mt-2 uppercase font-bold">Error: {errors.email.message}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label className={labelClasses}>Target Role</label>
                            <input {...register('role')} placeholder="Senior ML Engineer" className={inputClasses} />
                            {errors.role && <p className="text-red-600 text-[10px] font-mono mt-2 uppercase font-bold">Error: {errors.role.message}</p>}
                          </div>
                          <div>
                            <label className={labelClasses}>Current Location</label>
                            <input {...register('location')} placeholder="Dubai, UAE" className={inputClasses} />
                            {errors.location && <p className="text-red-600 text-[10px] font-mono mt-2 uppercase font-bold">Error: {errors.location.message}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label className={labelClasses}>Experience Level</label>
                            <select {...register('experience')} className={inputClasses}>
                              <option value="">Select Level</option>
                              <option value="3-5 Years">3-5 Years</option>
                              <option value="6-8 Years">6-8 Years</option>
                              <option value="9-12 Years">9-12 Years</option>
                              <option value="12+ Years">12+ Years</option>
                            </select>
                            {errors.experience && <p className="text-red-600 text-[10px] font-mono mt-2 uppercase font-bold">Error: {errors.experience.message}</p>}
                          </div>
                          <div>
                            <label className={labelClasses}>Current Availability</label>
                            <select {...register('availability')} className={inputClasses}>
                              <option value="Immediate">Immediate</option>
                              <option value="2-4 Weeks">2-4 Weeks</option>
                              <option value="1-2 Months">1-2 Months</option>
                              <option value="Flexible">Flexible</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label className={labelClasses}>Technical Portfolio</label>
                            <input {...register('portfolio')} placeholder="https://github.com/avery" className={inputClasses} />
                            {errors.portfolio && <p className="text-red-600 text-[10px] font-mono mt-2 uppercase font-bold">Error: {errors.portfolio.message}</p>}
                          </div>
                          <div>
                            <label className={labelClasses}>CV / Resume Link</label>
                            <input {...register('resume')} placeholder="https://drive.google.com/..." className={inputClasses} />
                            {errors.resume && <p className="text-red-600 text-[10px] font-mono mt-2 uppercase font-bold">Error: {errors.resume.message}</p>}
                          </div>
                        </div>

                        <div>
                          <label className={labelClasses}>Engineering Philosophy</label>
                          <textarea
                            {...register('message')}
                            rows={5}
                            placeholder="Share notable systems you've shipped or the technical impact you want to own."
                            className={`${inputClasses} resize-none`}
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button type="submit" fullWidth disabled={isSubmitting} size="lg" className="h-16 text-lg tracking-widest font-bold">
                          {isSubmitting ? (
                            <span className="flex items-center gap-3">
                              <Loader2 className="animate-spin w-5 h-5" /> SYNCHRONIZING...
                            </span>
                          ) : (
                            <span className="flex items-center gap-3 uppercase">
                              SEND APPLICATION <ArrowRight size={20} />
                            </span>
                          )}
                        </Button>
                        <p className="text-[10px] font-mono text-center text-muted uppercase mt-6 tracking-widest">
                          Encrypted Transmission Secured
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
