# Konfiguracja Storyblok dla komponentu News

Poniżej znajduje się instrukcja konfiguracji News Section i artykułów w Storyblok na podstawie aktualnej struktury projektu.

## 1. News Section - komponent nadrzędny

W Storyblok utworzony został komponent `news_section`, który zawiera listę artykułów. Nie wymaga dodatkowej konfiguracji, ponieważ jest już skonfigurowany w systemie.

## 2. Artykuły - struktura

Każdy artykuł (`article`) składa się z następujących pól:

- **title** (Tytuł) - tytuł artykułu
- **content** (Treść) - treść artykułu w formacie Textarea
- **image** (Zdjęcie) - główne zdjęcie artykułu
- **tags** (Tagi) - lista tagów (maksymalnie 5 jest wyświetlanych)
- **publish_date** (Data publikacji) - data publikacji artykułu
- **article_number** (Numer artykułu) - unikalny numer identyfikacyjny artykułu, wykorzystywany w URL

## 3. Dodawanie nowych artykułów

Aby dodać nowy artykuł:

1. Przejdź do sekcji "News section" w Storyblok
2. Kliknij przycisk "+" w sekcji "Articles"
3. Wybierz "Article" z dostępnych komponentów
4. Wypełnij wszystkie pola:
   - Tytuł artykułu
   - Treść
   - Dodaj obraz (najlepiej w proporcjach 16:9 dla spójnego wyglądu)
   - Wybierz odpowiednie tagi (pamiętaj, że wyświetlanych jest maksymalnie 5 pierwszych tagów)
   - Ustaw datę publikacji
   - Przydziel unikalny numer artykułu (będzie używany w URL: `/aktualnosci/{article_number}`)
5. Zapisz i opublikuj zmiany

## 4. Linki do artykułów

System automatycznie generuje linki do artykułów w formacie:

```
/aktualnosci/{article_number}
```

Nie ma potrzeby dodawania osobnego pola typu slug, ponieważ w linkach wykorzystywane są numery artykułów.

## 5. Struktura na stronie głównej

Komponent News Section wyświetla artykuły jako kafelki (maksymalnie 6), zawierające:

- Zdjęcie
- Tagi (maksymalnie 5)
- Tytuł
- Skrócony tekst (maksymalnie 150 znaków)
- Przycisk "Czytaj więcej" (kierujący do pełnego artykułu)

Na dole sekcji znajduje się przycisk "Zobacz wszystko", który prowadzi do pełnej listy artykułów.

---

Te instrukcje zakładają podstawową znajomość interfejsu Storyblok. Struktura może wymagać dostosowania do konkretnych potrzeb projektu.
