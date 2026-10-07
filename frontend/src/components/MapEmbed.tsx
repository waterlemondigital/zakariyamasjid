import React from 'react';
import { MapPin, Navigation, Phone, Mail, Clock } from 'lucide-react';

export const MapEmbed: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/50 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
      {/* Contact & Address Sidebar */}
      <div className="p-6 md:p-8 bg-[#0F4C36] text-white lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r-2 border-[#D4AF37]">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-[#F3E5AB] mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF37]" /> Visit The Trust &amp; Masjid
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">Location &amp; Address</h3>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
              <div>
                <strong className="block text-[#F3E5AB] font-serif">Trust Premises:</strong>
                <p className="text-white/90 leading-relaxed mt-0.5">
                  Zakariya Masjid &amp; Kabristan,<br />
                  Mundhwa, Off Koregaon Park,<br />
                  Pune, Maharashtra, India
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
              <div>
                <strong className="block text-[#F3E5AB] font-serif">Contact Number:</strong>
                <p className="text-white/90"><a href="tel:+919890185013" className="hover:underline text-[#F3E5AB] font-semibold">+91 98901 85013</a></p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
              <div>
                <strong className="block text-[#F3E5AB] font-serif">Official Email:</strong>
                <a href="mailto:contact@zakariyamasjid.org" className="text-white/90 hover:underline">contact@zakariyamasjid.org</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#F3E5AB] font-serif">Office &amp; Services Hours:</strong>
                <p className="text-white/90">Masjid: Open 24/7 for Daily Prayers<br />Trust Office: 09:00 AM – 07:00 PM (Mon-Sat)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/20">
          <a
            href="https://maps.app.goo.gl/VoJ82WE71Ay5EipQ7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-islamic-gold w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" /> Open in Google Maps
          </a>
        </div>
      </div>

      {/* Embedded Map Frame */}
      <div className="lg:col-span-7 h-80 lg:h-auto min-h-[320px] relative bg-gray-100">
        <iframe
          title="Zakariya Masjid & Kabrastan Trust Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.187315024765!2d73.8967!3d18.5218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0f22f814917%3A0x6b63d9198642289f!2sKoregaon%20Park%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
