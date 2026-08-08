import React from 'react';
import { DonationCategory } from '../types';
import { Heart, Building, Droplets, Zap, Hammer, Layers, Gift, Moon, Sparkles, Crosshair } from 'lucide-react';

interface CategoryCardProps {
  category: DonationCategory;
  isSelected?: boolean;
  onSelect: (category: DonationCategory) => void;
}

export const DonationCategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected = false,
  onSelect,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sadaqah':
        return <Heart className="w-6 h-6" />;
      case 'Zakat':
        return <Sparkles className="w-6 h-6" />;
      case 'Masjid':
        return <Building className="w-6 h-6" />;
      case 'Kabristan':
        return <Crosshair className="w-6 h-6" />;
      case 'Water':
        return <Droplets className="w-6 h-6" />;
      case 'Electricity':
        return <Zap className="w-6 h-6" />;
      case 'Construction':
        return <Hammer className="w-6 h-6" />;
      case 'General':
        return <Layers className="w-6 h-6" />;
      case 'Fitra':
        return <Gift className="w-6 h-6" />;
      case 'Ramadan':
        return <Moon className="w-6 h-6" />;
      default:
        return <Heart className="w-6 h-6" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(category)}
      className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-[#0F4C36] text-white border-[#D4AF37] shadow-xl scale-[1.02] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
          : 'bg-white text-[#22261F] border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      {category.popular && (
        <div className="absolute -top-3 right-4 gold-gradient-bg text-[#0F4C36] font-extrabold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
          High Need
        </div>
      )}

      <div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
            isSelected ? 'gold-gradient-bg text-[#0F4C36] shadow-md' : 'bg-[#0F4C36]/10 text-[#0F4C36]'
          }`}
        >
          {getIcon(category.iconName)}
        </div>

        <h4 className={`font-serif font-bold text-lg mb-1.5 ${isSelected ? 'text-white' : 'text-[#0F4C36]'}`}>
          {category.title}
        </h4>
        <p className={`text-xs leading-relaxed ${isSelected ? 'text-white/90' : 'text-[#22261F]/70'}`}>
          {category.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-current/10 flex items-center justify-between">
        <span className={`text-xs font-semibold uppercase tracking-wider ${isSelected ? 'text-[#F3E5AB]' : 'text-[#0F4C36]'}`}>
          {isSelected ? '✓ Category Selected' : 'Select Category'}
        </span>
        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]' : 'bg-gray-300'}`}></span>
      </div>
    </div>
  );
};
