import type { Metadata } from 'next';
import Link from 'next/link';
import { Wifi, Wind, Coffee, Star, Users } from 'lucide-react';

export const metadata: Metadata = { title: 'Rooms & Accommodation' };

const ROOMS = [
  {
    id: 'standard',
    name: 'Standard Room',
    price: 'TBA',
    capacity: 1,
    bedType: 'Single Bed',
    description: 'A cosy, well-appointed room perfect for solo travellers and pilgrims seeking peaceful rest.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Daily Housekeeping'],
    gradient: 'from-stone-700 to-stone-900',
    popular: false,
  },
  {
    id: 'double',
    name: 'Double Room',
    price: 'TBA',
    capacity: 2,
    bedType: 'Double Bed',
    description: 'Spacious and comfortable for couples or business travellers, with garden or courtyard views.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Room Service', 'Work Desk'],
    gradient: 'from-burgundy-900 to-stone-900',
    popular: true,
  },
  {
    id: 'twin',
    name: 'Twin Room',
    price: 'TBA',
    capacity: 2,
    bedType: 'Two Single Beds',
    description: 'Ideal for colleagues or friends travelling together, offering two comfortable single beds.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'Wardrobe', 'Daily Housekeeping'],
    gradient: 'from-stone-800 to-stone-950',
    popular: false,
  },
  {
    id: 'suite',
    name: 'Suite',
    price: 'TBA',
    capacity: 3,
    bedType: 'King Bed + Sofa',
    description: 'Our most luxurious offering — a separate living area, premium furnishings and panoramic views.',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Kitchenette', 'Living Area', 'Balcony', 'Room Service'],
    gradient: 'from-gold-800 to-stone-950',
    popular: false,
  },
];

export default function RoomsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-stone-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 to-stone-950" />
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-gold-500 text-sm uppercase tracking-widest mb-3">Accommodation</p>
          <h1 className="font-display text-5xl text-white mb-5">Rooms & Suites</h1>
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent max-w-xs mx-auto mb-5" />
          <p className="text-stone-400 text-lg leading-relaxed">
            Rest in comfort and peace. Our rooms are designed to refresh body and spirit.
          </p>
        </div>
      </section>

      {/* Rooms grid */}
      <section className="py-16 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ROOMS.map((room) => (
              <div key={room.id} className="card overflow-hidden hover:shadow-card-hover transition-shadow duration-300 relative">
                {room.popular && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-gold-500 text-white text-xs font-medium">
                    <Star size={10} className="fill-white" /> Most Popular
                  </div>
                )}

                {/* Room visual */}
                <div className={`h-48 bg-gradient-to-br ${room.gradient} flex items-end p-6`}>
                  <div>
                    <div className="text-gold-300 text-xs uppercase tracking-widest mb-1">{room.bedType}</div>
                    <h3 className="font-display text-2xl text-white">{room.name}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-stone-600 text-sm">
                      <Users size={14} /> {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'}
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl text-stone-900">{(room.price).toLocaleString()} RWF</div>
                      <div className="text-stone-400 text-xs">per night</div>
                    </div>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed mb-4">{room.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {room.amenities.map((a) => (
                      <span key={a} className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 text-stone-600 rounded-full text-xs">
                        {a === 'Free Wi-Fi' ? <Wifi size={10} /> : a === 'Air Conditioning' ? <Wind size={10} /> : <Coffee size={10} />}
                        {a}
                      </span>
                    ))}
                  </div>

                  <Link href={`/booking?asset=${room.id}&type=ROOM`} className="btn-primary w-full justify-center">
                    Book This Room
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
