/*
  # Disable RLS for admin access

  1. Changes
    - Drop existing policies that may interfere
    - Create new admin bypass policy
    - Maintain public access policies
    - Add admin role check function

  2. Security
    - Only authenticated admin users can bypass RLS
    - Public users still restricted by existing policies
*/

-- Create admin role check function
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN current_setting('request.jwt.claims')::json->>'role' = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing admin policies
DROP POLICY IF EXISTS "admin_access_salt_cave" ON salt_cave_reservations;
DROP POLICY IF EXISTS "admin_access_motel" ON motel_reservations;

-- Create bypass RLS policies for admins
CREATE POLICY "admin_bypass_salt_cave_rls"
  ON salt_cave_reservations
  FOR ALL
  TO authenticated
  USING (auth.is_admin())
  WITH CHECK (auth.is_admin());

CREATE POLICY "admin_bypass_motel_rls"
  ON motel_reservations
  FOR ALL
  TO authenticated
  USING (auth.is_admin())
  WITH CHECK (auth.is_admin());

-- Ensure public policies remain
ALTER TABLE salt_cave_reservations FORCE ROW LEVEL SECURITY;
ALTER TABLE motel_reservations FORCE ROW LEVEL SECURITY;