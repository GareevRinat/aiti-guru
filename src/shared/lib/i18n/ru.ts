export const ru = {
  // Login page
  login: {
    title: 'Добро пожаловать!',
    subtitle: 'Пожалуйста, авторизуйтесь',
    usernameLabel: 'Логин',
    usernamePlaceholder: 'test',
    passwordLabel: 'Пароль',
    passwordPlaceholder: 'Введите пароль',
    rememberMe: 'Запомнить данные',
    submit: 'Войти',
    or: 'или',
    noAccount: 'Нет аккаунта?',
    create: 'Создать',
    errorGeneric: 'Ошибка авторизации. Попробуйте снова.',
    errorUnexpected: 'Произошла непредвиденная ошибка.',
    fieldRequired: 'Поле обязательно для заполнения',
  },

  // Products page
  products: {
    title: 'Товары',
    searchPlaceholder: 'Найти',
    allItems: 'Все позиции',
    add: 'Добавить',
    showing: 'Показано',
    of: 'из',
    noResults: 'Товары не найдены',
  },

  // Table columns
  table: {
    name: 'Наименование',
    vendor: 'Вендор',
    sku: 'Артикул',
    rating: 'Оценка',
    price: 'Цена, ₽',
  },

  // Add product modal
  addProduct: {
    title: 'Добавить товар',
    nameLabel: 'Наименование',
    namePlaceholder: 'Название товара',
    nameRequired: 'Наименование обязательно',
    priceLabel: 'Цена',
    pricePlaceholder: '0.00',
    priceRequired: 'Цена обязательна',
    pricePositive: 'Цена должна быть положительной',
    vendorLabel: 'Вендор',
    vendorPlaceholder: 'Бренд',
    vendorRequired: 'Вендор обязателен',
    skuLabel: 'Артикул',
    skuPlaceholder: 'SKU',
    skuRequired: 'Артикул обязателен',
    submit: 'Добавить',
    successToast: 'Товар успешно добавлен',
  },

  // Common
  common: {
    loading: 'Загрузка...',
    close: 'Закрыть',
    clear: 'Очистить',
    showPassword: 'Показать пароль',
    hidePassword: 'Скрыть пароль',
    refresh: 'Обновить',
    more: 'Ещё',
    prevPage: 'Предыдущая страница',
    nextPage: 'Следующая страница',
  },
} as const;

export type Locale = typeof ru;
