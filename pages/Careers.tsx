import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/GlassCard';
import { SectionHeading } from '../components/SectionHeading';

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
      <section className="pt-24 md:pt-32 pb-16 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-end">
            <div className="lg:col-span-7">
              <span className="section-eyebrow mb-2">05. Careers</span>
              <h1 className="section-title md:text-6xl">
                BUILD THE SYSTEMS
                <br />
                THAT BUILD BUSINESS
              </h1>
              <p className="section-lead mt-6 max-w-2xl">
                Cognetex teams ship autonomous systems for enterprise-grade organizations. We value clear thinking,
                extreme ownership, and craft. If you want to push high-impact systems into production, you belong here.
              </p>
              <div className="flex items-center gap-4 mt-8 font-mono text-xs text-muted uppercase tracking-[0.2em]">
                <span className="w-10 h-px bg-border" />
                <span>Remote-First • Senior-Led • Delivery Obsessed</span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {highlights.map((item) => (
                  <div key={item.id} className="border border-border bg-paper p-5">
                    <p className="text-2xl font-bold text-foreground font-mono mb-2">{item.value}</p>
                    <p className="text-[10px] text-muted uppercase tracking-widest">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-paper border-b border-border">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
            {benefits.map((benefit, idx) => (
              <Card key={benefit.id} className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-muted">BEN_{benefit.id.substring(0, 2).toUpperCase()}</span>
                  <div className="w-8 h-8 border border-border flex items-center justify-center font-mono text-xs text-muted">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">{benefit.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{benefit.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div>
              <span className="section-eyebrow mb-2">02. Open Roles</span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">CURRENT MISSIONS</h2>
            </div>
            <p className="section-lead max-w-xl">
              We hire for depth, clarity, and delivery velocity. Each role owns outcomes from strategy through execution.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {roleCards.map((role) => (
              <Card key={role.id} hoverEffect className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono uppercase border border-border px-2 py-1 bg-background">
                    {role.team}
                  </span>
                  <span className="font-mono text-xs text-muted">ROLE_{role.id.substring(0, 3).toUpperCase()}</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{role.title}</h3>
                <p className="text-xs font-mono text-signal mb-4">// {role.location}</p>
                <p className="text-sm text-muted leading-relaxed mb-6">{role.summary}</p>
                <div className="mt-auto">
                  <div className="h-px w-full bg-border mb-4" />
                  <ul className="space-y-2">
                    {role.focus.map((item) => (
                      <li key={item} className="text-xs font-mono text-foreground flex items-center gap-2">
                        <span className="w-2 h-2 bg-signal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-paper border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div>
              <span className="section-eyebrow mb-2">03. Hiring Flow</span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">PRECISION IN FOUR STEPS</h2>
            </div>
            <p className="section-lead max-w-xl">
              Transparent, efficient, and optimized for senior-level candidates who value clarity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={step.id} className="border border-border bg-background p-6 relative">
                <span className="absolute top-4 right-4 text-[10px] font-mono text-muted">STEP_{idx + 1}</span>
                <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="section-eyebrow mb-2">04. Apply</span>
              <h2 className="section-title mb-6 md:mb-8 tracking-tighter">SUBMIT YOUR SIGNAL</h2>
              <p className="section-lead mb-8 md:mb-12">
                Tell us what you build, how you think, and where you want to grow. We review every submission within
                5 business days.
              </p>

              <div className="space-y-4 md:space-y-6 text-sm font-mono text-foreground">
                <div className="flex items-center gap-4 p-4 border border-border bg-paper">
                  <div className="w-2 h-2 bg-signal" />
                  <span>REMOTE-FIRST DELIVERY TEAMS</span>
                </div>
                <div className="flex items-center gap-4 p-4 border border-border bg-paper">
                  <div className="w-2 h-2 bg-signal" />
                  <span>IMPACT-DRIVEN PROJECTS ONLY</span>
                </div>
                <div className="flex items-center gap-4 p-4 border border-border bg-paper">
                  <div className="w-2 h-2 bg-signal" />
                  <span>COMPENSATION REVIEWED PER ROLE</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Card className="bg-paper shadow-hard" noPadding>
                <div className="bg-primary text-on-primary p-4 flex justify-between items-center">
                  <span className="font-mono text-xs">CAREER_PROTOCOL</span>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 border border-on-primary/50"></div>
                    <div className="w-3 h-3 border border-on-primary/50 bg-on-primary"></div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-green-500 border-dashed" role="status" aria-live="polite">
                      <Check size={48} className="text-green-500 mb-4" />
                      <h3 className="text-xl font-bold text-foreground font-mono uppercase">Signal Received</h3>
                      <p className="text-muted text-sm mt-2">We will follow up with next steps shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {errorMessage && (
                        <div className="border border-red-500 text-red-600 text-xs font-mono uppercase px-4 py-3">
                          {errorMessage}
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClasses}>Full Name</label>
                          <input {...register('name')} placeholder="Avery Morgan" className={inputClasses} />
                          {errors.name && <p className="text-red-600 text-[10px] font-mono mt-1 uppercase">Error: {errors.name.message}</p>}
                        </div>
                        <div>
                          <label className={labelClasses}>Email</label>
                          <input {...register('email')} placeholder="avery@domain.com" type="email" className={inputClasses} />
                          {errors.email && <p className="text-red-600 text-[10px] font-mono mt-1 uppercase">Error: {errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClasses}>Role</label>
                          <input {...register('role')} placeholder="Senior ML Engineer" className={inputClasses} />
                          {errors.role && <p className="text-red-600 text-[10px] font-mono mt-1 uppercase">Error: {errors.role.message}</p>}
                        </div>
                        <div>
                          <label className={labelClasses}>Location</label>
                          <input {...register('location')} placeholder="Dubai, UAE" className={inputClasses} />
                          {errors.location && <p className="text-red-600 text-[10px] font-mono mt-1 uppercase">Error: {errors.location.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClasses}>Experience</label>
                          <select {...register('experience')} className={inputClasses}>
                            <option value="">Select</option>
                            <option value="3-5 Years">3-5 Years</option>
                            <option value="6-8 Years">6-8 Years</option>
                            <option value="9-12 Years">9-12 Years</option>
                            <option value="12+ Years">12+ Years</option>
                          </select>
                          {errors.experience && <p className="text-red-600 text-[10px] font-mono mt-1 uppercase">Error: {errors.experience.message}</p>}
                        </div>
                        <div>
                          <label className={labelClasses}>Availability</label>
                          <select {...register('availability')} className={inputClasses}>
                            <option value="Immediate">Immediate</option>
                            <option value="2-4 Weeks">2-4 Weeks</option>
                            <option value="1-2 Months">1-2 Months</option>
                            <option value="Flexible">Flexible</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClasses}>Portfolio / LinkedIn</label>
                          <input {...register('portfolio')} placeholder="https://linkedin.com/in/" className={inputClasses} />
                          {errors.portfolio && <p className="text-red-600 text-[10px] font-mono mt-1 uppercase">Error: {errors.portfolio.message}</p>}
                        </div>
                        <div>
                          <label className={labelClasses}>Resume URL</label>
                          <input {...register('resume')} placeholder="https://drive.google.com/" className={inputClasses} />
                          {errors.resume && <p className="text-red-600 text-[10px] font-mono mt-1 uppercase">Error: {errors.resume.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label className={labelClasses}>Why Cognetex (Optional)</label>
                        <textarea
                          {...register('message')}
                          rows={4}
                          placeholder="Share what drives you, notable systems you shipped, or the impact you want to own."
                          className={`${inputClasses} resize-none`}
                        />
                      </div>

                      <Button type="submit" fullWidth disabled={isSubmitting} size="lg">
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin w-4 h-4" /> SENDING...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            SUBMIT APPLICATION <ArrowRight size={16} />
                          </span>
                        )}
                      </Button>
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
