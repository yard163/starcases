// Инициализация Telegram WebApp
function initTelegramApp() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;

  // Все доступные методы API
  tg.ready();
  tg.expand();
  
  // Для отладки
  console.log("WebApp initialized!", {
    platform: tg.platform,
    version: tg.version,
    isExpanded: tg.isExpanded
  });
}

// Основная функция
document.addEventListener('DOMContentLoaded', () => {
  // 1. Инициализируем Telegram
  initTelegramApp();
  
  // 2. Навигация
  const buttons = document.querySelectorAll('.nav-button');
  const profileScreen = document.getElementById('profile-screen');
  
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Переключение активной кнопки
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Переключение экранов
      profileScreen.style.display = index === 1 ? 'block' : 'none';
    });
  });

  // 3. Загрузка аватарки
  const avatar = document.getElementById('avatar');
  const uploadInput = document.getElementById('upload-avatar');
  
  if (uploadInput && avatar) {
    // Восстановление сохранённой аватарки
    const savedAvatar = localStorage.getItem('customAvatar');
    if (savedAvatar) avatar.src = savedAvatar;
    
    // Обработка загрузки новой
    uploadInput.addEventListener('change', (e) => {
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
});