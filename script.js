document.addEventListener('DOMContentLoaded', function() {
  
  // ===== 1. Инициализация Telegram WebApp =====
  function initTelegramApp() {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
      const tg = Telegram.WebApp;
      tg.expand(); // Раскрыть на весь экран
      tg.enableClosingConfirmation(); // Подтверждение при закрытии
      console.log('Telegram WebApp инициализирован!');
    }
  }

  // Пробуем инициализировать (с задержкой для надёжности)
  initTelegramApp();
  setTimeout(initTelegramApp, 500); // Дополнительная проверка через 0.5 сек

  // ===== 2. Навигация и аватар =====
  const buttons = document.querySelectorAll('.nav-button');
  const profileScreen = document.getElementById('profile-screen');
  const avatar = document.getElementById('avatar');
  const uploadInput = document.getElementById('upload-avatar');

  // Обработчики кнопок
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Показать/скрыть профиль
      profileScreen.style.display = index === 1 ? 'block' : 'none';
    });
  });

  // Загрузка аватарки
  if (uploadInput && avatar) {
    uploadInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        avatar.src = event.target.result;
        localStorage.setItem('customAvatar', event.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  // Восстановление аватарки из localStorage
  const savedAvatar = localStorage.getItem('customAvatar');
  if (savedAvatar && avatar) {
    avatar.src = savedAvatar;
  }
});