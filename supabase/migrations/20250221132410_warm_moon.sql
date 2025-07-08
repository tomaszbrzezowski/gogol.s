/*
  # Fix admin access policies

  1. Changes
    - Drop existing policies
    - Create new admin access policies with proper user table access
    - Add public policies for reservations
    - Add proper RLS policies for admin users

  2. Security
    - Enable RLS
    - Add proper policies for admin and public access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "admin_salt_cave_access" ON salt_cave_reservations;
DROP POLICY IF EXISTS "admin_motel_access" ON motel_reservations;
DROP POLICY IF EXISTS "users_read_own_salt_cave" ON salt_cave_reservations;
DROP POLICY IF EXISTS "users_read_own_motel" ON motel_reservations;
DROP POLICY IF EXISTS "public_create_salt_cave" ON salt_cave_reservations;
DROP POLICY IF EXISTS "public_create_motel" ON motel_reservations;

-- Create admin access policy for users table
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all users"
  ON auth.users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Create new admin policies for reservations
CREATE POLICY "admin_full_access_salt_cave"
  ON salt_cave_reservations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

CREATE POLICY "admin_full_access_motel"
  ON motel_reservations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Add public policies for reservations
CREATE POLICY "public_read_own_salt_cave"
  ON salt_cave_reservations
  FOR SELECT
  TO public
  USING (auth.uid() = user_id);

CREATE POLICY "public_read_own_motel"
  ON motel_reservations
  FOR SELECT
  TO public
  USING (auth.uid() = user_id);

CREATE POLICY "public_create_salt_cave"
  ON salt_cave_reservations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "public_create_motel"
  ON motel_reservations
  FOR INSERT
  TO public
  WITH CHECK (true);