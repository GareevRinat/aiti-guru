# Aiti Guru — Тестовое задание (React Developer)

Административная панель управления товарами с авторизацией.

## Запуск

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`

### Тестовые данные для входа
- **Логин:** `emilys`
- **Пароль:** `emilyspass`

## Сборка

```bash
npm run build
npm run preview
```

## Тесты

```bash
npm run test          # запуск тестов
npm run test:watch    # watch-режим
npm run test:coverage # покрытие
```

42 теста, 8 файлов — утилиты, Zustand stores, UI-компоненты, роутинг.

## Стек технологий

| Технология | Назначение | Обоснование выбора |
|---|---|---|
| **React 19** + TypeScript (strict) | UI + типизация | Требование ТЗ |
| **Vite** | Сборщик | Быстрый HMR, простая конфигурация |
| **React Router v7** | Маршрутизация | Стандарт для SPA, lazy loading страниц |
| **TanStack Query** | Серверное состояние | Кэширование, автоматический рефетч, дедупликация запросов |
| **Zustand** | Клиентское состояние | Минималистичный API, без бойлерплейта Redux |
| **React Hook Form + Zod** | Формы + валидация | Производительные формы без лишних ре-рендеров, декларативная валидация |
| **Axios** | HTTP-клиент | Интерцепторы для токена, удобная обработка ошибок |
| **SASS Modules** | Стилизация | Изоляция стилей, SCSS-переменные для дизайн-токенов |
| **React Hot Toast** | Уведомления | Легковесная библиотека для toast-уведомлений |
| **Vitest** + Testing Library | Тестирование | Нативная интеграция с Vite, React-компоненты |

## Архитектура

Упрощённый Feature-Sliced Design:

```
src/
  app/            — Провайдеры, роутер, глобальные стили
  pages/          — Страницы (LoginPage, ProductsPage)
  features/       — Бизнес-логика (auth, products)
  shared/
    api/          — Axios instance, интерцепторы
    ui/           — Переиспользуемые компоненты (Button, Input, Modal, Pagination, Icons)
    lib/          — Утилиты (debounce, formatPrice, i18n)
    types/        — Общие TypeScript-типы
  test/           — Тестовая инфраструктура (setup, mocks)
```

## Функциональность

- Авторизация через DummyJSON Auth API
- Чекбокс "Запомнить данные" (localStorage vs sessionStorage)
- Таблица товаров с пагинацией
- Сортировка по столбцам (через API)
- Поиск товаров (через API с debounce 300ms)
- Добавление товара (локально + toast)
- Выделение строк таблицы (клик по строке, select all)
- Подсветка низкого рейтинга (< 3.5) красным
- Прогресс-бар при загрузке
- Lazy loading страниц
- Локализация (все UI-тексты в `shared/lib/i18n`)
- Централизованная иконочная система (`shared/ui/Icons`)
- Дизайн-токены через SCSS-переменные

## ИИ

При разработке использовался **Claude Opus 4.6** (Claude Code CLI).
Все промпты зафиксированы в файле [PROMPTS.md](./PROMPTS.md).
