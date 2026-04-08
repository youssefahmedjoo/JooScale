import { supabase } from '@/lib/supabase';
import { LangProvider }     from '@/components/LangProvider';
import { Header }           from '@/components/landing/Header';
import { HeroSection }      from '@/components/landing/HeroSection';
import { EcosystemSection } from '@/components/landing/EcosystemSection';
import { ServicesSection }  from '@/components/landing/ServicesSection';
import { PlansSection }     from '@/components/landing/PlansSection';
import { PortfolioSection } from '@/components/landing/PortfolioSection';
import { ContactSection }   from '@/components/landing/ContactSection';
import { Footer }           from '@/components/landing/Footer';
import { MobileNav }        from '@/components/landing/MobileNav';
import { ChatBot }          from '@/components/landing/ChatBot';

export const revalidate = 60;

async function getData() {
  const [svcRes, plansRes, portRes, settingsRes] = await Promise.all([
    supabase.from('services').select('*').order('order_index'),
    supabase.from('plans').select('*, features:plan_features(*)').order('order_index'),
    supabase.from('portfolio').select('*, media:portfolio_media(*)').order('order_index'),
    supabase.from('settings').select('*').single(),
  ]);
  return {
    services:  svcRes.data    ?? [],
    plans:     plansRes.data  ?? [],
    portfolio: portRes.data   ?? [],
    settings:  settingsRes.data ?? { messenger_link:'https://m.me/jooscale', site_email:'hello@jooscale.com' },
  };
}

export default async function HomePage() {
  const { services, plans, portfolio, settings } = await getData();
  const s = settings as Record<string,string>;
  const messengerLink = s.messenger_link ?? 'https://m.me/jooscale';
  const email         = s.site_email     ?? 'hello@jooscale.com';

  const hasServices  = services.length  > 0;
  const hasPlans     = plans.length     > 0;
  const hasPortfolio = portfolio.length > 0;

  return (
    <LangProvider>
      <div className="bg-background font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        <Header
          messengerLink={messengerLink}
          hasServices={hasServices}
          hasPlans={hasPlans}
          hasPortfolio={hasPortfolio}
        />
        <main className="pt-24">
          <HeroSection     messengerLink={messengerLink} />
          <EcosystemSection />
          {hasServices  && <ServicesSection  services={services as any} />}
          {hasPlans     && <PlansSection     plans={plans as any} messengerLink={messengerLink} />}
          {hasPortfolio && <PortfolioSection portfolio={portfolio as any} />}
          <ContactSection messengerLink={messengerLink} />
        </main>
        <Footer messengerLink={messengerLink} email={email} />
        <MobileNav
          hasServices={hasServices}
          hasPlans={hasPlans}
          hasPortfolio={hasPortfolio}
        />
        <ChatBot />
      </div>
    </LangProvider>
  );
}
