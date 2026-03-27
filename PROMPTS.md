# Лог промптов к ИИ

> Модель: Claude Opus 4.6 (Claude Code CLI)
> Все промпты, использованные при разработке, зафиксированы ниже.

---

## Промпт #1 — Создание правил проекта и планирование

**Дата:** 2026-03-26
**Модель:** Claude Opus 4.6 (1M context) via Claude Code CLI

**Промпт:**
```
Мне нужно выполнить тестовое задание для прохождения собеседования на React разработчика,
при это, работодатель допускает работу с ИИ.
Обязательно указать в правилах необходимость соблюдения лучших практик при разработке на React.
Фиксировать промпты для последующей передачи ревьюверу.
Нужно в текущей директории сперва создать необходимые правила в MD для последующей работы
(Это будет небольшое веб-приложение на React с мок-данными DummyJSON).

[Приложены: ТЗ в PDF + Figma-макет]
```

**Результат:** Созданы CLAUDE.md (правила проекта, best practices, стек), PROMPTS.md (этот файл), план реализации.

---

## Промпт #2 — Реализация проекта

**Дата:** 2026-03-26
**Модель:** Claude Opus 4.6 (1M context) via Claude Code CLI

**Промпт:**
```
[Продолжение работы в той же сессии после одобрения плана]
Claude Code автоматически реализовал план из 7 этапов:
1. Инициализация Vite + React + TypeScript, установка зависимостей
2. Создание shared-слоя: типы API, Axios с интерцепторами, UI-компоненты (Button, Input, Checkbox, ProgressBar, Pagination, Modal), утилиты (debounce, formatPrice), глобальные стили
3. Авторизация: Zustand store с логикой localStorage/sessionStorage, API-функция логина, LoginPage с React Hook Form + Zod валидацией
4. Страница товаров: API-функции, React Query хуки, таблица с сортировкой по столбцам, поиск с debounce, пагинация, прогресс-бар загрузки
5. Добавление товара: модальное окно с формой, локальное добавление, toast-уведомление
6. Роутинг: React Router с lazy loading, ProtectedRoute, провайдеры
7. Финализация: README.md с обоснованием стека, .gitignore, favicon
```

**Результат:** Полностью работающее приложение. Сборка проходит без ошибок (tsc + vite build).

---

## Промпт #3 — UI-правки формы входа по Figma

**Дата:** 2026-03-26
**Модель:** Claude Opus 4.6 (1M context) via Claude Code CLI

**Промпт:**
```
Есть UI замечания.
Форма входа:
1. Логотип должен быть как в Figma
2. Задний фон блока градиент + должна быть рамка
3. Иконки для логина и пароля отличаются
4. Отличается шрифт

Все отличия нужно сравнивать с Figma
[Приложен скриншот макета из PDF]
```

**Исправления:**
1. **Логотип** — заменён на тёмный геометрический значок с треугольником (play) как в макете
2. **Фон** — добавлен градиент (сиреневый/голубой), карточка получила `border: 1px solid`
3. **Иконки** — поле "Почта": конверт + кнопка очистки (X) справа; поле "Пароль": замок (другой дизайн, более округлый) + глаз toggle
4. **Шрифт** — заменён на Manrope (более геометричный, ближе к макету)
5. **Input компонент** — добавлен prop `clearable` с кнопкой очистки

---

## Промпт #4 — Извлечение иконок из Figma и унификация

**Дата:** 2026-03-26
**Модель:** Claude Opus 4.6 (1M context) via Claude Code CLI

**Промпт:**
```
Логотип: [предоставлен SVG-код логотипа из Figma]

Извлеки все svg иконки из Figma макета и примени их на сайте.
```

