import React, { useState } from 'react';
import { RotateCcw, Sparkles, Volume2, Award, HeartHandshake } from 'lucide-react';

interface DhikrItem {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  target: number;
}

const DHIKR_LIST: DhikrItem[] = [
  { id: 'subhanallah', arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'SubhanAllah', meaning: 'Glory be to Allah', target: 33 },
  { id: 'alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alhamdulillah', meaning: 'Praise be to Allah', target: 33 },
  { id: 'allahuakbar', arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', meaning: 'Allah is the Greatest', target: 34 },
  { id: 'astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', transliteration: 'Astaghfirullah', meaning: 'I seek forgiveness from Allah', target: 100 },
  { id: 'salawat', arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ', transliteration: 'Allahumma Salli Ala Muhammad', meaning: 'Blessings upon Prophet Muhammad ﷺ', target: 100 },
];

export const DigitalTasbeeh: React.FC = () => {
  const [selectedDhikr, setSelectedDhikr] = useState<DhikrItem>(DHIKR_LIST[0]);
  const [count, setCount] = useState<number>(0);
  const [rounds, setRounds] = useState<number>(0);

  const handleIncrement = () => {
    const nextCount = count + 1;
    if (nextCount >= selectedDhikr.target) {
      setCount(0);
      setRounds((r) => r + 1);
    } else {
      setCount(nextCount);
    }
  };

  const handleReset = () => {
    setCount(0);
    setRounds(0);
  };

  const handleSelectDhikr = (d: DhikrItem) => {
    setSelectedDhikr(d);
    setCount(0);
    setRounds(0);
  };

  return (
    <div className="bg-[#0F4C36] text-white rounded-3xl border-2 border-[#D4AF37] p-6 md:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern-dark opacity-30 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-[#1C6B4A] border border-[#D4AF37] text-[#F3E5AB] text-xs font-bold px-4 py-1.5 rounded-full shadow-md mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Interactive Islamic Zikr &amp; Tasbeeh Counter</span>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
          Daily Remembrance of Allah (ذِكْرُ اللَّهِ)
        </h3>
        <p className="text-xs md:text-sm text-[#F3E5AB]/90 max-w-xl mb-6">
          "Unquestionably, by the remembrance of Allah hearts find rest." (Surah Ar-Ra'd 13:28)
        </p>

        {/* Dhikr Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-2xl">
          {DHIKR_LIST.map((d) => (
            <button
              key={d.id}
              onClick={() => handleSelectDhikr(d)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedDhikr.id === d.id
                  ? 'gold-gradient-bg text-[#0F4C36] border-[#F5E0A3] shadow-md scale-105'
                  : 'bg-black/30 text-white border-[#D4AF37]/30 hover:border-[#D4AF37]'
              }`}
            >
              {d.transliteration}
            </button>
          ))}
        </div>

        {/* Selected Dhikr Display */}
        <div className="w-full max-w-lg bg-black/30 border-2 border-[#D4AF37]/60 rounded-3xl p-6 md:p-8 shadow-inner flex flex-col items-center">
          <div className="font-arabic text-3xl md:text-4xl text-[#F3E5AB] font-bold mb-2 tracking-widest">
            {selectedDhikr.arabic}
          </div>
          <div className="font-serif font-bold text-lg text-white mb-1">{selectedDhikr.transliteration}</div>
          <div className="text-xs text-[#F3E5AB]/80 italic mb-6">"{selectedDhikr.meaning}"</div>

          {/* Big Counter Button */}
          <div className="relative mb-6">
            <button
              onClick={handleIncrement}
              className="w-32 h-32 md:w-36 md:h-36 rounded-full gold-gradient-bg text-[#0F4C36] border-4 border-[#F5E0A3] shadow-2xl flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all group cursor-pointer"
            >
              <span className="font-mono text-4xl md:text-5xl font-black">{count}</span>
              <span className="text-[10px] uppercase font-extrabold tracking-widest opacity-80 mt-1">
                Target: {selectedDhikr.target}
              </span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-black/40 rounded-full h-2.5 mb-4 border border-[#D4AF37]/30 overflow-hidden">
            <div
              className="gold-gradient-bg h-full transition-all duration-300"
              style={{ width: `${(count / selectedDhikr.target) * 100}%` }}
            ></div>
          </div>

          {/* Rounds & Reset Controls */}
          <div className="w-full flex items-center justify-between text-xs text-[#F3E5AB]">
            <span className="font-semibold flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" /> Completed Cycles: <strong className="text-white font-mono text-sm">{rounds}</strong>
            </span>
            <button
              onClick={handleReset}
              className="hover:text-white flex items-center gap-1 text-[11px] underline opacity-80"
            >
              <RotateCcw className="w-3 h-3" /> Reset Counter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
