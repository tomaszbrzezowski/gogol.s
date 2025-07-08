/*
  # Fix admin permissions for reservations

  1. Changes
    - Drop existing policies
    - Create new unified policies for admin access
    - Add public read access for own reservations
    - Add public create access

  2. Security
    - Enable RLS
    - Add proper policies for admin and public access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admin full access to salt cave reservations" ON salt_cave_reservations;
DROP POLICY IF EXISTS "Admin full access to motel reservations" ON motel_reservations;

-- Create new admin policies
CREATE POLICY "admin_salt_cave_access"
  ON salt_cave_reservations
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE role = 'admin'
  ));

CREATE POLICY "admin_motel_access"
  ON motel_reservations
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE role = 'admin'
  ));

-- Add public read access for own reservations
CREATE POLICY "users_read_own_salt_cave"
  ON salt_cave_reservations
  FOR SELECT
  TO public
  USING (auth.uid() = user_id);

CREATE POLICY "users_read_own_motel"
  ON motel_reservations
  FOR SELECT
  TO public
  USING (auth.uid() = user_id);

-- Add public create access
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