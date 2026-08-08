import React, { useState } from 'react';
import { ArchFrame } from '../components/ArchFrame';
import { GalleryItem } from '../types';
import { SectionDivider } from '../components/SectionDivider';
import { CTASection } from '../components/CTASection';
import { Camera, X, Image as ImageIcon } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'masjid' | 'kabristan' | 'events' | 'ramadan'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Zakariya Masjid Main Prayer Hall',
      category: 'masjid',
      imageUrl: 'https://images.unsplash.com/photo-1542816417-0983cbe82752?q=80&w=1000&auto=format&fit=crop',
      caption: 'Main prayer hall carpeted and air-conditioned for daily congregational namaz.',
    },
    {
      id: '2',
      title: 'Archway Entrance & Courtyard',
      category: 'masjid',
      imageUrl: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?q=80&w=1000&auto=format&fit=crop',
      caption: 'Traditional Islamic archways framing the entrance courtyards.',
    },
    {
      id: '3',
      title: 'Kabristan Pathway & Greenery',
      category: 'kabristan',
      imageUrl: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1000&auto=format&fit=crop',
      caption: 'Clean, illuminated pathways and serene trees within the Kabristan grounds.',
    },
    {
      id: '4',
      title: 'Ramadan Iftar Community Gathering',
      category: 'ramadan',
      imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1000&auto=format&fit=crop',
      caption: 'Daily Iftar meals provided to fasting community members during Ramadan.',
    },
    {
      id: '5',
      title: 'Children Qur\'an Tajweed Madrasa',
      category: 'events',
      imageUrl: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1000&auto=format&fit=crop',
      caption: 'Daily evening Qur\'an and Tajweed classes for neighborhood youth.',
    },
    {
      id: '6',
      title: 'Night Illumination of Minaret',
      category: 'masjid',
      imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1000&auto=format&fit=crop',
      caption: 'Illuminated minaret during Isha prayers at Zakariya Masjid.',
    },
    {
      id: '7',
      title: 'Jumu\'ah Congregation Gathering',
      category: 'masjid',
      imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop',
      caption: 'Full congregation gathered for Friday Jumu\'ah prayer and khutbah.',
    },
    {
      id: '8',
      title: 'Eid-ul-Fitr Morning Prayer',
      category: 'ramadan',
      imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000&auto=format&fit=crop',
      caption: 'Special Eid morning prayer and community greetings.',
    },
  ];

  const filteredItems = activeTab === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <div className="py-12 md:py-20 bg-[#FAF7F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0F4C36] text-[#E8D08A] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#C9A227]">
            <Camera className="w-4 h-4 text-[#C9A227]" /> Visual Archives
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C36]">
            Photo &amp; Media Gallery
          </h1>
          <p className="text-base text-[#22261F]/80">
            A visual glance into Zakariya Masjid, Kabristan grounds, Ramadan gatherings, and community activities.
          </p>
          <div className="w-20 h-1 bg-[#C9A227] mx-auto rounded-full mt-3"></div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#C9A227]/30 pb-4">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'masjid', label: 'Masjid Architecture' },
            { id: 'kabristan', label: 'Kabristan Grounds' },
            { id: 'events', label: 'Community & Madrasa' },
            { id: 'ramadan', label: 'Ramadan &amp; Eid' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-[#0F4C36] text-[#E8D08A] shadow-md border-2 border-[#C9A227]'
                  : 'bg-white text-[#22261F]/80 hover:bg-[#FAF7F0] border border-gray-200'
              }`}
              dangerouslySetInnerHTML={{ __html: tab.label }}
            ></button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="cursor-pointer group"
            >
              <ArchFrame className="h-full">
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                    <span className="text-[10px] uppercase font-bold text-[#E8D08A] tracking-widest">{item.category}</span>
                    <h4 className="font-serif font-bold text-base">{item.title}</h4>
                    <p className="text-xs text-white/80 line-clamp-2 mt-1">{item.caption}</p>
                  </div>
                </div>
              </ArchFrame>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex items-center justify-center animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#0F4C36] text-white rounded-3xl border-2 border-[#C9A227] overflow-hidden shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-[#C9A227] hover:text-[#0F4C36] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="arch-top overflow-hidden border-2 border-[#C9A227]/40 mb-4 bg-black">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full max-h-[60vh] object-contain mx-auto"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E8D08A]">
                  Category: {selectedImage.category}
                </span>
                <h3 className="font-serif text-2xl font-bold">{selectedImage.title}</h3>
                <p className="text-sm text-white/80">{selectedImage.caption}</p>
              </div>
            </div>
          </div>
        )}

        <SectionDivider />
        <CTASection />
      </div>
    </div>
  );
};
