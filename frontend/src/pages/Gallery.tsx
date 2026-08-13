import React, { useState } from 'react';
import { BeforeAfterSet } from '../types';
import { SectionDivider } from '../components/SectionDivider';
import { CTASection } from '../components/CTASection';
import {
  Camera,
  X,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Filter,
} from 'lucide-react';

// ──────────────────────────────────────────────────────────
//  Before & After Data — 12 Sets
//  Replace image paths with your actual images inside
//  assets/images/gallery/  (served as /images/gallery/*)
// ──────────────────────────────────────────────────────────
const beforeAfterSets: BeforeAfterSet[] = [
  {
    id: 'set-01',
    title: 'Outdoor Approach Road & Parking Area',
    category: 'facilities',
    description: 'The muddy, waterlogged approach road outside the masjid was transformed into a properly paved parking area with organized vehicle parking for worshippers attending daily Namaz and Jumu\'ah.',
    beforeImage: '/images/gallery/Part_1_Outdoor_Approach_Road_and_Parking/before.jpeg',
    afterImage: '/images/gallery/Part_1_Outdoor_Approach_Road_and_Parking/after.jpeg',
    beforeLabel: 'Before — Muddy & Waterlogged',
    afterLabel: 'After — Paved & Organized',
    completedDate: 'Feb 2023',
  },
  {
    id: 'set-02',
    title: 'Main Prayer Hall Flooring',
    category: 'masjid',
    description: 'The prayer hall had bare cracked concrete flooring with old ceiling fans. It was completely re-done with smooth polished flooring, new structural supports, and improved lighting for a clean worship space.',
    beforeImage: '/images/gallery/Part_2_Main_Prayer_Hall/before.jpeg',
    afterImage: '/images/gallery/Part_2_Main_Prayer_Hall/after.jpeg',
    beforeLabel: 'Before — Cracked Concrete',
    afterLabel: 'After — Polished Flooring',
    completedDate: 'Feb 2025',
  },
  {
    id: 'set-03',
    title: 'Wudhu (Ablution) Area Reconstruction',
    category: 'facilities',
    description: 'The old Wudu area with stained tiles, worn-out sitting blocks, and basic taps was completely reconstructed with modern stone seating, new chrome taps, anti-skid flooring, and a clean drainage system.',
    beforeImage: '/images/gallery/Part_3_Wudhu_Ablution_Area/before.jpeg',
    afterImage: '/images/gallery/Part_3_Wudhu_Ablution_Area/after.jpeg',
    beforeLabel: 'Before — Old & Worn Out',
    afterLabel: 'After — Modern & Clean',
    completedDate: 'Aug 2026',
  },
  {
    id: 'set-04',
    title: 'Prayer Hall Side Wall & Floor Reconstruction',
    category: 'masjid',
    description: 'The prayer hall viewed from the side wall had severely cracked and uneven concrete flooring. Workers laid fresh rebar reinforcement mesh and poured new concrete to create a level, durable floor surface.',
    beforeImage: '/images/gallery/Part_4_Hall_Side_Wall_Perspective/before.jpeg',
    afterImage: '/images/gallery/Part_4_Hall_Side_Wall_Perspective/after.jpeg',
    beforeLabel: 'Before — Cracked & Uneven',
    afterLabel: 'During — Concrete Pouring',
    completedDate: '2025',
  },
  {
    id: 'set-05',
    title: 'Side Alley Pathway to Tower',
    category: 'facilities',
    description: 'The narrow alley alongside the masjid boundary wall was a rough dirt and rubble path. It was leveled and paved with fresh concrete using a mixer truck, providing safe pedestrian access to the tower side.',
    beforeImage: '/images/gallery/Part_5_Alley_View_To_Tower/before.jpeg',
    afterImage: '/images/gallery/Part_5_Alley_View_To_Tower/after.jpeg',
    beforeLabel: 'Before — Rubble & Dirt',
    afterLabel: 'During — Concrete Paving',
    completedDate: '2025',
  },
  {
    id: 'set-06',
    title: 'Compound Wall Pathway & Parking',
    category: 'facilities',
    description: 'The area along the compound wall was a muddy, waterlogged stretch making access difficult during monsoon. It was fully paved into an organized parking zone with concrete surfacing for worshippers\' vehicles.',
    beforeImage: '/images/gallery/Part_6_Compound_Wall_Path/before.jpeg',
    afterImage: '/images/gallery/Part_6_Compound_Wall_Path/after.jpeg',
    beforeLabel: 'Before — Muddy & Waterlogged',
    afterLabel: 'After — Paved Parking',
    completedDate: '2023',
  },
  {
    id: 'set-07',
    title: 'Green Fence Side Drainage & Pathway',
    category: 'facilities',
    description: 'The area along the green corrugated fence had severe waterlogging with rocks and open drainage. Workers laid a proper membrane base and poured concrete to create a solid, well-drained walkway.',
    beforeImage: '/images/gallery/Part_7_Green_Fence_Drainage_Path/before.jpeg',
    afterImage: '/images/gallery/Part_7_Green_Fence_Drainage_Path/after.jpeg',
    beforeLabel: 'Before — Rocks & Waterlogging',
    afterLabel: 'During — Concrete Laying',
    completedDate: '2025',
  },
];

