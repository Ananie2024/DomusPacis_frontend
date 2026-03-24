import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Wedding Gardens' };

const GARDENS = [
  { id: 'rose', name: 'Rose Garden', guests: 150, price: 'TBA', desc: 'An intimate garden adorned with roses and hedgerows — perfect for elegant, smaller ceremonies.' },
  { id: 'main', name: 'Main Wedding Garden', guests: 350, price: 'TBA', desc: 'Our flagship outdoor venue with manicured lawns, water features, and a dedicated bridal suite.' },
  ];

export default function WeddingsPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-stone-950 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/30 to-stone-950" />
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-gold-500 text-sm uppercase tracking-widest mb-3">Celebrations</p>
          <h1 className="font-display text-5xl text-white mb-5 italic">Wedding Gardens</h1>
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent max-w-xs mx-auto mb-5" />
          <p className="text-stone-400 text-lg">Celebrate the beginning of your journey together in breathtaking outdoor settings.</p>
        </div>
      </section>

      <section className="py-16 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GARDENS.map((g) => (
              <div key={g.id} className="card-hover">
                <div className="h-48 bg-gradient-to-br from-rose-900 to-stone-900 rounded-xl mb-5 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-5xl mb-2">🌸</div>
                    <div className="text-gold-300 text-xs uppercase tracking-widest">Up to {g.guests} guests</div>
                  </div>
                </div>
                <h3 className="font-display text-xl text-stone-900 mb-2">{g.name}</h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">{g.desc}</p>
                <div className="flex items-center justify-between mb-5">
                  <div className="font-display text-lg text-stone-900">{g.price.toLocaleString()} RWF</div>
                  <div className="text-stone-400 text-xs">per event</div>
                </div>
                <Link href="/booking?type=WEDDING_GARDEN" className="btn-primary w-full justify-center">
                  Enquire & Book
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
