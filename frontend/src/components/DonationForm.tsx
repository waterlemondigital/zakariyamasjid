import React, { useState } from 'react';
import { DonationCategory } from '../types';
import { QrCode, Copy, Check } from 'lucide-react';
import qrCodeImg from '../../assets/images/qr_code.jpeg';

interface DonationFormProps {
  initialCategoryId?: string;
}

export const donationCategoriesList: DonationCategory[] = [
  { id: 'masjid-maint', title: 'Masjid Expenses & Maintenance', description: 'Upkeep of prayer halls, utilities, audio systems, and daily operational needs of Zakariya Masjid.', iconName: 'Masjid', popular: true },
  { id: 'sadaqah', title: 'Sadaqah', description: 'Voluntary charity for general community assistance and seeking the pleasure of Allah (SWT).', iconName: 'Sadaqah', popular: true },
  { id: 'zakat', title: 'Zakat', description: 'Obligatory 2.5% wealth tax distributed strictly to eligible beneficiaries as per Shariah guidelines.', iconName: 'Zakat', popular: true },
];

export const DonationForm: React.FC<DonationFormProps> = () => {
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  const upiId = "117984845023655@crb";

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Main Beautiful QR Code Box */}
      <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/60 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-[#22261F]">
        
        {/* Subtle Decorative Background & Arch Effect */}
        <div className="absolute top-0 inset-x-0 h-3 gold-gradient-bg"></div>
        <div className="absolute inset-0 islamic-pattern-subtle opacity-30 pointer-events-none"></div>

        <div className="relative z-10 text-center space-y-6">
          
          {/* Header Bismillah / Title */}
          <div>
            <span className="font-arabic text-xl sm:text-2xl text-[#0F4C36] font-bold block mb-1">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C36]">
              Donate to Zakariya Masjid
            </h2>
            <p className="text-xs sm:text-sm text-[#22261F]/70 mt-1 max-w-xl mx-auto">
              Scan the QR code below using any UPI app (GPay, PhonePe, Paytm, BHIM, Mobikwik) to support Zakariya Masjid &amp; Kabristan.
            </p>
          </div>

          {/* THE BEAUTIFUL QR CODE BOX CONTAINER */}
          <div className="max-w-md mx-auto bg-[#FAF7F0] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-xl relative text-center flex flex-col items-center space-y-5">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#0F4C36] text-[#F3E5AB] text-xs font-bold px-4 py-1 rounded-full shadow-md border border-[#D4AF37]">
              <QrCode className="w-4 h-4 text-[#D4AF37]" /> Official Bank UPI QR
            </div>

            {/* QR Code Frame */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl border-2 border-[#D4AF37]/50 shadow-md relative group">
              <div className="w-56 h-auto sm:w-64 relative flex items-center justify-center bg-white rounded-xl overflow-hidden">
                <img 
                  src={qrCodeImg} 
                  alt="Zakariya Masjid UPI QR Code" 
                  className="w-full h-auto object-contain rounded-lg shadow-xs"
                />
              </div>
            </div>

            {/* UPI ID Copy Section */}
            <div className="w-full space-y-2">
              <span className="text-xs text-[#22261F]/70 block font-medium">UPI ID:</span>
              <div className="flex items-center justify-between bg-white border border-[#D4AF37]/60 rounded-xl px-4 py-2.5 shadow-sm">
                <span className="font-mono font-bold text-sm text-[#0F4C36]">{upiId}</span>
                <button
                  type="button"
                  onClick={copyUpiId}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0F4C36] text-[#F3E5AB] font-bold text-xs hover:bg-[#155A41] transition-colors"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedUpi ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Supported Payment Apps Logos */}
            <div className="pt-1 border-t border-[#D4AF37]/30 w-full">
              <span className="text-[10px] uppercase font-bold text-[#22261F]/60 block mb-2">
                Supported Apps
              </span>
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0F4C36]">
                <span className="bg-white px-2.5 py-1 rounded-md border border-gray-200 shadow-2xs">Google Pay</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-gray-200 shadow-2xs">PhonePe</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-gray-200 shadow-2xs">Paytm</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-gray-200 shadow-2xs">BHIM UPI</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

