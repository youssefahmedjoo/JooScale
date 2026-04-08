export type Lang = 'ar' | 'en';
export type MediaType = 'image' | 'youtube';
export type DurationType = 'month' | 'days' | 'none';

export interface Service {
  id: string; title_ar: string; title_en: string;
  desc_ar: string; desc_en: string;
  price: number; currency_ar: string; currency_en: string;
  price_suffix_ar: string; price_suffix_en: string;
  icon_source: string; order_index: number; created_at: string;
}

export interface PlanFeature {
  id: string; plan_id: string;
  text_ar: string; text_en: string;
  included: boolean; order_index: number;
}

export interface Plan {
  id: string; title_ar: string; title_en: string;
  price: number; original_price?: number;
  currency_ar: string; currency_en: string;
  duration_type: DurationType;
  duration_days?: number;
  is_recommended: boolean; order_index: number;
  features: PlanFeature[];
}

export interface PortfolioMedia {
  id: string; portfolio_id: string;
  media_type: MediaType; media_url: string; order_index: number;
}

export interface Portfolio {
  id: string; title_ar: string; title_en: string;
  desc_ar: string; desc_en: string;
  visit_link?: string; order_index: number; created_at: string;
  media: PortfolioMedia[];
}

export interface AIConfig {
  id: string; system_prompt: string; knowledge_base: string; updated_at: string;
}

export interface Settings {
  id: string; messenger_link: string; site_email: string; updated_at: string;
}

export interface ChatMessage { role: 'user' | 'assistant'; content: string; }
