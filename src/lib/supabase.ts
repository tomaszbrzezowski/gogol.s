import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SaltCaveReservation = {
  id: string;
  created_at: string;
  date: string;
  time: string;
  ticket_type: string;
  number_of_people: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  user_id: string;
};

export type MotelReservation = {
  id: string;
  created_at: string;
  check_in: string;
  check_out: string;
  room_type: string;
  number_of_guests: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  user_id: string;
};

export type SiteContent = {
  id: string;
  created_at: string;
  updated_at: string;
  key: string;
  title: string;
  content: string;
  content_type: 'text' | 'html' | 'markdown';
  section: string;
  is_active: boolean;
  updated_by: string;
};

export type SiteImage = {
  id: string;
  created_at: string;
  updated_at: string;
  key: string;
  title: string;
  alt_text: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  section: string;
  is_active: boolean;
  uploaded_by: string;
};

export type AdminUser = {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  full_name: string;
  role: 'admin' | 'super_admin';
  is_active: boolean;
  last_login: string;
  created_by: string;
};

export type ReservationStats = {
  type: 'salt_cave' | 'motel';
  total_reservations: number;
  confirmed_reservations: number;
  pending_reservations: number;
  cancelled_reservations: number;
};