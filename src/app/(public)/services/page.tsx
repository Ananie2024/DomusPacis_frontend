import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export const metadata: Metadata = { title: 'Our Services' };

const SERVICES = [
  {
    id: 'rooms',
    title: 'Accommodation',
    subtitle: 'Comfortable Rooms & Suites',
    description: 'Our accommodation offers a sanctuary of rest and comfort. Each room is thoughtfully appointed with quality furnishings, private bathrooms, and free Wi-Fi — providing a peaceful retreat after a long journey or event.',
    features: ['Air conditioning', 'Free Wi-Fi', 'Daily housekeeping', 'Room service', 'Private bathroom', 'Balcony options'],
    href: '/rooms',
    icon: '🛏️',
    capacity: 'Single to Family Suites',
  },
  {
    id: 'conference',
    title: 'Conference Halls',
    subtitle: 'Professional Event Spaces',
    description: 'Host your meetings, seminars, workshops, and corporate events in our modern, fully equipped conference halls. We offer flexible seating arrangements, AV equipment, and dedicated catering.',
    features: ['Projector & screen', 'Audio system', 'Video conferencing', 'Catering service', 'Flexible layouts', 'Breakout rooms'],
    href: '/conference',
    icon: '🏛️',
    capacity: '20 to 300 delegates',
  },
  {
    id: 'weddings',
    title: 'Wedding Gardens',
    subtitle: 'Magical Outdoor Ceremonies',
    description: 'Exchange your vows in our beautifully landscaped gardens. Our wedding team provides end-to-end coordination to make your special day unforgettable, from decor to catering.',
    features: ['Landscaped gardens', 'Dedicated coordinator', 'Catering packages', 'Parking facilities', 'Bridal suite', 'Photography areas'],
    href: '/weddings',
    icon: '🌸',
    capacity: 'Up to 500 guests',
  },
  {
    id: 'retreats',
    title: 'Retreat Centres',
    subtitle: 'Spiritual & Personal Renewal',
    description: 'Our dedicated retreat facilities provide a quiet, prayerful atmosphere ideal for personal reflection, group retreats, religious communities, and spiritual renewal programmes.',
    features: ['Private chapel', 'Dining hall', 'Meditation spaces', 'Spiritual director', 'Group activities', 'Library access'],
    href: '/retreats',
    icon: '🕊️',
    capacity: 'Groups of 10–80',
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-stone-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/50 to-stone-950" />
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-gold-500 text-sm uppercase tracking-widest mb-3">Domus Pacis</p>
          <h1 className="font-display text-5xl text-white mb-5">Our Services</h1>
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent max-w-xs mx-auto mb-5" />
          <p className="text-stone-400 text-lg leading-relaxed">
            A complete range of hospitality services, delivered with faith, professionalism, and genuine care for every guest.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {SERVICES.map((svc, i) => (
            <div key={svc.id} className={`card overflow-hidden flex flex-col lg:flex-row ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''} gap-0`}>
              {/* Visual panel */}
              <div className="lg:w-2/5 min-h-[280px] bg-gradient-to-br from-stone-800 to-stone-950 flex items-center justify-center relative">
                <div className="text-center text-white z-10 p-10">
                  <div className="text-7xl mb-4">{svc.icon}</div>
                  <div className="font-display text-2xl text-gold-300">{svc.subtitle}</div>
                  <div className="text-stone-400 text-sm mt-2">{svc.capacity}</div>
                </div>
              </div>

              {/* Content panel */}
              <div className="lg:w-3/5 p-8 lg:p-10">
                <h2 className="font-display text-3xl text-stone-900 mb-3">{svc.title}</h2>
                <div className="w-12 h-0.5 bg-gold-500 mb-5" />
                <p className="text-stone-600 leading-relaxed mb-6">{svc.description}</p>

                <div className="grid grid-cols-2 gap-2 mb-8">
                  {svc.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-stone-700">
                      <Check size={14} className="text-gold-600 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Link href={svc.href} className="btn-secondary">
                    View Details <ArrowRight size={14} />
                  </Link>
                  <Link href="/booking" className="btn-primary">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
