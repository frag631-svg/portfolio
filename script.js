const portfolioForm = document.getElementById('portfolioForm');
const portfolioContainer = document.getElementById('portfolioContainer');

// Функция для добавления портфолио
function addPortfolio(e) {
    e.preventDefault();

    // Получаем значения из формы
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const middleName = document.getElementById('middleName').value;
    const group = document.getElementById('group').value; // Новое поле для учебной группы
    const dateTime = document.getElementById('dateTime').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    if (!lastName || !firstName || !middleName || !group || !dateTime || !description || !image) { // Добавляем проверку для учебной группы
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Чтение изображения
    const reader = new FileReader();
    reader.onload = function (e) {
        const imgSrc = e.target.result;

        // Создаем новый элемент для портфолио
        const portfolioCard = document.createElement('div');
        portfolioCard.classList.add('portfolio-card');

        portfolioCard.innerHTML = `
            <img src="${imgSrc}" alt="${firstName} ${lastName}">
            <h3>${firstName} ${lastName} ${middleName}</h3>
            <p><strong>Учебная группа:</strong> ${group}</p> <!-- Добавляем вывод учебной группы -->
            <p><strong>Дата и Время:</strong> ${new Date(dateTime).toLocaleString()}</p>
            <p><strong>Описание:</strong> ${description}</p>
            <button class="delete-btn">Удалить</button>
        `;

        // Добавляем обработчик удаления
        portfolioCard.querySelector('.delete-btn').addEventListener('click', () => {
            portfolioContainer.removeChild(portfolioCard);
            removePortfolioFromStorage(lastName, firstName, middleName, dateTime);
        });

        // Добавляем новую карточку в контейнер
        portfolioContainer.appendChild(portfolioCard);
        
        // Сохраняем портфолио в localStorage
        savePortfolioToStorage(lastName, firstName, middleName, group, dateTime, description, imgSrc);

        // Очистка формы
        portfolioForm.reset();
    }

    // Загружаем изображение
    reader.readAsDataURL(image);
}

// Функция для сохранения портфолио в localStorage
function savePortfolioToStorage(lastName, firstName, middleName, group, dateTime, description, imgSrc) {
    const portfolios = JSON.parse(localStorage.getItem('portfolios')) || [];
    portfolios.push({ lastName, firstName, middleName, group, dateTime, description, imgSrc });
    localStorage.setItem('portfolios', JSON.stringify(portfolios));
}

// Функция для удаления портфолио из localStorage
function removePortfolioFromStorage(lastName, firstName, middleName, dateTime) {
    let portfolios = JSON.parse(localStorage.getItem('portfolios')) || [];
    portfolios = portfolios.filter(portfolio => 
        !(portfolio.lastName === lastName && portfolio.firstName === firstName && 
          portfolio.middleName === middleName && portfolio.dateTime === dateTime)
    );
    localStorage.setItem('portfolios', JSON.stringify(portfolios));
}

// Функция для загрузки портфолио из localStorage при загрузке страницы
function loadPortfolios() {
    const portfolios = JSON.parse(localStorage.getItem('portfolios')) || [];
    
    portfolios.forEach(portfolio => {
        const portfolioCard = document.createElement('div');
        portfolioCard.classList.add('portfolio-card');

        portfolioCard.innerHTML = `
            <img src="${portfolio.imgSrc}" alt="${portfolio.firstName} ${portfolio.lastName}">
            <h3>${portfolio.firstName} ${portfolio.lastName} ${portfolio.middleName}</h3>
            <p><strong>Учебная группа:</strong> ${portfolio.group}</p> <!-- Добавляем отображение учебной группы -->
            <p><strong>Дата и Время:</strong> ${new Date(portfolio.dateTime).toLocaleString()}</p>
            <p><strong>Описание:</strong> ${portfolio.description}</p>
            <button class="delete-btn">Удалить</button>
        `;

        // Добавляем обработчик удаления
        portfolioCard.querySelector('.delete-btn').addEventListener('click', () => {
            portfolioContainer.removeChild(portfolioCard);
            removePortfolioFromStorage(portfolio.lastName, portfolio.firstName, portfolio.middleName, portfolio.dateTime);
        });

        // Добавляем новую карточку в контейнер
        portfolioContainer.appendChild(portfolioCard);
    });
}

// Добавление обработчика для кнопки "Назад"
document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'index2.html'; // Здесь 'index2.html' - это главная страница
});

// Слушаем отправку формы
portfolioForm.addEventListener('submit', addPortfolio);

// Загружаем портфолио из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', loadPortfolios);