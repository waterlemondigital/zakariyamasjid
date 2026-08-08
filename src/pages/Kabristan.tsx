import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from '../components/Accordion';
import { SectionDivider } from '../components/SectionDivider';
import { CTASection } from '../components/CTASection';
import { ShieldCheck, Crosshair, Heart, FileText, AlertTriangle, Phone, ArrowRight, UserCheck } from 'lucide-react';

export const Kabristan: React.FC = () => {
  const burialRulesAccordionItems = [
    {
      id: 'general-rules',
      title: '1. General Burial Guidelines',
      icon: <ShieldCheck className="w-5 h-5 text-[#C9A227]" />,
      content: (
        <ul className="list-disc pl-5 space-y-2 text-[#22261F]/90">
          <li>All burials shall be conducted strictly in accordance with the Qur'an, Sunnah, and the religious guidance of the Trust.</li>
          <li>Formal burial permission must be obtained from the Trust office before any grave preparation or digging commences.</li>
          <li>A valid government-issued Death Certificate or Hospital Intimation must be submitted to the Trust prior to burial.</li>
          <li>The Trust reserves the right to verify eligibility for burial as per its established community trust policies.</li>
          <li>Burial timings are subject to municipal regulations, daylight conditions, and operational requirements.</li>
        </ul>
      ),
    },
    {
      id: 'at-kabristan',
      title: '2. Code of Conduct at the Kabristan',
      icon: <UserCheck className="w-5 h-5 text-[#C9A227]" />,
      content: (
        <ul className="list-disc pl-5 space-y-2 text-[#22261F]/90">
          <li>Maintain dignity, solemnity, silence, and spiritual respect at all times within the cemetery grounds.</li>
          <li>Dress modestly and behave with decorum in accordance with Islamic etiquette (Adab-e-Ziyarat).</li>
          <li>Keep the Kabristan clean and pristine; littering is strictly unacceptable.</li>
          <li>Smoking, alcohol, narcotics, and any unlawful or un-Islamic activities are strictly prohibited.</li>
          <li>Children visiting the cemetery must remain under continuous adult supervision.</li>
          <li>Photography or videography is permitted strictly with explicit prior authorization from the Trust.</li>
          <li><strong>Do not step, sit, or walk over graves</strong> under any circumstances, out of reverence for the deceased.</li>
          <li>Always follow instructions and guidance from Trust staff, volunteers, and grave keepers.</li>
        </ul>
      ),
    },
    {
      id: 'grave-maintenance',
      title: '3. Grave Construction & Maintenance Policy',
      icon: <Crosshair className="w-5 h-5 text-[#C9A227]" />,
      content: (
        <ul className="list-disc pl-5 space-y-2 text-[#22261F]/90">
          <li>The Trust maintains overall responsibility for the cleanliness, pathways, perimeter safety, and lighting of the Kabristan.</li>
          <li>No permanent concrete structures, raised brick fences, ceramic tiles, or heavy marble enclosures may be erected without explicit written permission from the Trust.</li>
          <li>No planting of trees or large shrubs directly on individual graves without prior Trust approval.</li>
          <li>The Trust reserves the authority to perform necessary maintenance, leveling, and clearance to preserve overall safety, uniformity, and dignity across the grounds.</li>
        </ul>
      ),
    },
    {
      id: 'prohibited-activities',
      title: '4. Prohibited Activities & Violations',
      icon: <AlertTriangle className="w-5 h-5 text-[#C9A227]" />,
      content: (
        <ul className="list-disc pl-5 space-y-2 text-[#22261F]/90">
          <li>Any practice or ritual contrary to authentic Islamic teachings (Qur'an and Sunnah).</li>
          <li>Damage to graves, boundary walls, trees, lighting, or cemetery property.</li>
          <li>Disruptive behavior, shouting, or loud audio playback within cemetery limits.</li>
          <li>Unauthorized construction, alteration, or placement of heavy monuments on grave sites.</li>
          <li>Commercial activity, solicitation, or vending within the Kabristan premises.</li>
        </ul>
      ),
    },
    {
      id: 'required-documents',
      title: '5. Mandatory Documentation & Burial Pass',
      icon: <FileText className="w-5 h-5 text-[#C9A227]" />,
      content: (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-red-50 border-2 border-red-300 text-red-900 font-bold text-sm">
            IMPORTANT MANDATORY REQUIREMENT:
            <p className="mt-1 font-normal text-xs text-red-800">
              A valid PMC Burial Pass is mandatory for burial. Burial will not be permitted without a PMC Pass.
            </p>
          </div>
          <p className="font-semibold text-[#0F4C36] pt-1">Please present the following documents to the Trust office for burial clearance:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#22261F]/90 text-sm">
            <li><strong>Valid PMC Burial Pass (Mandatory)</strong></li>
            <li>Government-issued ID proof of the deceased person (Aadhaar Card / Voter ID / Passport).</li>
            <li>Government-issued ID proof of the primary applicant / next-of-kin.</li>
            <li>Completed Burial Permission Form provided at the Trust office.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0F4C36] text-[#E8D08A] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#C9A227]">
            <Crosshair className="w-4 h-4 text-[#C9A227]" /> Dignified Burial Services
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C36]">
            Kabristan &amp; Burial Guidelines
          </h1>
          <p className="text-base md:text-lg text-[#22261F]/80">
            A sanctuary of eternal rest maintained with sanctity, cleanliness, and respect at Zakariya Masjid &amp; Kabristan, Mundhwa, Off Koregaon Park, Pune
          </p>
          <div className="w-20 h-1 bg-[#C9A227] mx-auto rounded-full mt-3"></div>
        </div>

        {/* Emergency Burial Contact Strip */}
        <div className="bg-[#0F4C36] text-white rounded-3xl border-2 border-[#C9A227] p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#C9A227] text-[#0F4C36] flex items-center justify-center flex-shrink-0 font-bold shadow-md">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8D08A]">Funeral &amp; Burial Assistance</span>
              <h3 className="font-serif text-2xl font-bold">Request Burial Clearance</h3>
              <p className="text-xs md:text-sm text-white/80">
                Contact Trust Office for burial authorization &amp; grave preparation support.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+919890185013"
              className="px-6 py-3.5 rounded-xl bg-[#C9A227] text-[#0F4C36] font-bold text-sm uppercase tracking-wider hover:bg-[#E8D08A] transition-colors shadow-lg flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call +91 98901 85013
            </a>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl border border-white/40 hover:border-[#C9A227] text-white font-semibold text-sm transition-colors"
            >
              Visit Office Location
            </Link>
          </div>
        </div>

        {/* Burial Rules & Guidelines Accordion */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
              Compliance &amp; Decorum
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F4C36] mt-1">
              Kabristan Rules &amp; Regulations
            </h2>
            <p className="text-xs md:text-sm text-[#22261F]/70 mt-2">
              Please review these guidelines established by the Trust to preserve the sanctity and order of the cemetery grounds.
            </p>
          </div>

          <Accordion items={burialRulesAccordionItems} defaultOpenId="general-rules" />

          <p className="text-xs text-[#22261F]/70 italic bg-white p-4 rounded-xl border border-[#C9A227]/30 text-center">
            <strong>Note:</strong> "The Trust reserves the right to amend these rules and guidelines as necessary to ensure proper management of the Kabristan and compliance with Islamic principles and applicable laws."
          </p>
        </section>

        <SectionDivider />

        {/* Kabristan Support & Maintenance Donation Callout */}
        <section className="bg-white rounded-3xl border-2 border-[#C9A227]/40 p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227] flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-current" /> Sadaqah Jariyah Opportunity
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F4C36]">
              Support the Kabristan Maintenance Fund
            </h2>
            <p className="text-sm md:text-base text-[#22261F]/80 leading-relaxed">
              Preserving the cemetery grounds — including grave digging tools, security, clean water supply, tree pruning, boundary wall maintenance, and pathway lighting — requires ongoing financial support.
            </p>
            <p className="text-xs text-[#22261F]/70 italic">
              Your contribution ensures that every deceased brother and sister in our community receives a dignified Islamic burial regardless of financial means.
            </p>
            <div className="pt-2">
              <Link
                to="/donate?category=kabristan-maint"
                className="px-8 py-4 rounded-xl bg-[#0F4C36] hover:bg-[#1C6B4A] text-white font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2 border-2 border-[#C9A227] shadow-lg"
              >
                <Heart className="w-4 h-4 text-[#C9A227] fill-current" /> Donate to Kabristan Fund <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#C9A227]/40 space-y-3 font-serif text-sm">
              <h4 className="font-bold text-[#0F4C36] text-lg border-b border-[#C9A227]/30 pb-2">
                Burial Assistance Services Included:
              </h4>
              <ul className="space-y-2 text-[#22261F]/90 font-sans text-xs md:text-sm">
                <li className="flex items-center gap-2"><span className="text-[#C9A227]">✓</span> Grave Digging &amp; Preparation</li>
                <li className="flex items-center gap-2"><span className="text-[#C9A227]">✓</span> Ghusl (Washing) Facility Guidance</li>
                <li className="flex items-center gap-2"><span className="text-[#C9A227]">✓</span> Janazah Namaz Arrangements</li>
                <li className="flex items-center gap-2"><span className="text-[#C9A227]">✓</span> Night Lighting &amp; Security Escort</li>
                <li className="flex items-center gap-2"><span className="text-[#C9A227]">✓</span> Family Comfort &amp; Rest Seating</li>
              </ul>
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </div>
  );
};
