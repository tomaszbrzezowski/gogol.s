/*
  # Update RLS policies for reservations

  1. Changes
    - Add public access policies for creating reservations
    - Allow anonymous users to create reservations
    - Maintain existing policies for authenticated users

  2. Security
    - Public can only create new reservations
    - Users can still view and manage their own reservations
    - Admins retain full access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create their own salt cave reservations" ON salt_cave_reservations;
DROP POLICY IF EXISTS "Users can create their own motel reservations" ON motel_reservations;

-- Create new policies for salt cave reservations
CREATE POLICY "Anyone can create salt cave reservations"
  ON salt_cave_reservations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create new policies for motel reservations
CREATE POLICY "Anyone can create motel reservations"
  ON motel_reservations
  FOR INSERT
  TO public
  WITH CHECK (true);