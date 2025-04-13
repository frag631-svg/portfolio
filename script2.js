// Загрузка портфолио из localStorage и отображение на главной странице
function loadPortfolios() {
    const portfolios = JSON.parse(localStorage.getItem('portfolios')) || [];
    
    const portfolioContainer = document.getElementById('portfolioContainer');
    portfolioContainer.innerHTML = ''; // Очистим контейнер перед загрузкой новых данных

    portfolios.forEach(portfolio => {
        const portfolioCard = document.createElement('div');
        portfolioCard.classList.add('portfolio-card');

        portfolioCard.innerHTML = `
            <img src="${portfolio.imgSrc}" alt="${portfolio.firstName} ${portfolio.lastName}">
            <!-- Изменение порядка: сначала фамилия, потом имя, потом отчество -->
            <h3>${portfolio.lastName} ${portfolio.firstName} ${portfolio.middleName}</h3>
            <p><strong>Дата и Время:</strong> ${new Date(portfolio.dateTime).toLocaleString()}</p>
            <p><strong>Описание:</strong> ${portfolio.description}</p>
        `;

        // Добавляем карточку в контейнер на главной странице
        portfolioContainer.appendChild(portfolioCard);
    });
}

// Переход на страницу добавления портфолио
document.getElementById('goToPortfolioBtn').addEventListener('click', function() {
    window.location.href = 'index.html';
});

// Функция для добавления портфолио
const portfolioForm = document.getElementById('portfolioForm');
function addPortfolio(e) {
    e.preventDefault();

    // Получаем значения из формы
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const group = document.getElementById('group').value;
    const dateTime = document.getElementById('dateTime').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    if (!lastName || !firstName || !middleName || !dateTime || !description || !image) {
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
            p><strong>Учебная группа:</strong> ${group}</p>
            <p><strong>Дата и Время:</strong> ${new Date(dateTime).toLocaleString()}</p>
            <p><strong>Описание:</strong> ${description}</p>
        `;

        // Сохраняем портфолио в localStorage
        savePortfolioToStorage(lastName, firstName, middleName, dateTime, description, imgSrc);

        // Очистка формы
        portfolioForm.reset();

        // Перенаправляем на главную страницу после добавления
        window.location.href = 'index2.html';
    }

    // Загружаем изображение
    reader.readAsDataURL(image);
}

// Функция для сохранения портфолио в localStorage
function savePortfolioToStorage(lastName, firstName, middleName, dateTime, description, imgSrc) {
    const portfolios = JSON.parse(localStorage.getItem('portfolios')) || [];
    portfolios.push({ lastName, firstName, middleName, dateTime, description, imgSrc });
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

// Загружаем портфолио на главной странице при загрузке
document.addEventListener('DOMContentLoaded', loadPortfolios);

// Слушаем отправку формы на странице добавления портфолио
portfolioForm && portfolioForm.addEventListener('submit', addPortfolio);