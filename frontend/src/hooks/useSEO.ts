import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOMetadata {
  title: string;
  description: string;
}

const routeSEO: Record<string, SEOMetadata> = {
  '/': {
    title: 'Zakariya Masjid & Kabrastan Trust | Mundhwa, Pune',
    description:
      'Official portal of Zakariya Masjid & Kabrastan Trust, Mundhwa, Pune. Real-time prayer timings, Jumu\'ah schedule, burial assistance, and verified Zakat welfare.',
  },
  '/masjid': {
    title: 'Prayer Timings & Jumu\'ah Schedule | Zakariya Masjid, Pune',
    description:
      'Daily 5-time Jamaat namaz timings, Friday Jumu\'ah Khutbah schedules, Eid announcements, and Madrasa at Zakariya Masjid in Mundhwa, Pune.',
  },
  '/kabrastan': {
    title: 'Kabrastan & Muslim Burial Services | Zakariya Masjid Trust, Pune',
    description:
      '24/7 Muslim burial assistance, funeral arrangements, grave registration, and cemetery maintenance by Zakariya Kabrastan Trust in Pune.',
  },
  '/welfare-cases': {
    title: 'Verified Welfare Cases & Direct Zakat Donation | Zakariya Trust',
    description:
      'Support verified local medical emergencies, ration aid, widow support, and student education through direct 100% beneficiary bank transfer.',
  },
  '/trust': {
    title: 'About the Trust & Governance | Zakariya Masjid & Kabrastan Trust',
    description:
      'Learn about the history, trustees, transparency, and Shariah-compliant audited welfare initiatives of Zakariya Masjid & Kabrastan Trust, Pune.',
  },
  '/contact': {
    title: 'Contact Helpline & Location | Zakariya Masjid & Kabrastan Trust',
    description:
      'Get in touch with the Zakariya Masjid & Kabrastan Trust office in Mundhwa, Pune. Official phone numbers, map location, and contact inquiry form.',
  },
};

export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const currentSEO = routeSEO[location.pathname] || routeSEO['/'];

    // Update Page Title
    document.title = currentSEO.title;

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentSEO.description);
    }

    // Update OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentSEO.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', currentSEO.description);
    }

    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }, [location.pathname]);
};
