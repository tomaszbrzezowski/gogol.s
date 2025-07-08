/*
  # Fix admin policies

  1. Changes
    - Drop and recreate admin policies with unique names
    - Ensure proper policy hierarchy
    - Fix permission issues for admin access

  2. Security
    - Maintain existing security model
    - Ensure admin access to all reservations
*/

-- Drop existing policies with similar names
DROP POLICY IF EXISTS "Admin can view all salt cave reservations" ON salt_cave_reservations;
DROP POLICY IF EXISTS "Admin can update all salt cave reservations" ON salt_cave_reservations;
DROP POLICY IF EXISTS "Admin can view all motel reservations" ON motel_reservations;
DROP POLICY IF EXISTS "Admin can update all motel reservations" ON motel_reservations;
DROP POLICY IF EXISTS "Admin can manage all salt cave reservations" ON salt_cave_reservations;
DROP POLICY IF EXISTS "Admin can manage all motel reservations" ON motel_reservations;

-- Create new unified admin policies with unique names
CREATE POLICY "Admin full access to salt cave reservations"
  ON salt_cave_reservations
  FOR ALL
  TO authenticated
  USING (auth.is_admin());

CREATE POLICY "Admin full access to motel reservations"
  ON motel_reservations
  FOR ALL
  TO authenticated
  USING (auth.is_admin());