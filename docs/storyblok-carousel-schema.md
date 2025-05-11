# Instrukcja konfiguracji karuzeli w Storyblok

## 1. Logowanie i dostęp do Block Library

1. Zaloguj się do swojego konta Storyblok na stronie https://app.storyblok.com
2. Wybierz swój projekt Fundacja Adopcyjni
3. W lewym menu znajdź i kliknij "Block Library" (powinno być w sekcji "Content")

## 2. Tworzenie bloku dla pojedynczego slajdu (Carousel Slide)

1. W Block Library kliknij przycisk "+ Create Block" (niebieski przycisk w prawym górnym rogu)
2. Wypełnij formularz:
   - **Name**: Carousel Slide
   - **Technical Name**: carousel_slide
   - **Icon**: wybierz ikonę obrazka/zdjęcia
   - **Category**: Components
3. Kliknij "Create"
4. Teraz dodaj pola do bloku:

   a) **Dodaj pole obrazka**:

   - Kliknij "+ Add Field"
   - Wybierz typ "Asset"
   - W ustawieniach pola:
     - **Display name**: Zdjęcie
     - **Technical name**: image
     - **Description**: Zdjęcie slajdu
     - Zaznacz "Field is required"
     - W sekcji "Asset type restriction" wybierz "Only images"
     - Kliknij "Add"

   b) **Dodaj pole tytułu**:

   - Kliknij "+ Add Field"
   - Wybierz typ "Text"
   - W ustawieniach pola:
     - **Display name**: Tytuł
     - **Technical name**: title
     - **Description**: Tytuł slajdu
     - Zaznacz "Field is required"
     - Kliknij "Add"

   c) **Dodaj pole opisu**:

   - Kliknij "+ Add Field"
   - Wybierz typ "Rich text" (lub "Textarea" jeśli chcesz prostszy format)
   - W ustawieniach pola:
     - **Display name**: Opis
     - **Technical name**: description
     - **Description**: Opis tekstu na slajdzie
     - Zaznacz "Field is required"
     - Kliknij "Add"

   d) **Dodaj pole tekstu przycisku**:

   - Kliknij "+ Add Field"
   - Wybierz typ "Text"
   - W ustawieniach pola:
     - **Display name**: Tekst przycisku
     - **Technical name**: buttonText
     - **Description**: Tekst, który będzie wyświetlany na przycisku
     - Zaznacz "Field is required"
     - Możesz ustawić wartość domyślną "Dowiedz się więcej"
     - Kliknij "Add"

   e) **Dodaj pole linku**:

   - Kliknij "+ Add Field"
   - Wybierz typ "Link"
   - W ustawieniach pola:
     - **Display name**: Link
     - **Technical name**: link
     - **Description**: Link do strony docelowej
     - Zaznacz "Field is required"
     - W sekcji "Link restrictions" możesz opcjonalnie zaznaczyć "Allow target option"
     - Kliknij "Add"

5. Kliknij "Save" aby zapisać blok slajdu

## 3. Tworzenie głównego bloku karuzeli (Main Carousel)

1. Wróć do Block Library klikając "Block Library" w lewym menu
2. Kliknij "+ Create Block"
3. Wypełnij formularz:
   - **Name**: Main Carousel
   - **Technical Name**: main_carousel (uwaga: nazwa MUSI być dokładnie taka jak w kodzie)
   - **Icon**: wybierz ikonę karuzeli/slajdera
   - **Category**: Components
4. Kliknij "Create"
5. Teraz dodaj pola:

   a) **Dodaj pole slajdów**:

   - Kliknij "+ Add Field"
   - Wybierz typ "Blocks"
   - W ustawieniach pola:
     - **Display name**: Slajdy
     - **Technical name**: slides
     - **Description**: Lista slajdów karuzeli
     - Zaznacz "Field is required"
     - W sekcji "Restrict blocks" wybierz TYLKO nowo utworzony blok "Carousel Slide"
     - Kliknij "Add"

   b) **Dodaj pole włącznika autoplay**:

   - Kliknij "+ Add Field"
   - Wybierz typ "Boolean"
   - W ustawieniach pola:
     - **Display name**: Autoplay
     - **Technical name**: autoplay
     - **Description**: Czy karuzela ma automatycznie się przewijać
     - Nie zaznaczaj "Field is required"
     - Ustaw domyślną wartość na "true"
     - Kliknij "Add"

   c) **Dodaj pole opóźnienia autoplay**:

   - Kliknij "+ Add Field"
   - Wybierz typ "Number"
   - W ustawieniach pola:
     - **Display name**: Opóźnienie autoplay (ms)
     - **Technical name**: autoplayDelay
     - **Description**: Czas w milisekundach między automatycznymi przejściami slajdów
     - Nie zaznaczaj "Field is required"
     - Ustaw domyślną wartość na "3000"
     - Kliknij "Add"

6. Kliknij "Save" aby zapisać główny blok karuzeli

## 4. Dodawanie karuzeli do strony

1. Przejdź do sekcji "Content" w lewym menu
2. Wybierz stronę, na której chcesz umieścić karuzelę (np. "Home")
3. W edytorze treści wybierz miejsce, gdzie ma być umieszczona karuzela
4. Kliknij przycisk "+" aby dodać nowy blok
5. W oknie wyboru bloków znajdź i wybierz "Main Carousel"
6. Skonfiguruj karuzelę:

   - Opcjonalnie zmień ustawienia "Autoplay" i "Opóźnienie autoplay"
   - W sekcji "Slajdy" kliknij przycisk "+ Add item"
   - Dla każdego nowego slajdu:
     - Kliknij na pole "Zdjęcie" i wybierz lub prześlij obraz
     - Wprowadź "Tytuł" slajdu
     - W polu "Opis" wprowadź tekst, który ma być wyświetlany
     - W polu "Tekst przycisku" wprowadź tekst, który będzie widoczny na przycisku
     - W polu "Link" wprowadź adres URL, na który ma kierować przycisk
   - Powtarzaj dodawanie slajdów, aż uzyskasz pożądaną liczbę

7. Kliknij "Save" w prawym górnym rogu, aby zapisać zmiany
8. Kliknij "Publish" aby opublikować zmiany i zobaczyć karuzelę na stronie

## 5. Sprawdzanie i edycja karuzeli

1. Po publikacji otwórz stronę w przeglądarce, aby zobaczyć, jak działa karuzela
2. Aby edytować istniejącą karuzelę:
   - Wróć do edytora treści w Storyblok
   - Znajdź blok "Main Carousel"
   - Kliknij na niego, aby otworzyć edycję
   - Wprowadź potrzebne zmiany
   - Zapisz i opublikuj zmiany

## Wskazówki

1. **Zdjęcia**: Najlepiej używać zdjęć o wymiarach w proporcji 16:9 lub podobnych. Zalecana minimalna szerokość to 1200px.
2. **Tytuły i opisy**: Staraj się, aby tytuły i opisy były zwięzłe i czytelne.
3. **Przyciski**: Domyślny tekst przycisku "Dowiedz się więcej" możesz zmienić na bardziej odpowiedni dla danego slajdu.
4. **Linki**: Upewnij się, że wszystkie linki prowadzą do istniejących stron.
5. **Autoplay**: Funkcja autoplay domyślnie jest włączona z 3-sekundowym opóźnieniem. Możesz to zmienić w ustawieniach karuzeli.
