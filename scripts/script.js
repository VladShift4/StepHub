// Чекаємо, поки вся сторінка завантажиться
document.addEventListener('DOMContentLoaded', () => {

    // 1. Знаходимо всі кнопки "Купити" на сторінці
    const buyButtons = document.querySelectorAll('.buy-button');

    // 2. Знаходимо наш контейнер для сповіщень
    const notificationContainer = document.getElementById('notification-container');

    // 3. Проходимося по кожній кнопці і додаємо слухача події "click"
    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Забороняємо стандартну дію посилання (перехід на іншу сторінку)
            event.preventDefault();

            // --- Створюємо сповіщення ---

            // a) Створюємо новий елемент <div>
            const notification = document.createElement('div');

            // b) Додаємо йому клас 'notification', щоб застосувати стилі з CSS
            notification.classList.add('notification');

            // c) Додаємо текст та іконку
            notification.innerText = 'Товар додано до кошика! ✅';

            // d) Додаємо створене сповіщення в наш контейнер на сторінці
            notificationContainer.appendChild(notification);

            // e) Плануємо видалення сповіщення через 3 секунди
            setTimeout(() => {
                // Додаємо клас для анімації зникнення
                notification.classList.add('fade-out');

                // Чекаємо, поки анімація зникнення завершиться (500мс), і тоді видаляємо елемент
                setTimeout(() => {
                    notification.remove();
                }, 500); // Цей час має збігатися з тривалістю анімації fadeOut

            }, 3000); // 3000 мілісекунд = 3 секунди
        });
    });
});