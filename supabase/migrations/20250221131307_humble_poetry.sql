/*
  # Fix motel reservations query

  1. Changes
    - Add helper function to check room availability
    - Add indexes for better query performance
    - Add constraints to ensure valid dates

  2. Security
    - Maintain existing policies
*/

-- Add check constraint for valid dates
ALTER TABLE motel_reservations
ADD CONSTRAINT check_valid_dates
CHECK (check_out > check_in);

-- Create index for date range queries
CREATE INDEX motel_reservations_dates_idx ON motel_reservations USING btree (check_in, check_out);

-- Create function to check room availability
CREATE OR REPLACE FUNCTION check_room_availability(
  p_room_type text,
  p_check_in date,
  p_check_out date
) RETURNS boolean AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1
    FROM motel_reservations
    WHERE room_type = p_room_type
    AND status != 'cancelled'
    AND (
      (check_in <= p_check_out AND check_out >= p_check_in)
      OR
      (check_in >= p_check_in AND check_in < p_check_out)
    )
  );
END;
$$ LANGUAGE plpgsql;