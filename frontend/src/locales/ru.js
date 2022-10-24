export default {
  translation: {
    notifications: {
      fetchData: {
        error: 'Ошибка соединения',
      },
      channels: {
        add: {
          success: 'Канал создан',
          error: 'Не удалось создать канал',
        },
        rename: {
          success: 'Канал переименован',
          error: 'Не удалось переименовать канал',
        },
        remove: {
          success: 'Канал удалён',
          error: 'Не удалось удалить канал',
        },
      },
    },
    channels: {
      managing: {
        title: 'Управление каналом',
        rename: 'Переименовать',
        remove: 'Удалить',
      },
    },
    chat: {
      logo: 'Hexlet Chat',
      messages: 'сообщений',
      channels: 'Каналы',
    },
    errors: {
      reload: 'Повторить запрос',
    },
    signOut: 'Выйти',
    forms: {
      required: 'Обязательное поле',
      signIn: {
        title: 'Войти',
        username: 'Ваш ник',
        password: 'Пароль',
        submit: 'Войти',
        imgAlt: 'Войти',
        footer: {
          title: 'Нет аккаунта?',
          linkText: 'Регистрация',
        },
        error: 'Неверные имя пользователя или пароль',
      },
      signUp: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        passwordsMustMatch: 'Пароли должны совпадать',
        title: 'Регистрация',
        submit: 'Зарегистрироваться',
        errors: {
          network: 'Ошибка сети',
          username: {
            minmax: 'От 3 до 20 символов',
            unavailable: 'Такой пользователь уже существует',
          },
          password: {
            min: 'Не менее 6 символов',
          },
          confirmPassword: {
            shouldMatch: 'Пароли должны совпадать',
          },
        },
      },
      message: {
        placeholder: 'Введите сообщение',
        ariaLabel: 'Новое сообщение',
      },
    },
    modals: {
      submit: 'Отправить',
      cancel: 'Отменить',
      channels: {
        label: 'Имя канала',
        add: {
          title: 'Добавить канал',
        },
        rename: {
          title: 'Переименовать канал',
        },
        remove: {
          title: 'Удалить канал',
          body: 'Уверены?',
          submit: 'Удалить',
        },
      },
    },
    missingPage: {
      notFound: 'Страница не найдена',
      youCanVisit: 'Но вы можете перейти ',
      mainPage: 'на главную страницу',
    },
  },
};
