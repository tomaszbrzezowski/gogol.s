/*
  # Add admin authentication functionality

  1. Changes
    - Add function to check admin status
    - Add admin-specific policies for reservations

  2. Security
    - Only authenticated admins can access admin features
    - Admins can view and manage all reservations
*/

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT role = 'admin'
    FROM auth.users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add admin policies for salt cave reservations
CREATE POLICY "Admin can manage all salt cave reservations"
  ON salt_cave_reservations
  FOR ALL
  TO authenticated
  USING (auth.is_admin());

-- Add admin policies for motel reservations
CREATE POLICY "Admin can manage all motel reservations"
  ON motel_reservations
  FOR ALL
  TO authenticated
  USING (auth.is_admin());