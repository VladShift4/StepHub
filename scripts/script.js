document.addEventListener('DOMContentLoaded', () => {
    const addBuyButtonListeners = () => {
        const buyButtons = document.querySelectorAll('.buy-button');
        const notificationContainer = document.getElementById('notification-container');

        if (!notificationContainer) {
            console.warn('❌ Notification container not found!');
            return;
        }

        // функція показу повідомлення
        function showNotification(message, autoHideMs = 5000) {
            const notification = document.createElement('div');
            notification.classList.add('notification');
            notification.textContent = message;

            // кнопка ✖
            const closeBtn = document.createElement('button');
            closeBtn.classList.add('close-btn');
            closeBtn.innerHTML = "&times;";
            notification.appendChild(closeBtn);

            notificationContainer.appendChild(notification);

            // функція закриття
            const close = () => {
                notification.classList.add('fade-out');
                notification.addEventListener('animationend', () => {
                    notification.remove();
                }, { once: true });
            };

            // закриття по кліку
            closeBtn.addEventListener('click', close);

            // автозакриття через autoHideMs
            if (autoHideMs) {
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        close();
                    }
                }, autoHideMs);
            }
        }

        buyButtons.forEach(button => {
            if (button.dataset.listenerAttached) return;

            button.addEventListener('click', (event) => {
                event.preventDefault();
                showNotification('Товар додано до кошика! ✅', 2000); // 3 сек
            });

            button.dataset.listenerAttached = 'true';
        });
    };

    addBuyButtonListeners();
});
