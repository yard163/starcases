document.addEventListener('DOMContentLoaded', function () {

    // Проверяем, запущено ли в Telegram WebApp
  const tg = window.Telegram?.WebApp; // Опциональная цепочка (?.), чтобы не было ошибки
  
  // Если Telegram WebApp доступен, инициализируем
  if (tg) {
    tg.expand(); // Раскрываем на весь экран
    tg.enableClosingConfirmation(); // Включаем подтверждение выхода
  }
  
  const buttons = document.querySelectorAll('.nav-button');
  const profileScreen = document.getElementById('profile-screen');
  const avatar = document.getElementById('avatar');
  const uploadInput = document.getElementById('upload-avatar');


  // Навигация
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Показать/скрыть профиль
      if (index === 1) {
        profileScreen.style.display = 'block';
      } else {
        profileScreen.style.display = 'none';
      }
    });
  });

  // Подгружаем сохранённую аватарку
  const savedAvatar = localStorage.getItem('customAvatar');
  if (savedAvatar && avatar) {
    avatar.src = savedAvatar;
  }

  // Обработка загрузки новой аватарки
  if (uploadInput) {
    uploadInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        const base64 = event.target.result;
        avatar.src = base64;
        localStorage.setItem('customAvatar', base64);
      };
      reader.readAsDataURL(file);
    });
  }
});
