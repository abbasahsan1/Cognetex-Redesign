import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './Button';
import { Card } from './GlassCard';
import { Check, Loader2, ArrowRight } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "REQUIRED_FIELD" }),
  email: z.string().email({ message: "INVALID_FORMAT" }),
  projectType: z.enum(['AI Integration', 'Full Stack Build', 'Consultation']),
  budget: z.enum(['<$10k', '$10k-$50k', '$50k+']),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: 'AI Integration',
      budget: '$10k-$50k',
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const inputClasses = "w-full bg-paper border border-border rounded-none px-4 py-3 text-foreground placeholder-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-mono";
  const labelClasses = "block text-xs font-bold text-foreground mb-2 uppercase tracking-wide";

  return (
    <section id="contact" className="py-16 md:py-24 relative bg-paper border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-5">
            <span className="font-mono text-xs text-signal uppercase tracking-wider mb-2 block">04. Initiation</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 md:mb-8 tracking-tighter">
              READY TO<br/>SCALE?
            </h2>
            <p className="text-muted text-lg mb-8 md:mb-12 leading-relaxed">
              Software is a craft; AI is the chisel. We provide the precision.
            </p>
            
            <div className="space-y-4 md:space-y-6 text-sm font-mono text-foreground">
              <div className="flex items-center gap-4 p-4 border border-border bg-background">
                <div className="w-2 h-2 bg-signal" />
                <span>SOC2-READY DEVELOPMENT</span>
              </div>
              <div className="flex items-center gap-4 p-4 border border-border bg-background">
                <div className="w-2 h-2 bg-signal" />
                <span>NDAs AVAILABLE ON REQUEST</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card className="bg-background shadow-hard" noPadding>
              <div className="bg-primary text-on-primary p-4 flex justify-between items-center">
                <span className="font-mono text-xs">CONTACT_PROTOCOL</span>
                <div className="flex gap-2">
                   <div className="w-3 h-3 border border-on-primary/50"></div>
                   <div className="w-3 h-3 border border-on-primary/50 bg-on-primary"></div>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-green-500 border-dashed">
                    <Check size={48} className="text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-foreground font-mono uppercase">Transmission Received</h3>
                    <p className="text-muted text-sm mt-2">Our team will analyze your parameters shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <label className={labelClasses}>Name</label>
                        <input {...register('name')} placeholder="John Doe" className={inputClasses} />
                        {errors.name && <p className="text-red-600 text-[10px] font-mono mt-1 uppercase">Error: {errors.name.message}</p>}
                        </div>

                        <div>
                        <label className={labelClasses}>Email</label>
                        <input {...register('email')} placeholder="john@company.com" type="email" className={inputClasses} />
                        {errors.email && <p className="text-red-600 text-[10px] font-mono mt-1 uppercase">Error: {errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>Project Type</label>
                        <select {...register('projectType')} className={inputClasses}>
                          <option value="AI Integration">AI Integration</option>
                          <option value="Full Stack Build">Full Stack Build</option>
                          <option value="Consultation">Consultation</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelClasses}>Budget</label>
                        <select {...register('budget')} className={inputClasses}>
                          <option value="<$10k">&lt;$10k</option>
                          <option value="$10k-$50k">$10k-$50k</option>
                          <option value="$50k+">$50k+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                       <label className={labelClasses}>Specs (Optional)</label>
                       <textarea
                        {...register('message')}
                        rows={4}
                        placeholder="Define system requirements..."
                        className={`${inputClasses} resize-none`}
                       />
                    </div>

                    <Button type="submit" fullWidth disabled={isSubmitting} size="lg">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin w-4 h-4" /> EXECUTING...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                            TRANSMIT DATA <ArrowRight size={16} />
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
  );
};