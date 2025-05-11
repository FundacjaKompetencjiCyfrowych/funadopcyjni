# Konfiguracja struktury folderów w Storyblok dla karuzeli

## 1. Utworzenie folderu "karuzele"

1. Zaloguj się do panelu Storyblok
2. Przejdź do sekcji "Content" w lewym menu
3. Znajdź przycisk "+ Create" lub "+" w górnej części interfejsu
4. Wybierz opcję "Create folder"
5. Wpisz nazwę folderu: "karuzele"
6. Kliknij "Create"

## 2. Utworzenie karuzeli w folderze

1. Kliknij na nowo utworzony folder "karuzele"
2. Kliknij przycisk "+ Create" lub "+" w górnej części interfejsu
3. Wybierz opcję "Create story"
4. Wypełnij formularz:
   - **Name**: Karuzela Główna
   - **Slug**: karuzela-glowna
   - **Content type**: main_carousel
5. Kliknij "Create"

## 3. Konfiguracja i dodanie slajdów do karuzeli

1. W nowo utworzonej historii "Karuzela Główna" znajdziesz komponent karuzeli
2. Skonfiguruj ogólne ustawienia karuzeli:
   - **Autoplay**: Wybierz czy karuzela ma się automatycznie przewijać (domyślnie włączone)
   - **Opóźnienie autoplay (ms)**: Ustaw czas w milisekundach między zmianami slajdów (domyślnie 3000ms = 3 sekundy)
3. W sekcji "Slajdy" kliknij przycisk "+ Add item"
4. Dla każdego slajdu uzupełnij:
   - **Zdjęcie**: Wybierz lub prześlij zdjęcie
   - **Tytuł**: Wprowadź tytuł slajdu
   - **Opis**: Wprowadź opis slajdu
   - **Tekst przycisku**: Wprowadź tekst wyświetlany na przycisku
   - **Link**: Wprowadź URL, na który ma kierować przycisk
5. Dodaj co najmniej 3 slajdy (zgodnie z ustawieniami)
6. Kliknij "Save" w prawym górnym rogu
7. Kliknij "Publish" aby opublikować karuzelę

## 4. Weryfikacja

Po opublikowaniu karuzeli, odśwież stronę główną swojego projektu. Powinieneś zobaczyć:

1. Oryginalną karuzelę na górze strony
2. Nową karuzelę, której dane pochodzą ze Storyblok, poniżej oryginalnej karuzeli
3. Automatyczne przewijanie slajdów zgodnie z ustawieniami autoplay

## Uwagi

- Upewnij się, że folder nazywa się dokładnie "karuzele", a historia "Karuzela Główna" - wielkość liter ma znaczenie!
- Jeśli nie widzisz karuzeli na stronie po opublikowaniu, sprawdź konsolę błędów w przeglądarce oraz logi serwera.
- Jeśli chcesz dodać więcej karuzeli, możesz utworzyć kolejne historie w folderze "karuzele", a następnie zmodyfikować kod strony, aby je wyświetlać.
- Funkcja autoplay karuzeli działa domyślnie z 3-sekundowym opóźnieniem, ale możesz to zmienić w ustawieniach.
