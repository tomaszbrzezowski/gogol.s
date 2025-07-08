# Panel Administratora - Gogol's

## 🔐 Dane do logowania (Mock Authentication)

⚠️ **System używa lokalnego mock auth - bez połączenia z Supabase!**

### Konta testowe:

**Administrator:**
- Email: `admin@gogols.pl`
- Hasło: `admin123`
- Uprawnienia: Podstawowe zarządzanie rezerwacjami i treścią

**Super Administrator:**
- Email: `superadmin@gogols.pl` 
- Hasło: `superadmin123`
- Uprawnienia: Pełne zarządzanie systemem

### 🛡️ Jak działa Mock Auth:
- **Lokalne przechowywanie** - sesja w localStorage
- **Brak zewnętrznych API** - wszystko działa offline
- **Symulacja opóźnień** - realistyczne doświadczenie UX
- **Automatyczne wylogowanie** - po zamknięciu przeglądarki (opcjonalnie)
- **Wspólna sesja** - między kartami przeglądarki

## 🌟 Funkcjonalności Panelu Admina

### 📊 Dashboard
- **Statystyki rezerwacji** - podsumowanie dla Groty Solnej i Pensjonatu
- **Szybkie akcje** - łatwy dostęp do wszystkich sekcji
- **Wizualizacja danych** - liczba rezerwacji według statusu

### 🧂 Zarządzanie Grotą Solną
- **Lista rezerwacji** - wszystkie sesje w grocie solnej
- **Zarządzanie statusami** - oczekujące/potwierdzone/anulowane
- **Wyszukiwanie** - po nazwie klienta, email lub telefonie
- **Filtrowanie** - według statusu rezerwacji
- **Automatyczne emaile** - potwierdzenia rezerwacji

### 🏨 Zarządzanie Pensjonatem  
- **Lista rezerwacji** - wszystkie pokoje i terminy
- **Zarządzanie statusami** - kompletna kontrola rezerwacji
- **Szczegóły pokoi** - typy pokoi i liczba gości
- **Daty pobytu** - check-in i check-out

### ✏️ Zarządzanie Treścią Strony
- **Edycja tekstów** - tytuły, opisy, informacje kontaktowe
- **Różne typy treści** - tekst, HTML, Markdown
- **Sekcje strony** - home, pensjonat, grota, kontakt
- **Status publikacji** - aktywna/nieaktywna treść

### 🖼️ Zarządzanie Zdjęciami
- **Galeria obrazów** - wszystkie zdjęcia na stronie
- **Podgląd miniatur** - szybki przegląd wszystkich obrazów
- **Metadane** - tytuły, alt text, ścieżki plików
- **Organizacja** - według sekcji strony

## 📝 Przykładowe Dane Testowe

System zawiera przykładowe rezerwacje dla obu usług:

**Grota Solna:**
- 5 przykładowych rezerwacji
- Różne typy biletów (normalny, ulgowy, karnety rodzinne)
- Różne statusy (potwierdzone, oczekujące, anulowane)

**Pensjonat:**
- 5 przykładowych rezerwacji  
- Wszystkie typy pokoi
- Różne okresy pobytu
- Różne statusy rezerwacji

## 🛠️ Funkcje Administratora

### Zarządzanie Rezerwacjami:
1. **Zmiana statusu** - dropdown do szybkiej zmiany
2. **Usuwanie rezerwacji** - z potwierdzeniem bezpieczeństwa  
3. **Sortowanie** - według daty, nazwy klienta, itp.
4. **Eksport danych** - możliwość rozszerzenia
5. **Wysyłanie emaili** - automatyczne potwierdzenia

### Zarządzanie Treścią:
1. **Edycja inline** - bezpośrednia edycja w tabeli
2. **Różne formaty** - obsługa tekstu, HTML, Markdown
3. **Wersjonowanie** - śledzenie zmian (updated_at)
4. **Kontrola publikacji** - włączanie/wyłączanie treści

## 🚀 Uruchomienie

1. **Brak konfiguracji** - system działa bez Supabase!
2. **Otwórz `/admin`** w przeglądarce
3. **Kliknij przycisk** "Wypełnij dane Admin/Super Admin" 
4. **Zaloguj się** i ciesz się pełną funkcjonalnością
5. **Eksploruj** - przejdź przez wszystkie zakładki
6. **Testuj funkcje** - edytuj treść, zmieniaj statusy rezerwacji

### ⚡ Szybki start:
- Nie potrzebujesz konta Supabase
- Wszystkie dane są mock/testowe
- System działa w 100% offline

## 📋 System Rezerwacji

### Grota Solna:
- **Sesje 45-minutowe**
- **Różne typy biletów** z różnymi cenami
- **Karnety rodzinne** dla większych grup
- **Wynajem prywatny** całej groty

### Pensjonat:
- **10 pokoi** różnych typów
- **Doba hotelowa** 14:00 - 11:00
- **Elastyczne daty** pobytu
- **Różne opcje** liczby gości

## 🔧 Rozbudowa Systemu

System jest przygotowany na dalszy rozwój:
- **Upload plików** - zarządzanie zdjęciami
- **Kalendarz dostępności** - wizualne planowanie
- **Płatności online** - integracja z bramkami
- **Raporty** - szczegółowe analizy
- **Powiadomienia** - SMS i email
- **Multi-język** - obsługa wielu języków

## 📞 Kontakt i Wsparcie

W przypadku problemów z panelem administratora:
1. Sprawdź console przeglądarki (F12)
2. Zweryfikuj połączenie z bazą danych
3. Upewnij się, że używasz poprawnych danych logowania

---

**Miłego testowania! 🎉** 