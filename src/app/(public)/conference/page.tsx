import type { Metadata } from 'next';
import Link from 'next/link';
import { Monitor, Mic, Wifi, Users, Coffee, Car } from 'lucide-react';

export const metadata: Metadata = { title: 'Conference Halls' };

const HALLS = [
  {
    id: 'boardroom',
    name: 'Boardroom',
    capacity: 20,
    pricePerDay: 120000,
    pricePerHour: 20000,
    description: 'Intimate boardroom setting ideal for executive meetings, board sessions, and small workshops.',
    features: ['70" Smart TV', 'Video conferencing', 'Whiteboard', 'Stationery', 'Coffee service'],
    layout: 'Boardroom',
    gradient: 'from-stone-700 to-stone-900',
  },
  {
    id: 'seminar',
    name: 'Seminar Hall',
    capacity: 80,
    pricePerDay: 250000,
    pricePerHour: 40000,
    description: 'Versatile hall suitable for seminars, training sessions, and mid-sized conferences with flexible seating.',
    features: ['Projector & screen', 'PA system', 'Podium', 'Catering service', 'Air conditioning', 'Wi-Fi'],
    layout: 'Theatre / Classroom',
    gradient: 'from-burgundy-900 to-stone-900',
  },
  {
    id: 'main-hall',
    name: 'Main Conference Hall',
    capacity: 200,
    pricePerDay: 500000,
    pricePerHour: 80000,
    description: 'Our flagship conference facility for large plenary sessions, AGMs, and multi-track conferences.',
    features: ['Dual projectors', 'Professional PA', 'Simultaneous translation', 'Stage & podium', 'Full catering', 'Breakout rooms'],
    layout: 'Theatre / Banquet / Classroom',
    gradient: 'from-gold-800 to-stone-950',
  },
];

export default function ConferencePage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-stone-950 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 to-stone-950" />
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-gold-500 text-sm uppercase tracking-widest mb-3">Meetings & Events</p>
          <h1 className="font-display text-5xl text-white mb-5">Conference Halls</h1>
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent max-w-xs mx-auto mb-5" />
          <p className="text-stone-400 text-lg">Professional, fully equipped spaces for every event size and format.</p>
        </div>
      </section>

      <section className="py-16 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {HALLS.map((hall) => (
            <div key={hall.id} className="card overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className={`lg:w-1/3 min-h-52 bg-gradient-to-br ${hall.gradient} flex items-center justify-center p-10`}>
                  <div className="text-center text-white">
                    <div className="font-display text-5xl font-bold text-gold-400 mb-2">{hall.capacity}</div>
                    <div className="text-stone-300 text-sm">delegates</div>
                    <div className="mt-3 text-xs text-stone-400 uppercase tracking-widest">{hall.layout}</div>
                  </div>
                </div>
                <div className="lg:w-2/3 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-2xl text-stone-900">{hall.name}</h3>
                      <div className="flex items-center gap-1.5 text-stone-500 text-sm mt-1">
                        <Users size={13} /> Up to {hall.capacity} delegates
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-stone-500 text-xs mb-1">From</div>
                      <div className="font-display text-xl text-stone-900">{(hall.pricePerHour).toLocaleString()} RWF/hr</div>
                      <div className="text-stone-400 text-xs">{(hall.pricePerDay).toLocaleString()} RWF/day</div>
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed mb-5">{hall.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                    {hall.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 rounded-lg px-3 py-2">
                        {f.includes('Wi-Fi') ? <Wifi size={12} className="text-gold-500" /> :
                         f.includes('projector') || f.includes('TV') ? <Monitor size={12} className="text-gold-500" /> :
                         f.includes('PA') || f.includes('Mic') ? <Mic size={12} className="text-gold-500" /> :
                         f.includes('Coffee') || f.includes('catering') ? <Coffee size={12} className="text-gold-500" /> :
                         f.includes('parking') ? <Car size={12} className="text-gold-500" /> :
                         <Users size={12} className="text-gold-500" />}
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link href={`/booking?type=CONFERENCE_HALL`} className="btn-primary">
                    Book This Hall
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
