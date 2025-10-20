// --- 1. Данные для IT-Викторины ---
const quizData = [
    {
        question: "Язык разметки, который создает структуру и контент веб-страницы.",
        options: ["CSS", "JavaScript", "HTML", "Python"],
        answer: "HTML"
    },
    {
        question: "Каскадные таблицы стилей. Отвечают за внешний вид, цвета и расположение элементов сайта.",
        options: ["Sass", "C#", "CSS", "SQL"],
        answer: "CSS"
    },
    {
        question: "Язык, который делает сайт интерактивным, обрабатывает события и отвечает за логику на стороне клиента (браузера).",
        options: ["Java", "PHP", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        question: "Программный интерфейс, который позволяет двум приложениям взаимодействовать друг с другом.",
        options: ["GUI", "API", "SDK", "IDE"],
        answer: "API"
    },
    {
        question: "Система контроля версий, используемая для отслеживания изменений в коде и совместной работы (например, с платформой GitHub).",
        options: ["Jenkins", "Docker", "Git", "Jira"],
        answer: "Git"
    },
    {
        question: "Концепция в программировании, позволяющая упаковать данные и методы для работы с ними в единый объект.",
        options: ["Функциональное программирование", "Объектно-ориентированное программирование (ООП)", "Асинхронность", "Компиляция"],
        answer: "Объектно-ориентированное программирование (ООП)"
    },
    {
        question: "Набор правил и стандартов, определяющий, как должны быть расположены данные в сети (например, HTTP).",
        options: ["Протокол", "Паттерн", "Алгоритм", "Фреймворк"],
        answer: "Протокол"
    },
    {
        question: "Виртуальная среда, которая изолирует приложение и все его зависимости, обеспечивая его единообразную работу в любом месте.",
        options: ["Облако", "Контейнер (Docker)", "Виртуальная машина", "Скрипт"],
        answer: "Контейнер (Docker)"
    },
    {
        question: "Процесс обнаружения и исправления ошибок (багов) в программном коде.",
        options: ["Тестирование", "Деплоймент", "Отладка (Дебаггинг)", "Компиляция"],
        answer: "Отладка (Дебаггинг)"
    },
    {
        question: "Структура данных, которая хранит упорядоченную коллекцию элементов, к которым можно обращаться по числовому индексу.",
        options: ["Объект", "Массив", "Переменная", "Класс"],
        answer: "Массив"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let isGameOver = true;

// Получаем элементы DOM для викторины
const questionEl = document.getElementById('quiz-question');
const optionsEl = document.getElementById('quiz-options');
const startBtn = document.getElementById('start-game-btn');
const feedbackEl = document.getElementById('quiz-feedback');
const scoreEl = document.getElementById('quiz-score');


// --- 2. Логика Викторины ---

function displayQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        endGame();
        return;
    }

    const currentQuiz = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = '';
    feedbackEl.textContent = ''; // Очищаем обратную связь

    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => checkAnswer(option, currentQuiz.answer, button));
        optionsEl.appendChild(button);
    });
}

function checkAnswer(selectedOption, correctAnswer, button) {
    if (isGameOver) return;
    
    // Отключаем все кнопки после ответа, чтобы избежать двойного клика
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer) {
        score++;
        button.classList.add('correct');
        feedbackEl.textContent = "✅ Верно! Отличная работа.";
    } else {
        button.classList.add('wrong');
        // Подсвечиваем правильный ответ
        document.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
        feedbackEl.textContent = `❌ Ошибка. Правильный ответ: ${correctAnswer}.`;
    }

    scoreEl.textContent = `Счет: ${score}`;
    
    // Переход к следующему вопросу через 2 секунды
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 2000);
}

function startGame() {
    isGameOver = false;
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.textContent = `Счет: 0`;
    feedbackEl.textContent = '';
    startBtn.style.display = 'none'; // Скрываем кнопку "Начать игру"
    
    displayQuestion();
}

function endGame() {
    isGameOver = true;
    questionEl.textContent = `Викторина завершена! Ваш итоговый счет: ${score} из ${quizData.length}.`;
    optionsEl.innerHTML = '';
    feedbackEl.textContent = "Нажмите 'Начать игру', чтобы попробовать снова.";
    startBtn.textContent = 'Начать игру снова';
    startBtn.style.display = 'block'; // Показываем кнопку для повторного запуска
}

// Добавляем обработчик для кнопки "Начать игру"
startBtn.addEventListener('click', startGame);


// --- 3. Профессиональные эффекты и общий код ---

document.addEventListener('DOMContentLoaded', () => {
    // 3.1. Плавный скролл для навигации
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3.2. Эффект появления при скролле (Fade-in animation)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 
    });

    // Применяем эффект к ключевым секциям
    document.querySelectorAll('.course-card, .advantage-item, .review-card').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Добавляем CSS для эффекта fade-in (динамически)
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
   