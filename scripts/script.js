document.addEventListener('DOMContentLoaded', () => {

    // --- БАЗОВИЙ ФУНКЦІОНАЛ (для всіх сторінок) ---

    // Функціонал для кнопок "Купити" та сповіщень
    // Ми його винесемо в окрему функцію, щоб можна було викликати для динамічно створених товарів
    const addBuyButtonListeners = () => {
        const buyButtons = document.querySelectorAll('.buy-button');
        const notificationContainer = document.getElementById('notification-container');

        if (!notificationContainer) return;

        buyButtons.forEach(button => {
            // Перевіряємо, чи вже не додано обробник
            if (button.dataset.listenerAttached) return;

            button.addEventListener('click', (event) => {
                event.preventDefault();
                const notification = document.createElement('div');
                notification.classList.add('notification');
                notification.innerText = 'Товар додано до кошика! ✅';
                notificationContainer.appendChild(notification);

                setTimeout(() => {
                    notification.classList.add('fade-out');
                    notification.addEventListener('animationend', () => {
                        notification.remove();
                    });
                }, 3000);
            });
            // Позначаємо кнопку, щоб уникнути повторного додавання обробника
            button.dataset.listenerAttached = 'true';
        });
    };

    // Запускаємо для кнопок, що вже є на сторінці
    addBuyButtonListeners();


    // --- ЛОГІКА ДЛЯ СТОРІНКИ КАТАЛОГУ (`products.html`) ---

    const productGridContainer = document.getElementById('product-catalog-grid');

    // Цей код виконається ТІЛЬКИ якщо ми на сторінці каталогу
    if (productGridContainer) {

        // 1. НАШІ ТОВАРИ (в реальному проекті це приходить з сервера)
        const allProducts = [
            { id: 1, name: 'Класичні кросівки', price: 2500, image: '../images/classic-shoes.jpg', category: 'sneakers' },
            { id: 2, name: 'Зимові черевики', price: 4200, image: '../images/winter-boots.jpg', category: 'boots' },
            { id: 3, name: 'Літні сандалі', price: 1800, image: '../images/summer-sandals.jpg', category: 'sandals' },
            { id: 4, name: 'Бігові кросівки', price: 3100, image: '../images/classic-shoes.jpg', category: 'sneakers' },
            { id: 5, name: 'Трекінгові черевики', price: 5500, image: '../images/winter-boots.jpg', category: 'boots' },
            { id: 6, name: 'Шкіряні сандалі', price: 2200, image: '../images/summer-sandals.jpg', category: 'sandals' },
            { id: 7, name: 'Лайфстайл кеди', price: 2800, image: '../images/classic-shoes.jpg', category: 'sneakers' },
            { id: 8, name: 'Черевики "Челсі"', price: 4800, image: '../images/winter-boots.jpg', category: 'boots' },
            { id: 9, name: 'Спортивні сандалі', price: 1950, image: '../images/summer-sandals.jpg', category: 'sandals' },
        ];

        // 2. ФУНКЦІЯ для відображення товарів
        const renderProducts = (productsToRender) => {
            productGridContainer.innerHTML = ''; // Очищуємо контейнер

            if (productsToRender.length === 0) {
                productGridContainer.innerHTML = '<p>Товарів не знайдено.</p>';
                return;
            }

            productsToRender.forEach(product => {
                const productCardHTML = `
                    <article class="product-card">
                        <div class="product-image-container">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="price">${product.price} грн</p>
                            <a href="#" class="buy-button">Додати до кошика</a>
                        </div>
                    </article>
                `;
                productGridContainer.innerHTML += productCardHTML;
            });
            // Після того, як додали нові кнопки, знову запускаємо для них обробники подій
            addBuyButtonListeners();
        };

        // 3. ФУНКЦІЯ для застосування всіх фільтрів
        const applyFiltersAndRender = () => {
            let filteredProducts = [...allProducts];

            // Пошук
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm));
            }

            // Фільтр за категорією
            const selectedCategory = document.getElementById('categoryFilter').value;
            if (selectedCategory !== 'all') {
                filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
            }

            // Сортування
            const sortValue = document.getElementById('sortFilter').value;
            if (sortValue === 'price-asc') {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortValue === 'price-desc') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }

            renderProducts(filteredProducts);
        };

        // 4. ДОДАЄМО ОБРОБНИКИ ПОДІЙ для полів вводу
        document.getElementById('searchInput').addEventListener('input', applyFiltersAndRender);
        document.getElementById('categoryFilter').addEventListener('change', applyFiltersAndRender);
        document.getElementById('sortFilter').addEventListener('change', applyFiltersAndRender);

        // Перше завантаження: показуємо всі товари
        renderProducts(allProducts);
    }
});