type CategoryFilter = 'all' | 'masjid' | 'kabristan' | 'facilities' | 'community';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [lightboxSet, setLightboxSet] = useState<BeforeAfterSet | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredSets =
    activeFilter === 'all'
      ? beforeAfterSets
      : beforeAfterSets.filter((s) => s.category === activeFilter);

  // Lightbox navigation
  const openLightbox = (set: BeforeAfterSet) => {
    const idx = filteredSets.findIndex((s) => s.id === set.id);
    setLightboxIndex(idx);
    setLightboxSet(set);
  };

  const goToLightbox = (direction: 'prev' | 'next') => {
    const newIdx =
      direction === 'next'
        ? (lightboxIndex + 1) % filteredSets.length
        : (lightboxIndex - 1 + filteredSets.length) % filteredSets.length;
    setLightboxIndex(newIdx);
    setLightboxSet(filteredSets[newIdx]);
  };

  const categoryTabs: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'masjid', label: 'Masjid' },
    { id: 'facilities', label: 'Facilities' },
  ];

  const categoryColors: Record<string, string> = {
    masjid: 'bg-[#0F4C36] text-[#F3E5AB]',
    kabristan: 'bg-[#5C3D1E] text-[#F3E5AB]',
    facilities: 'bg-[#1C6B4A] text-[#F3E5AB]',
    community: 'bg-[#B8860B] text-white',
  };

  return (
    <div className="py-12 md:py-20 bg-[#FAF7F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* ═══════════════ HEADER ═══════════════ */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#0F4C36] text-[#F3E5AB] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#D4AF37]">
            <Camera className="w-4 h-4 text-[#D4AF37]" /> Before &amp; After Gallery
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F4C36] leading-tight">
            Our Transformation Journey
          </h1>
          <p className="text-base md:text-lg text-[#22261F]/80 max-w-2xl mx-auto">
            Witness the Alhamdulillah progress — from humble beginnings to beautiful service. Every improvement is made possible by your generous Sadaqah &amp; support.
          </p>
          <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full mt-2"></div>
        </div>


        {/* ═══════════════ FILTER TABS ═══════════════ */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#D4AF37]/30 pb-5">
          <Filter className="w-4 h-4 text-[#B8860B] mr-1 hidden sm:block" />
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider transition-all ${
                activeFilter === tab.id
                  ? 'bg-[#0F4C36] text-[#F3E5AB] shadow-md border-2 border-[#D4AF37]'
                  : 'bg-white text-[#22261F]/80 hover:bg-[#0F4C36]/5 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ═══════════════ BEFORE / AFTER GRID ═══════════════ */}
        <div className="space-y-10">
          {filteredSets.map((set, idx) => (
            <div
              key={set.id}
              className="bg-white rounded-3xl border-2 border-[#D4AF37]/40 shadow-lg overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 group"
            >
              {/* Card Header */}
              <div className="px-6 pt-6 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#D4AF37]/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F4C36] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-sm border border-[#D4AF37] shadow-sm flex-shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-[#0F4C36] leading-snug group-hover:text-[#B8860B] transition-colors">
                      {set.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#D4AF37]/30 ${categoryColors[set.category] || ''}`}>
                    {set.category}
                  </span>
                </div>
              </div>

              {/* Side-by-Side Image Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* BEFORE */}
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-red-300 animate-pulse"></span>
                      {set.beforeLabel || 'Before'}
                    </span>
                  </div>
                  <img
                    src={set.beforeImage}
                    alt={`Before: ${set.title}`}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>

                {/* Gold Divider Strip (visible on md+) */}
                {/* Handled by the grid gap and a center accent */}

                {/* AFTER */}
                <div className="relative border-t md:border-t-0 md:border-l-4 border-[#D4AF37]">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                      <Sparkles className="w-3 h-3 text-[#F3E5AB]" />
                      {set.afterLabel || 'After'}
                    </span>
                  </div>
                  <img
                    src={set.afterImage}
                    alt={`After: ${set.title}`}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </div>

              {/* Card Footer — Expand Button */}
              <div className="px-6 py-4 bg-[#FAF7F0] border-t border-[#D4AF37]/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-[#0F4C36]/70 uppercase tracking-wider">
                    Project #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <button
                  onClick={() => openLightbox(set)}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F4C36] hover:text-[#D4AF37] transition-colors bg-white px-4 py-2 rounded-lg border border-[#D4AF37]/40 hover:border-[#D4AF37] shadow-sm"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> View Full Size
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSets.length === 0 && (
          <div className="text-center py-20">
            <Camera className="w-12 h-12 text-[#D4AF37]/50 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-[#0F4C36]/60">No projects in this category</h3>
            <p className="text-sm text-[#22261F]/50 mt-1">Try selecting a different filter above.</p>
          </div>
        )}

        {/* ═══════════════ LIGHTBOX MODAL ═══════════════ */}
        {lightboxSet && (
          <div
            className="fixed inset-0 z-50 bg-black/25 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setLightboxSet(null)}
          >
            <div
              className="relative w-full max-w-6xl bg-[#0F4C36] rounded-3xl border-2 border-[#D4AF37] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxSet(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-[#D4AF37] hover:text-[#0F4C36] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={() => goToLightbox('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-[#D4AF37] hover:text-[#0F4C36] transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => goToLightbox('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-[#D4AF37] hover:text-[#0F4C36] transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="px-6 py-4 border-b border-[#D4AF37]/30 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-white">{lightboxSet.title}</h3>
                </div>
                <span className="text-xs font-bold text-[#F3E5AB] bg-white/10 px-3 py-1 rounded-full border border-[#D4AF37]/40">
                  {lightboxIndex + 1} / {filteredSets.length}
                </span>
              </div>

              {/* Side-by-Side Full View */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-red-300 animate-pulse"></span>
                      {lightboxSet.beforeLabel || 'Before'}
                    </span>
                  </div>
                  <img
                    src={lightboxSet.beforeImage}
                    alt={`Before: ${lightboxSet.title}`}
                    className="w-full h-72 md:h-[50vh] object-cover"
                  />
                </div>
                <div className="relative border-t md:border-t-0 md:border-l-4 border-[#D4AF37]">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                      <Sparkles className="w-3 h-3 text-[#F3E5AB]" />
                      {lightboxSet.afterLabel || 'After'}
                    </span>
                  </div>
                  <img
                    src={lightboxSet.afterImage}
                    alt={`After: ${lightboxSet.title}`}
                    className="w-full h-72 md:h-[50vh] object-cover"
                  />
                </div>
              </div>

              {/* Footer Info */}
              <div className="px-6 py-3 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs text-white/60">
                <span className="uppercase tracking-wider font-bold">{lightboxSet.category}</span>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ HOW TO ADD IMAGES NOTE ═══════════════ */}
        <div className="bg-[#0F4C36]/5 border border-[#0F4C36]/30 rounded-2xl p-5 text-center max-w-3xl mx-auto space-y-2">
          <p className="text-xs text-[#0F4C36] font-semibold">
            <strong>📸 Gallery Updates:</strong> New before &amp; after project photos are added regularly by the Trust management. 
            All projects are funded entirely by community Sadaqah and Zakat contributions.
          </p>
        </div>

        <SectionDivider />
        <CTASection />
      </div>
    </div>
  );
};
