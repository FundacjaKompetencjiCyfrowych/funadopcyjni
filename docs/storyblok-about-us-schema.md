# Instrukcja konfiguracji bloku "O nas" w Storyblok

## 1. Utworzenie bloku "About Us" w Block Library

1. Zaloguj się do Storyblok i wybierz swój projekt
2. Przejdź do sekcji "Block Library" w lewym menu
3. Kliknij przycisk "+ Create Block" w prawym górnym rogu
4. Wypełnij formularz:
   - **Name**: About Us
   - **Technical Name**: about_us (ważne: musi być dokładnie taka nazwa)
   - **Icon**: Wybierz odpowiednią ikonę (np. informacji)
   - **Category**: Components
5. Kliknij "Create"

## 2. Dodanie pól do bloku "About Us"

1. W edytorze bloku, zacznij dodawać pola poprzez przycisk "+ Add Field"

   a) **Dodaj pole tytułu**:

   - Wybierz typ "Text"
   - W ustawieniach pola:
     - **Display name**: Tytuł
     - **Technical name**: title
     - **Description**: Główny tytuł sekcji O nas
     - Zaznacz "Field is required"
     - Kliknij "Add"

   b) **Dodaj pole opisu**:

   - Wybierz typ "Textarea" lub "Rich text"
   - W ustawieniach pola:
     - **Display name**: Opis
     - **Technical name**: description
     - **Description**: Opis sekcji O nas
     - Zaznacz "Field is required"
     - Kliknij "Add"

   c) **Dodaj pole obrazu**:

   - Wybierz typ "Asset"
   - W ustawieniach pola:
     - **Display name**: Zdjęcie
     - **Technical name**: image
     - **Description**: Zdjęcie sekcji O nas
     - Zaznacz "Field is required"
     - W "Asset type restriction" wybierz "Only images"
     - Kliknij "Add"

2. Kliknij "Save" aby zapisać konfigurację bloku

## 3. Dodanie bloku "About Us" do strony głównej

1. Przejdź do sekcji "Content" w lewym menu
2. Znajdź i wybierz swoją stronę główną ("Home")
3. W edytorze treści, znajdź sekcję "body" (lista bloków treści)
4. Kliknij przycisk "+" aby dodać nowy blok
5. Wybierz "About Us" z listy dostępnych bloków
6. Wypełnij wszystkie pola:
   - **Tytuł**: np. "Fundacja Adopcyjni - Wspieramy rodziny w procesie adopcji"
   - **Opis**: Wprowadź opis działalności fundacji
   - **Zdjęcie**: Wybierz lub prześlij obraz
7. Kliknij "Save" w prawym górnym rogu
8. Kliknij "Publish" aby opublikować zmiany

## 4. Zalecany format i rozmiar obrazu

- Proporcje: 4:3
- Zalecany minimalny rozmiar: 800x600 pikseli
- Format: JPG lub PNG
- Zdjęcie powinno być wyraźne i dobrej jakości
- Najlepiej wybierać zdjęcia przedstawiające działalność fundacji, np. rodziny, dzieci, lub wolontariuszy

## 5. Porady dotyczące treści

1. **Tytuł**:

   - Powinien być zwięzły i informować o działalności fundacji
   - Przykład: "Fundacja Adopcyjni - Wspieramy rodziny w procesie adopcji"

2. **Opis**:
   - Powinien być przejrzysty i zwięzły
   - Można użyć kilku akapitów, ale nie za długich
   - Zalecane 3-5 zdań opisujących główne cele i działania fundacji
   - Przykład: "Fundacja Adopcyjni wspiera rodziny na każdym etapie procesu adopcji. Oferujemy pomoc prawną, psychologiczną oraz organizujemy grupy wsparcia dla rodzin adopcyjnych. Naszym celem jest tworzenie przyjaznego środowiska dla dzieci i rodziców w trakcie i po procesie adopcji."
