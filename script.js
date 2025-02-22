const options = [];
let rotation = 0;

const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const resultElement = document.getElementById('result');
const optionInput = document.getElementById('optionInput');
const addButton = document.getElementById('addButton');
const spinButton = document.getElementById('spinButton');
const removeButton = document.getElementById('removeButton');
const clearButton = document.getElementById('clearButton');
const presetButtons = document.querySelectorAll('.preset-button');

// Список цветов для секций колеса
const colors = ['#FF6B6B', '#4ECDC4', '#FFEEAD', '#FFCC29', '#96CEB4', '#D4A5A5', '#A8D8EA', '#F8B195'];

function drawWheel() {
    const total = options.length;
    const arc = (2 * Math.PI) / total;
    ctx.clearRect(0, 0, wheel.width, wheel.height);

    options.forEach((option, index) => {
        ctx.beginPath();
        ctx.arc(150, 150, 150, index * arc, (index + 1) * arc);
        ctx.lineTo(150, 150);
        ctx.fillStyle = colors[index % colors.length]; // Используем цвета из списка
        ctx.fill();
        ctx.stroke();

        // Добавляем текст
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(index * arc + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = '14px Arial'; // Увеличиваем чёткость текста
        ctx.fillText(option, 140, 10);
        ctx.restore();
    });
}

addButton.addEventListener('click', () => {
    if (optionInput.value.trim() !== '' && options.length < 55) {
        options.push(optionInput.value.trim());
        optionInput.value = '';
        drawWheel();
    }
});

spinButton.addEventListener('click', () => {
    if (options.length > 0) {
        const randomRotation = Math.floor(Math.random() * 360) + 360 * 5;
        rotation += randomRotation;
        wheel.style.transform = `rotate(${rotation}deg)`;

        setTimeout(() => {
            const degreesPerOption = 360 / options.length;
            const winningIndex = Math.floor((rotation % 360) / degreesPerOption);
            resultElement.textContent = options[winningIndex];
        }, 3000);
    }
});

removeButton.addEventListener('click', () => {
    const currentResult = resultElement.textContent;
    const index = options.indexOf(currentResult);
    if (index !== -1) {
        options.splice(index, 1);
        drawWheel();
        resultElement.textContent = '...';
    }
});

clearButton.addEventListener('click', () => {
    options.length = 0; // Очищаем массив вариантов
    drawWheel(); // Перерисовываем колесо
    resultElement.textContent = '...'; // Сбрасываем результат
});

// Обработка пресетов
presetButtons.forEach(button => {
    button.addEventListener('click', () => {
        options.length = 0; // Очищаем старые варианты
        const preset = button.getAttribute('data-preset');
        switch (preset) {
            case 'Да/Нет':
                options.push('Да', 'Нет');
                break;
            case 'От 1 до 10':
                for (let i = 1; i <= 10; i++) options.push(i.toString());
                break;
            case 'Алфавит':
                for (let i = 0; i < 26; i++) options.push(String.fromCharCode(65 + i));
                break;
            case 'Цвета':
                options.push('Красный', 'Синий', 'Зелёный', 'Жёлтый', 'Оранжевый', 'Фиолетовый');
                break;
            case 'Знаки зодиака':
                options.push('Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион', 'Стрелец', 'Козерог', 'Водолей', 'Рыбы');
                break;
            case 'Кухни мира':
                options.push('Итальянская', 'Мексиканская', 'Японская', 'Китайская', 'Французская', 'Индийская');
                break;
            case 'Жанры кино':
                options.push('Комедия', 'Драма', 'Боевик', 'Фантастика', 'Ужасы', 'Мультфильм');
                break;
            case 'Фрукты':
                options.push('Яблоко', 'Банан', 'Апельсин', 'Киви', 'Манго', 'Ананас');
                break;
            case 'Спорт':
                options.push('Футбол', 'Баскетбол', 'Теннис', 'Волейбол', 'Плавание', 'Бег');
                break;
            case 'Страны':
                options.push('Россия', 'США', 'Китай', 'Япония', 'Франция', 'Германия');
                break;
            case 'Животные':
                options.push('Собака', 'Кошка', 'Лев', 'Тигр', 'Медведь', 'Волк');
                break;
            case 'Музыка':
                options.push('Рок', 'Поп', 'Джаз', 'Классика', 'Хип-хоп', 'Электроника');
                break;
            case 'Возраст': 
               options.push('1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91+'); 
               break;
        }
        drawWheel();
    });
});