'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validation/schemas';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 800));
    toast.success('Message sent! We\'ll respond within 24 hours.');
    setSent(true);
    reset();
  };

  return (
    <div className="pt-20">
      <section className="py-20 bg-stone-950 text-center">
        <div className="relative max-w-2xl mx-auto px-4">
          <p className="text-gold-500 text-sm uppercase tracking-widest mb-3">Get in Touch</p>
          <h1 className="font-display text-5xl text-white mb-5">Contact Us</h1>
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent max-w-xs mx-auto mb-5" />
          <p className="text-stone-400 text-lg">We&apos;d love to hear from you. Reach out for bookings, enquiries, or a visit.</p>
        </div>
      </section>

      <section className="py-16 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <div className="card">
              <h2 className="font-display text-2xl text-stone-900 mb-6">Send a Message</h2>
              {sent ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✉️</div>
                  <h3 className="font-display text-xl text-stone-900 mb-2">Message Sent!</h3>
                  <p className="text-stone-600 text-sm mb-5">We&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="btn-secondary">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Your Name</label>
                      <input {...register('name')} className="input" placeholder="Full name" />
                      {errors.name && <p className="form-error">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="label">Phone (optional)</label>
                      <input {...register('phone')} className="input" placeholder="+250 78..." />
                    </div>
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input type="email" {...register('email')} className="input" placeholder="your@email.com" />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="label">Subject</label>
                    <input {...register('subject')} className="input" placeholder="How can we help?" />
                    {errors.subject && <p className="form-error">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="label">Message</label>
                    <textarea rows={5} {...register('message')} className="input resize-none" placeholder="Tell us more..." />
                    {errors.message && <p className="form-error">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: MapPin, title: 'Address', lines: ['KN 3 Ave, Kigali, Rwanda', 'Catholic Archdiocese of Kigali'] },
                { icon: Phone, title: 'Phone', lines: ['+250 78 123 4567', '+250 72 987 6543'] },
                { icon: Mail, title: 'Email', lines: ['info@domuspacis.rw', 'bookings@domuspacis.rw'] },
                { icon: Clock, title: 'Office Hours', lines: ['Mon – Fri: 7:00 AM – 6:00 PM', 'Sat – Sun: 8:00 AM – 4:00 PM'] },
              ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="card flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-gold-600" />
                  </div>
                  <div>
                    <div className="font-medium text-stone-900 mb-1">{title}</div>
                    {lines.map((l, i) => (
                      <div key={i} className="text-stone-600 text-sm">{l}</div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="card bg-stone-950 text-white">
                <h3 className="font-display text-xl mb-2 text-gold-300">Find Us</h3>
                <p className="text-stone-400 text-sm">Located in the heart of Kigali, opposite the Cathedral of Saint Michel, easily accessible from the city centre.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
