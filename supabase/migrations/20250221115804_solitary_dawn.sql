/*
  # Create Reservations Schema

  1. New Tables
    - `salt_cave_reservations`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `date` (date)
      - `time` (time)
      - `ticket_type` (text)
      - `number_of_people` (int)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `status` (text)
      - `user_id` (uuid, foreign key)

    - `motel_reservations`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `check_in` (date)
      - `check_out` (date)
      - `room_type` (text)
      - `number_of_guests` (int)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `status` (text)
      - `user_id` (uuid, foreign key)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their reservations
    - Add policies for admin users to manage all reservations
*/

-- Create salt cave reservations table
CREATE TABLE IF NOT EXISTS salt_cave_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  date date NOT NULL,
  time time NOT NULL,
  ticket_type text NOT NULL,
  number_of_people int NOT NULL CHECK (number_of_people > 0),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  user_id uuid REFERENCES auth.users(id),
  UNIQUE(date, time)
);

-- Create motel reservations table
CREATE TABLE IF NOT EXISTS motel_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  check_in date NOT NULL,
  check_out date NOT NULL,
  room_type text NOT NULL,
  number_of_guests int NOT NULL CHECK (number_of_guests > 0),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  user_id uuid REFERENCES auth.users(id),
  CHECK (check_out > check_in)
);

-- Enable RLS
ALTER TABLE salt_cave_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE motel_reservations ENABLE ROW LEVEL SECURITY;

-- Create policies for salt cave reservations
CREATE POLICY "Users can view their own salt cave reservations"
  ON salt_cave_reservations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own salt cave reservations"
  ON salt_cave_reservations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own salt cave reservations"
  ON salt_cave_reservations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all salt cave reservations"
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

-- Create policies for motel reservations
CREATE POLICY "Users can view their own motel reservations"
  ON motel_reservations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own motel reservations"
  ON motel_reservations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own motel reservations"
  ON motel_reservations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all motel reservations"
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

-- Create indexes for better query performance
CREATE INDEX salt_cave_reservations_date_time_idx ON salt_cave_reservations(date, time);
CREATE INDEX salt_cave_reservations_user_id_idx ON salt_cave_reservations(user_id);
CREATE INDEX motel_reservations_check_in_out_idx ON motel_reservations(check_in, check_out);
CREATE INDEX motel_reservations_user_id_idx ON motel_reservations(user_id);