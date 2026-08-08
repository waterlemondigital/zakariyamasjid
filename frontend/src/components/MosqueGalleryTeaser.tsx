import React, { useState } from 'react';
import { Camera, Sparkles, Building, Crosshair, ArrowRight, Layers } from 'lucide-react';
import { ArchFrame } from './ArchFrame';
import { Link } from 'react-router-dom';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Masjid' | 'Kabristan' | 'Madrasa' | 'Welfare';
  image: string;
  desc: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Main Prayer Hall & Mihrab',
    category: 'Masjid',
    image: 'https://images.unsplash.com/photo-1542816417-0983cbe82752?q=80&w=1000&auto=format&fit=crop',
    desc: 'Spacious air-conditioned prayer hall accommodating up to 1,500 worshippers for Jumuah and Eid prayers.',
  },
  {
    id: '2',
    title: 'Kabristan Grounds & Boundary Wall',
    category: 'Kabristan',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1000&auto=format&fit=crop',
    desc: 'Sanctified cemetery grounds maintained with cleanliness, paved walkways, security fencing, and night lighting.',
  },
  {
    id: '3',
    title: 'Wudu Khana & Ablution Area',
    category: 'Masjid',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1000&auto=format&fit=crop',
    desc: 'Hygienic, continuous running water Wudu facilities with sitting benches and clean footwear storage.',
  },
  {
    id: '4',
    title: 'Madrasa Learning Classrooms',
    category: 'Madrasa',
    image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1000&auto=format&fit=crop',
    desc: 'Quiet classroom spaces dedicated to daily Nazra, Tajweed, and Hifz classes for local neighborhood youth.',
  },
];

export const MosqueGalleryTeaser: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Masjid' | 'Kabristan' | 'Madrasa'>('All');

  const filteredItems = filter === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] block">
          Visual Tour &amp; Facilities
        </span>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F4C36]">
          Experience Zakariya Masjid &amp; Kabristan
        </h2>
        <p className="text-sm text-[#22261F]/70">
          A glimpse into our sacred prayer halls, clean ablution facilities, and peaceful burial grounds
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {(['All', 'Masjid', 'Kabristan', 'Madrasa'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-[#0F4C36] text-[#F3E5AB] border border-[#D4AF37] shadow-md'
                  : 'bg-[#FAF7F0] text-[#0F4C36] border border-[#D4AF37]/40 hover:border-[#D4AF37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border-2 border-[#D4AF37]/40 overflow-hidden shadow-lg hover:border-[#D4AF37] hover:shadow-2xl transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="relative overflow-hidden h-52 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-[#0F4C36] text-[#F3E5AB] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-[#D4AF37] shadow-md">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-[#0F4C36] text-lg mb-2">{item.title}</h3>
                <p className="text-xs text-[#22261F]/80 leading-relaxed">{item.desc}</p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-gray-100 mt-2">
              <Link
                to={item.category === 'Kabristan' ? '/kabristan' : '/masjid'}
                className="text-xs font-bold uppercase tracking-wider text-[#0F4C36] hover:text-[#B8860B] transition-colors flex items-center justify-between pt-3"
              >
                <span>View Details</span> <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
