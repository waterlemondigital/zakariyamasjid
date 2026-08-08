import React, { useState } from 'react';
import { BookOpen, Copy, Check, Share2, Sparkles, RefreshCw, Volume2, Bookmark } from 'lucide-react';

interface VerseData {
  id: number;
  arabic: string;
  surah: string;
  translation: string;
  urdu: string;
  reflection: string;
  type: 'Ayah' | 'Hadith';
}

const DAILY_VERSES: VerseData[] = [
  {
    id: 1,
    type: 'Ayah',
    arabic: 'مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً ۚ وَاللَّهُ يَقْبِضُ وَيَبْسُطُ وَإِلَيْهِ تُرْجَعُونَ',
    surah: 'Surah Al-Baqarah (2:245)',
    translation: 'Who is it that would loan Allah a goodly loan so He may multiply it for him many times over? And it is Allah who withholds and grants abundance, and to Him you will be returned.',
    urdu: 'कौन है जो अल्लाह को अच्छा क़र्ज़ दे ताकि अल्लाह उसे कई गुना बढ़ाकर अता फरमाए? और अल्लाह ही तंगी और कुशादगी देता है।',
    reflection: 'Every act of charity or service rendered to the Masjid and Kabristan is a loan to Allah, multiplied manifold in this life and the Hereafter.'
  },
  {
    id: 2,
    type: 'Ayah',
    arabic: 'إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَأَقَامَ الصَّلَاةَ وَآتَى الزَّكَاةَ',
    surah: 'Surah At-Tawbah (9:18)',
    translation: 'The mosques of Allah are only to be maintained by those who believe in Allah and the Last Day and establish prayer and give Zakat and do not fear except Allah.',
    urdu: 'अल्लाह की मस्जिदों को वही आबाद करते हैं जो अल्लाह और कयामत के दिन पर ईमान लाते हैं और नमाज़ कायम करते हैं और जकात देते हैं।',
    reflection: 'Maintaining the Masjid through physical care, attendance in congregational prayer, and financial support is a hallmark of true faith.'
  },
  {
    id: 3,
    type: 'Hadith',
    arabic: 'مَنْ بَنَى مَسْجِدًا لِلَّهِ بَنَى اللَّهُ لَهُ مِثْلَهُ فِي الْجَنَّةِ',
    surah: 'Sahih Al-Bukhari (450) & Sahih Muslim (533)',
    translation: 'Whoever builds a mosque for Allah, Allah will build for him a house like it in Paradise.',
    urdu: 'जिसने अल्लाह की रज़ा के लिए मस्जिद बनाई, अल्लाह उसके लिए जन्नत में वैसा ही घर बनाएगा।',
    reflection: 'Contributing to the expansion, repair, or maintenance of Zakariya Masjid ensures eternal rewards as Sadaqah Jariyah.'
  },
  {
    id: 4,
    type: 'Hadith',
    arabic: 'إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلاَّ مِنْ ثَلاَثَةٍ إِلاَّ مِنْ صَدَقَةٍ جَارِيَةٍ أَوْ عِلْمٍ يُنْتَفَعُ بِهِ أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ',
    surah: 'Sahih Muslim (1631)',
    translation: 'When a person dies, his deeds come to an end except for three: Sadaqah Jariyah (continuous charity), knowledge from which benefit is gained, or a righteous child who prays for him.',
    urdu: 'जब इंसान इंतकाल कर जाता है तो उसके आमाल का सिलसिला बंद हो जाता है सिवाय तीन चीज़ों के: सदका-ए-जारीया, नफा-बख्श इल्म, या नेक औलाद जो उसके लिए दुआ करे।',
    reflection: 'Supporting our Kabristan maintenance, Madrasa Quranic education, and Mosque endowments provides continuous benefit beyond mortal life.'
  }
];

export const DailyVerseWidget: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'english' | 'urdu' | 'reflection'>('english');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const verse = DAILY_VERSES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DAILY_VERSES.length);
    setCopied(false);
  };

  const handleCopy = () => {
    const textToCopy = `"${verse.arabic}"\n\n${verse.translation}\n- ${verse.surah}\n(Zakariya Masjid & Kabrastan Trust)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0F4C36] text-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl relative overflow-hidden p-6 md:p-10">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 islamic-pattern-dark opacity-35 pointer-events-none"></div>

      {/* Decorative Gold Arch Top Crest */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-[#1C6B4A] border border-[#D4AF37] text-[#F3E5AB] text-xs font-bold px-4 py-1.5 rounded-full shadow-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Daily Islamic Reflection • {verse.type} of the Day</span>
        </div>

        {/* Bismillah Calligraphy Header */}
        <div className="mb-4">
          <span className="font-arabic text-xl md:text-2xl text-[#F3E5AB] tracking-widest font-semibold">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
          <div className="w-16 h-0.5 gold-gradient-bg mx-auto mt-1.5 rounded-full"></div>
        </div>

        {/* Main Arabic Verse Card */}
        <div className="w-full max-w-4xl bg-black/25 backdrop-blur-md rounded-2xl border border-[#D4AF37]/50 p-6 md:p-8 mb-6 shadow-inner relative">
          <div className="text-right font-arabic text-2xl sm:text-3xl md:text-4xl text-[#F3E5AB] leading-loose sm:leading-[2.2] font-semibold mb-6 dir-rtl">
            {verse.arabic}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/30 text-xs text-[#F3E5AB]/90 font-serif font-bold">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" /> {verse.surah}
            </span>
            <span className="bg-[#D4AF37]/20 text-[#F3E5AB] px-3 py-1 rounded-full border border-[#D4AF37]/40">
              {verse.type}
            </span>
          </div>
        </div>

        {/* Translation & Reflection Navigation Tabs */}
        <div className="w-full max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-4 bg-black/30 p-1.5 rounded-xl border border-[#D4AF37]/30 max-w-xs mx-auto">
            <button
              onClick={() => setActiveTab('english')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'english'
                  ? 'gold-gradient-bg text-[#0F4C36] shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveTab('urdu')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'urdu'
                  ? 'gold-gradient-bg text-[#0F4C36] shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Urdu / Hindi
            </button>
            <button
              onClick={() => setActiveTab('reflection')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'reflection'
                  ? 'gold-gradient-bg text-[#0F4C36] shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Tafsir Note
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-[#D4AF37]/30 text-sm md:text-base leading-relaxed text-white/95 min-h-[90px] flex items-center justify-center text-center font-serif">
            {activeTab === 'english' && <p>"{verse.translation}"</p>}
            {activeTab === 'urdu' && <p className="font-sans font-medium text-amber-100">"{verse.urdu}"</p>}
            {activeTab === 'reflection' && <p className="italic text-[#F3E5AB] font-light">"{verse.reflection}"</p>}
          </div>
        </div>

        {/* Interactive Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={handleNext}
            className="btn-islamic-gold px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Next Ayah / Hadith
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-[#D4AF37]/50 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Verse'}
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className={`px-4 py-2.5 rounded-xl border border-[#D4AF37]/50 font-bold text-xs flex items-center gap-1.5 transition-colors ${
              saved ? 'bg-[#D4AF37] text-[#0F4C36]' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            {saved ? 'Saved in Session' : 'Save Verse'}
          </button>
        </div>
      </div>
    </div>
  );
};
