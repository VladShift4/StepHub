// Це наша "база даних" товарів.
// Щоб додати новий товар, просто скопіюй об'єкт та зміни дані.
// Щоб товар з'явився у "Нових надходженнях", додай йому властивість isNew: true.

const allProducts = [
    {
        id: 'classic-sneakers',
        name: "Класичні кросівки 'Puma'",
        price: 2500,
        image: 'images/classic-sneakers.jpg',
        isNew: true // Цей товар з'явиться на головній
    },
    {
        id: 'winter-boots',
        name: "Зимові черевики 'Jhordans'",
        price: 4200,
        image: 'images/winter-boots.jpg',
        isNew: true // і цей
    },
    {
        id: 'summer-sandals',
        name: "Літні сандалі 'Adidas'",
        price: 1800,
        image: 'images/summer-sandals.jpg',
        isNew: true // і цей
    },
    {
        id: 'new-balance',
        name: "New Balance 900",
        price: 4299,
        image: 'images/new-balance-1.jpg',
        isNew: true // і цей
    },
    {
        id: 'asics-sneakers',
        name: "Бігові кросівки 'Asics'",
        price: 3100,
        image: '../images/asics-sneakers.jpg', // Заміни на правильне фото
        isNew: true// Цей товар буде тільки в загальному каталозі
    },


];