import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, MessageSquare, Clock, ExternalLink, Phone } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { DocumentTitle } from '../components/common/DocumentTitle';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { CONTACT, getServiceWhatsAppLink } from '../config/contact';
import { ALL_VERIFIED_SERVICES } from '../data/services';
import { EnquiryForm } from '../components/contact/EnquiryForm';


const SERVICE_SLUG_MAP: Record<string, string> = {
  'planning': 'Planning',
  'interior-designing': 'Interior Designing',
  'civil-work': '2D & 3D Civil Work',
  'structural-designing': 'Structural Designing',
  'estimating-costing': 'Estimating & Costing',
  'landscaping': 'Landscaping',
  'renovation': 'Renovation',
  'map-approval': 'Map Approval',
  'visualization-3d': '3D Animation / 3D Visualization',
};

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const rawServiceParam = searchParams.get('service') || '';

  // Determine initial service based on slug or direct name
  const matchedService =
    SERVICE_SLUG_MAP[rawServiceParam.toLowerCase()] ||
    ALL_VERIFIED_SERVICES.find(
      (s) =>
        s.title.toLowerCase() === rawServiceParam.toLowerCase() ||
        s.slug.toLowerCase() === rawServiceParam.toLowerCase()
    )?.title ||
    'Planning';

  return (
    <div className="w-full">
      <DocumentTitle
        title="Contact & Consultation | Infinity Space Group Ranchi"
        description="Connect with Infinity Space Group in Ranchi, Jharkhand for architectural planning, structural design, civil contracting, and interior design consultations."
      />

      {/* Header */}
      <section className="py-16 sm:py-24 bg-brand-dark text-white relative overflow-hidden border-b border-brand-navy/60">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-5 h-0.5 bg-brand-accent inline-block" />
              <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-accent">
                PROJECT CONSULTATION
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium uppercase tracking-tight text-white leading-[1.08] mb-6">
              HAVE A PROJECT IN MIND? <br />
              <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                LET&apos;S TALK ABOUT YOUR SPACE.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Let&apos;s talk about your space, your ideas and how we can bring them to life. Schedule an architectural consultation or message our team directly in Ranchi.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content: Channels & Structured Form */}
      <section className="py-20 sm:py-28 bg-white relative">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Office & Direct Connect Channels */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-brand-blue uppercase block mb-2">
                  HEADQUARTERS &amp; SERVICE REGION
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-brand-navy uppercase tracking-tight mb-4">
                  RANCHI, JHARKHAND
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  We provide architecture, structural engineering, and civil execution across Ranchi and surrounding districts of Jharkhand.
                </p>
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-4">
                {/* Location Card */}
                <div className="p-5 bg-brand-slate border border-slate-200 flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-navy text-brand-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold text-slate-500 uppercase">
                      Office Location
                    </h3>
                    <p className="text-sm font-semibold text-brand-navy mt-0.5">
                      {CONTACT.address}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-mono">
                      {CONTACT.location.fullAddressPlaceholder}
                    </p>
                  </div>
                </div>

                {/* Direct WhatsApp Channel */}
                <div className="p-5 bg-brand-slate border border-slate-200 flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#25D366] text-white flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-mono font-bold text-slate-500 uppercase">
                      Direct WhatsApp &amp; Phone
                    </h3>
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="text-base font-semibold text-brand-navy hover:text-brand-blue transition-colors mt-0.5 block font-mono"
                    >
                      {CONTACT.phone}
                    </a>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Chat directly or submit your project consult report via WhatsApp to our Ranchi coordinators.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      <Button
                        href={getServiceWhatsAppLink(matchedService)}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="whatsapp"
                        size="sm"
                        icon={<MessageSquare className="w-3.5 h-3.5" />}
                      >
                        Chat on WhatsApp
                      </Button>
                      <a
                        href={`tel:${CONTACT.phone}`}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono border border-slate-300 text-slate-700 hover:border-brand-navy hover:text-brand-navy transition-colors bg-white font-bold"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Directly</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="p-5 bg-brand-slate border border-slate-200 flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-navy text-brand-blue flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold text-slate-500 uppercase">
                      Consultation Hours
                    </h3>
                    <p className="text-sm font-semibold text-brand-navy mt-0.5">
                      {CONTACT.officeHours}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-mono">
                      Sunday: By appointment for active construction sites
                    </p>
                  </div>
                </div>

                {/* Instagram Community */}
                <div className="p-5 bg-brand-slate border border-slate-200 flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-navy text-brand-accent flex items-center justify-center flex-shrink-0">
                    <InstagramIcon className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold text-slate-500 uppercase">
                      Instagram Community
                    </h3>
                    <p className="text-sm font-semibold text-brand-navy mt-0.5">
                      @infinity_space_group
                    </p>
                    <div className="mt-2">
                      <a
                        href={CONTACT.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-brand-blue hover:text-brand-navy transition-colors font-bold"
                      >
                        <span>Follow on Instagram</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Transparency Notice */}
              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 text-xs text-slate-500 font-mono leading-relaxed">
                <strong>Business Note:</strong> Infinity Space Group strictly uses verified communication channels. Official direct phone numbers and branch coordinates will be published once officially authorized.
              </div>
            </div>

            {/* Right Column: Structured Lead Gen Enquiry Form */}
            <div className="lg:col-span-7">
              <EnquiryForm initialService={matchedService} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
