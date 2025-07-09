import type { SaltCaveReservation, MotelReservation } from './supabase';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgegkbzv';

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (time: string) => {
  if (!time) return 'N/A';
  // Validate time format
  if (!/^\d{2}:\d{2}(:\d{2})?$/.test(time)) return time;
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
};

export const sendConfirmationEmail = async (reservation: SaltCaveReservation | MotelReservation) => {
  const isSaltCave = 'time' in reservation;
  
  const subject = isSaltCave
    ? 'Potwierdzenie rezerwacji - Grota Solna & Sauna Gogol\'s'
    : 'Potwierdzenie rezerwacji - Pensjonat Gogol\'s';

  const content = isSaltCave
    ? `
      <h2>Potwierdzenie rezerwacji w Grocie Solnej & Saunie</h2>
      <p>Drogi Kliencie,</p>
      <p>Twoja rezerwacja została potwierdzona. Szczegóły:</p>
      <ul>
        <li>Data: ${formatDate(reservation.date)}</li>
        <li>Godzina: ${formatTime(reservation.time)}</li>
        <li>Liczba osób: ${reservation.number_of_people}</li>
        <li>Rodzaj biletu: ${reservation.ticket_type}</li>
      </ul>
      <p>Adres: ul. Kamieńskiego 221/U1, 51-126 Wrocław</p>
    `
    : `
      <h2>Potwierdzenie rezerwacji w Pensjonacie</h2>
      <p>Drogi Kliencie,</p>
      <p>Twoja rezerwacja została potwierdzona. Szczegóły:</p>
      <ul>
        <li>Check-in: ${formatDate(reservation.check_in)}</li>
        <li>Check-out: ${formatDate(reservation.check_out)}</li>
        <li>Liczba gości: ${reservation.number_of_guests}</li>
        <li>Typ pokoju: ${reservation.room_type}</li>
      </ul>
      <p>Adres: ul. Milicka 60, 51-126 Wrocław</p>
    `;

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: reservation.customer_email,
        subject: subject,
        message: content
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Formspree error:', errorData);
      return; // Don't throw error to prevent breaking the status update
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return; // Don't throw error to prevent breaking the status update
  }
}