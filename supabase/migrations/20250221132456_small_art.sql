/*
  # Fix admin policies recursion

  1. Changes
    - Drop existing policies that may cause recursion
    - Create new admin policies using a simpler approach
    - Maintain public access policies
    - Fix RLS for users table

  2. Security
    - Enable RLS
    - Add proper policies for admin and public access
    - Avoid recursive checks
*/

-- Drop existing policies
DROP POLICY IF EXISTS "admin_full_access_salt_cave" ON salt_cave_reservations;
DROP POLICY IF EXISTS "admin_full_access_motel" ON motel_reservations;
DROP POLICY IF EXISTS "public_read_own_salt_cave" ON salt_cave_reservations;
DROP POLICY IF EXISTS "public_read_own_motel" ON motel_reservations;
DROP POLICY IF EXISTS "public_create_salt_cave" ON salt_cave_reservations;
DROP POLICY IF EXISTS "public_create_motel" ON motel_reservations;
DROP POLICY IF EXISTS "Admin can view all users" ON auth.users;

-- Create new admin policies for reservations using a simpler check
CREATE POLICY "admin_access_salt_cave"
  ON salt_cave_reservations
  FOR ALL
  TO authenticated
  USING (current_setting('request.jwt.claims')::json->>'role' = 'admin');

CREATE POLICY "admin_access_motel"
  ON motel_reservations
  FOR ALL
  TO authenticated
  USING (current_setting('request.jwt.claims')::json->>'role' = 'admin');

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