**Исправления:**
1. **Логотип** — заменён на точный SVG из Figma (круг с эквалайзерными полосками, градиенты, тени)
2. **Создан `shared/ui/Icons/Icons.tsx`** — централизованный файл со всеми иконками-компонентами (19 иконок)
3. **Login page**: MailIcon, LockIcon (iconLeft), EyeIcon/EyeOffIcon (toggle пароля), CloseIcon (очистка)
4. **Products header**: SearchIcon, CrosshairIcon (⊕), UserBadgeIcon (пользователь с синим бейджем), MailHeaderIcon, DashboardIcon (4 квадрата)
5. **Toolbar**: RefreshIcon (↻), FilterIcon (сортировка/фильтр)
6. **Table actions**: PlusIcon (зелёная кнопка +), DotsVerticalIcon (⋮ заглушка), BarChartIcon (столбец "Количество" — вертикальные полоски вместо progress bar, как в макете)
7. **Pagination**: ChevronLeftIcon, ChevronRightIcon
8. **Modal**: ModalCloseIcon (X)
9. **LogoutIcon** — стрелка из двери
10. Удалены все inline SVG из компонентов — единый источник иконок

---

## Промпт #5 — Pixel-perfect корректировка по Figma-скриншотам

**Дата:** 2026-03-26
**Модель:** Claude Opus 4.6 (1M context) via Claude Code CLI

**Промпт:**
```
[Экспортированы скриншоты из Figma: "Авторизация (Desktop).png" и "Товары (Desktop).png"]
Pixel-perfect React component from Figma design.
File key: kOrbcEZJdxghRO4lB36lj5
Extract all colors, fonts, spacing, border-radius, box-shadow from Figma.
Cross-check implementation against screenshots.
```

**Обнаруженные отличия и исправления:**

### Login page:
1. **Лейбл "Логин"** (не "Почта") — в Figma чётко видно "Логин"
2. **Иконка UserIcon** (силуэт человека) вместо MailIcon (конверт) — соответствует полю "Логин"
3. **Placeholder "test"** (не "test@mail.com")
4. **Фон** — чистый серый `$color-bg`, без градиента (в Figma нет видимого градиента)

### Products page:
1. **Убран столбец "Количество"** — в Figma его нет, таблица: Наименование, Вендор, Артикул, Оценка, Цена ₽
2. **MinusIcon** вместо DotsVerticalIcon — серая кнопка ⊖ (горизонтальная черта в кружке), не ⋮
3. **Убран FilterIcon из тулбара** — в Figma только RefreshIcon + "Добавить"
4. **Цена стилизована**: целая часть обычным шрифтом, десятичная часть (,00) мельче и серая
5. **Зелёная кнопка → синяя** (`$color-primary`) — в Figma кнопка + синего цвета, не зелёного
6. **Серая кнопка** — обводка `$color-border` + прозрачный фон, иконка минус
7. **Убран `.logoutBtn`** — все кнопки хедера одним стилем
8. **Убран `box-shadow`** с таблицы, `text-transform: uppercase` с заголовков — в Figma этого нет

---

## Промпт #6 — Добавление тестов

**Дата:** 2026-03-27
**Модель:** Claude Opus 4.6 (1M context) via Claude Code CLI

**Промпт:**
```
Проверь и посмотри, что можно покрыть тестами (модульные, интеграционные, e2e)
```

**Результат:**
- Установлены: vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, jsdom, msw
- Настроен vitest.config.ts с jsdom, path aliases, CSS modules
- **42 теста в 8 файлах**, все проходят:
  - `formatPrice.test.ts` — 5 тестов (форматирование цен)
  - `debounce.test.ts` — 4 теста (задержка, сброс, аргументы)
  - `useAuthStore.test.ts` — 7 тестов (login/logout/hydrate, localStorage/sessionStorage)
  - `useProductsStore.test.ts` — 7 тестов (сортировка, поиск, добавление товара)
  - `Button.test.tsx` — 5 тестов (рендер, клик, loading, disabled)
  - `Modal.test.tsx` — 4 теста (open/close, Escape, overlay click)
  - `Pagination.test.tsx` — 6 тестов (рендер, навигация, disabled кнопки)
  - `ProtectedRoute.test.tsx` — 2 теста (редирект, рендер children)
