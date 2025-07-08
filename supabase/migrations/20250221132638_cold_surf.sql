/*
  # Disable RLS for tables

  1. Changes
    - Disable RLS for salt_cave_reservations and motel_reservations tables
    - Drop all existing policies as they won't be needed with RLS disabled
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "admin_bypass_salt_cave_rls" ON salt_cave_reservations;
DROP POLICY IF EXISTS "admin_bypass_motel_rls" ON motel_reservations;
DROP POLICY IF EXISTS "public_read_own_salt_cave" ON salt_cave_reservations;
DROP POLICY IF EXISTS "public_read_own_motel" ON motel_reservations;
DROP POLICY IF EXISTS "public_create_salt_cave" ON salt_cave_reservations;
DROP POLICY IF EXISTS "public_create_motel" ON motel_reservations;

-- Disable RLS
ALTER TABLE salt_cave_reservations DISABLE ROW LEVEL SECURITY;
ALTER TABLE motel_reservations DISABLE ROW LEVEL SECURITY;