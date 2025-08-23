document.addEventListener('DOMContentLoaded', () => {

    // --- ЛОГІКА ДЛЯ СТОРІНКИ КОЛЕКЦІЇ (SHOES.HTML) ---
    const catalogGrid = document.getElementById('catalog-grid');

    if (catalogGrid) {
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');

        const allProductCards = Array.from(catalogGrid.querySelectorAll('.product-card'));

        const applyFiltersAndSort = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = categoryFilter.value;
            const sortValue = sortFilter.value;

            let visibleCards = [];
            allProductCards.forEach(card => {
                const name = card.dataset.name.toLowerCase();
                const category = card.dataset.category;

                const matchesSearch = name.includes(searchTerm);
                const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

                if (matchesSearch && matchesCategory) {
                    card.style.display = 'flex';
                    visibleCards.push(card);
                } else {
                    card.style.display = 'none';
                }
            });

            if (sortValue === 'price-asc') {
                visibleCards.sort((a, b) => a.dataset.price - b.dataset.price);
            } else if (sortValue === 'price-desc') {
                visibleCards.sort((a, b) => b.dataset.price - a.dataset.price);
            }

            visibleCards.forEach(card => catalogGrid.appendChild(card));
        };

        searchInput.addEventListener('input', applyFiltersAndSort);
        categoryFilter.addEventListener('change', applyFiltersAndSort);
        sortFilter.addEventListener('change', applyFiltersAndSort);
    }

    // --- УНІВЕРСАЛЬНА ФУНКЦІЯ ДЛЯ СПОВІЩЕНЬ (працює на всіх сторінках) ---
    const addBuyButtonListeners = () => {
        const buyButtons = document.querySelectorAll('.buy-button');
        const notificationContainer = document.getElementById('notification-container');

        if (!notificationContainer) {
            console.warn('❌ Контейнер для сповіщень не знайдено!');
            return;
        }

        // Функція, яка створює та показує сповіщення
        function showNotification(message, autoHideMs = 3000) {
            const notification = document.createElement('div');
            notification.classList.add('notification');
            notification.textContent = message;

            // Кнопка закриття "✖"
            const closeBtn = document.createElement('button');
            closeBtn.classList.add('close-btn');
            closeBtn.innerHTML = "&times;";
            notification.appendChild(closeBtn);

            notificationContainer.appendChild(notification);

            // Функція для плавного закриття
            const close = () => {
                notification.classList.add('fade-out');
                notification.addEventListener('animationend', () => {
                    notification.remove();
                }, { once: true });
            };

            // Закриття по кліку на кнопку
            closeBtn.addEventListener('click', close);

            // Автоматичне закриття через деякий час
            if (autoHideMs) {
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        close();
                    }
                }, autoHideMs);
            }
        }

        buyButtons.forEach(button => {
            // Запобігаємо повторному додаванню обробника
            if (button.dataset.listenerAttached) return;

            button.addEventListener('click', (event) => {
                event.preventDefault();
                showNotification('Товар додано до кошика! ✅');
            });

            button.dataset.listenerAttached = 'true';
        });
    };

    // Запускаємо функцію для всіх кнопок "Купити" на сторінці
    addBuyButtonListeners();
});