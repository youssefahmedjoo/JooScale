-- ============================================================
-- Jooscale Database Schema v2 — COMPLETE & FRESH
-- روح SQL Editor في Supabase > New Query > الصق كله > Run
-- ============================================================

DROP TABLE IF EXISTS portfolio_media  CASCADE;
DROP TABLE IF EXISTS portfolio        CASCADE;
DROP TABLE IF EXISTS plan_features    CASCADE;
DROP TABLE IF EXISTS plans            CASCADE;
DROP TABLE IF EXISTS services         CASCADE;
DROP TABLE IF EXISTS ai_config        CASCADE;
DROP TABLE IF EXISTS settings         CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Services (flat - no groups) ──────────────────────────────
CREATE TABLE services (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ar      TEXT NOT NULL DEFAULT '',
  title_en      TEXT NOT NULL DEFAULT '',
  desc_ar       TEXT DEFAULT '',
  desc_en       TEXT DEFAULT '',
  price         NUMERIC(10,2) DEFAULT 0,
  currency_ar   TEXT DEFAULT 'ج.م',
  currency_en   TEXT DEFAULT 'EGP',
  price_suffix_ar TEXT DEFAULT '',
  price_suffix_en TEXT DEFAULT '',
  icon_source   TEXT DEFAULT '',
  order_index   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Plans ─────────────────────────────────────────────────────
-- duration_type: 'month' | 'days' | 'none'
-- duration_days: used only when duration_type = 'days'
CREATE TABLE plans (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ar        TEXT NOT NULL DEFAULT '',
  title_en        TEXT NOT NULL DEFAULT '',
  price           NUMERIC(10,2) DEFAULT 0,
  original_price  NUMERIC(10,2),
  currency_ar     TEXT DEFAULT 'ج.م',
  currency_en     TEXT DEFAULT 'EGP',
  duration_type   TEXT CHECK (duration_type IN ('month','days','none')) DEFAULT 'month',
  duration_days   INTEGER DEFAULT NULL,
  is_recommended  BOOLEAN DEFAULT FALSE,
  order_index     INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Plan Features ─────────────────────────────────────────────
CREATE TABLE plan_features (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id     UUID REFERENCES plans(id) ON DELETE CASCADE,
  text_ar     TEXT NOT NULL DEFAULT '',
  text_en     TEXT NOT NULL DEFAULT '',
  included    BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0
);

-- ── Portfolio ─────────────────────────────────────────────────
CREATE TABLE portfolio (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ar    TEXT NOT NULL DEFAULT '',
  title_en    TEXT NOT NULL DEFAULT '',
  desc_ar     TEXT DEFAULT '',
  desc_en     TEXT DEFAULT '',
  visit_link  TEXT DEFAULT '',
  order_index INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Portfolio Media (multiple per portfolio item) ─────────────
-- media_type: 'image' | 'youtube'
-- media_url: direct image URL or YouTube URL
CREATE TABLE portfolio_media (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID REFERENCES portfolio(id) ON DELETE CASCADE,
  media_type   TEXT CHECK (media_type IN ('image','youtube')) DEFAULT 'image',
  media_url    TEXT NOT NULL DEFAULT '',
  order_index  INTEGER DEFAULT 0
);

-- ── AI Config ─────────────────────────────────────────────────
CREATE TABLE ai_config (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  system_prompt  TEXT NOT NULL DEFAULT 'أنت مساعد ذكي لشركة Jooscale.',
  knowledge_base TEXT DEFAULT '',
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Settings ──────────────────────────────────────────────────
CREATE TABLE settings (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  messenger_link  TEXT DEFAULT 'https://m.me/jooscale',
  site_email      TEXT DEFAULT 'hello@jooscale.com',
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Default rows ──────────────────────────────────────────────
INSERT INTO ai_config (system_prompt, knowledge_base) VALUES (
  'أنت مساعد ذكي ودود لشركة Jooscale للتسويق الرقمي. أجب بلغة المستخدم بشكل مختصر ومحترف.',
  'Jooscale شركة تسويق رقمي متخصصة في إدارة السوشيال ميديا والإعلانات المدفوعة وإنتاج المحتوى وتصميم المواقع.'
);

INSERT INTO settings (messenger_link, site_email) VALUES (
  'https://m.me/jooscale',
  'hello@jooscale.com'
);

-- ── RLS ───────────────────────────────────────────────────────
ALTER TABLE services       ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans          ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_features  ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio      ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_config      ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings       ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read services"        ON services        FOR SELECT USING (true);
CREATE POLICY "Public read plans"           ON plans           FOR SELECT USING (true);
CREATE POLICY "Public read plan_features"   ON plan_features   FOR SELECT USING (true);
CREATE POLICY "Public read portfolio"       ON portfolio       FOR SELECT USING (true);
CREATE POLICY "Public read portfolio_media" ON portfolio_media FOR SELECT USING (true);
CREATE POLICY "Public read settings"        ON settings        FOR SELECT USING (true);

-- ── Indexes ───────────────────────────────────────────────────
CREATE INDEX idx_services_order        ON services(order_index);
CREATE INDEX idx_plans_order           ON plans(order_index);
CREATE INDEX idx_plan_features_plan    ON plan_features(plan_id);
CREATE INDEX idx_portfolio_order       ON portfolio(order_index);
CREATE INDEX idx_portfolio_media_port  ON portfolio_media(portfolio_id);
CREATE INDEX idx_portfolio_media_order ON portfolio_media(order_index);
