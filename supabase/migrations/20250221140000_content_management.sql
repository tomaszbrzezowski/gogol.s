/*
  # Content Management System

  1. New Tables
    - `site_content` - for managing editable content
    - `site_images` - for managing images
    - `users` - for admin users (extends auth.users)

  2. Security
    - Enable RLS on all tables
    - Only admins can modify content
*/

-- Create site_content table for managing editable content
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  key text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  content_type text NOT NULL DEFAULT 'text' CHECK (content_type IN ('text', 'html', 'markdown')),
  section text NOT NULL,
  is_active boolean DEFAULT true,
  updated_by uuid REFERENCES auth.users(id)
);

-- Create site_images table for managing images
CREATE TABLE IF NOT EXISTS site_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  key text UNIQUE NOT NULL,
  title text NOT NULL,
  alt_text text,
  file_path text NOT NULL,
  file_size int,
  mime_type text,
  section text NOT NULL,
  is_active boolean DEFAULT true,
  uploaded_by uuid REFERENCES auth.users(id)
);

-- Create admin_users table for user management
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  email text NOT NULL UNIQUE,
  full_name text,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for site_content
CREATE POLICY "Public can view active content"
  ON site_content
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage all content"
  ON site_content
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Create policies for site_images
CREATE POLICY "Public can view active images"
  ON site_images
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage all images"
  ON site_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Create policies for admin_users
CREATE POLICY "Admins can view all admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid()
      AND au.is_active = true
    )
  );

CREATE POLICY "Super admins can manage all admin users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid()
      AND au.role = 'super_admin'
      AND au.is_active = true
    )
  );

-- Create indexes for better performance
CREATE INDEX site_content_key_idx ON site_content(key);
CREATE INDEX site_content_section_idx ON site_content(section);
CREATE INDEX site_content_is_active_idx ON site_content(is_active);
CREATE INDEX site_images_key_idx ON site_images(key);
CREATE INDEX site_images_section_idx ON site_images(section);
CREATE INDEX site_images_is_active_idx ON site_images(is_active);
CREATE INDEX admin_users_email_idx ON admin_users(email);
CREATE INDEX admin_users_is_active_idx ON admin_users(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_images_updated_at
  BEFORE UPDATE ON site_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default content
INSERT INTO site_content (key, title, content, section) VALUES
  ('home_hero_title', 'Tytuł strony głównej', 'Przyjedź do nas i zrelaksuj się...', 'home'),
  ('home_hero_subtitle', 'Podtytuł strony głównej', 'Twoje miejsce na odpoczynek', 'home'),
  ('pensjonat_description', 'Opis pensjonatu', 'Zapraszamy wszystkich państwa, którzy potrzebujecie wypoczynku po męczącej podróży, lub wytchnienia po zwiedzeniu pięknych zakątków naszego miasta i okolic.', 'pensjonat'),
  ('grota_description', 'Opis groty solnej', 'Zachwyca niepowtarzalnym wyglądem i atmosferą, poprawi również stan zdrowia i samopoczucie osób w każdym wieku.', 'grota'),
  ('pensjonat_rooms_info', 'Informacje o pokojach', 'Łącznie 10 pokoi: Pokój dwuosobowy ze wspólną łazienką - 4 szt., Pokój dwuosobowy z łazienką - 4 szt., Pokój trzyosobowy z łazienką - 1 szt., Pokój czteroosobowy z łazienką - 1 szt.', 'pensjonat'),
  ('grota_benefits', 'Korzyści z groty solnej', 'Poprawia oddychanie, wspomaga relaks, redukuje stres, poprawia jakość snu, wspiera zdrową skórę.', 'grota'),
  ('contact_address', 'Adres kontaktowy', 'ul. Przykładowa 123, 50-000 Wrocław', 'contact'),
  ('contact_phone', 'Telefon kontaktowy', '+48 123 456 789', 'contact'),
  ('contact_email', 'Email kontaktowy', 'kontakt@gogols.pl', 'contact');

-- Insert default images
INSERT INTO site_images (key, title, alt_text, file_path, section) VALUES
  ('home_background', 'Tło strony głównej', 'Widok na pensjonat', '/images/bg.jpg', 'home'),
  ('grota_logo', 'Logo groty solnej', 'Logo Grota Solna Gogols', '/images/logo_grota.png', 'grota'),
  ('pensjonat_logo', 'Logo pensjonatu', 'Logo Pensjonatu Gogols', '/images/logo_pensjonat.png', 'pensjonat'),
  ('grota_hero_logo', 'Logo groty na stronie głównej', 'Logo Grota Solna Gogols', '/images/Grota/Grota_Solna__Gogols_Logo_Ci.jpg', 'grota'),
  ('pensjonat_hero_logo', 'Logo pensjonatu na stronie głównej', 'Logo Pensjonatu Gogols', '/images/Grota/Pensjonat__Gogols_Logo__Cie.jpg', 'pensjonat'),
  ('grota_background', 'Tło groty solnej', 'Wnętrze groty solnej', '/images/Grota/bg.jpg', 'grota'),
  ('pensjonat_background', 'Tło pensjonatu', 'Wnętrze pensjonatu', '/images/Pensjonat/xdp-bg_foto_1.jpg', 'pensjonat'); 