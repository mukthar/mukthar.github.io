// Configuration
const CONFIG = {
    questionTime: 60, // seconds per question
    captchaTime: 60,  // seconds per captcha
    passPercentage: 50 // minimum percentage to pass
};

// Quiz data - 9 questions
const quizData = [
    {
        id: 1,
        image: "images/1.png",
        question: "The sign represents...",
        answers: [
            { text: "Road closed", correct: false },
            { text: "No Parking", correct: false },
            { text: "Restriction ends sign", correct: true },
            { text: "No entry", correct: false }
        ]
    },
    {
        id: 2,
        image: "images/2.jpg",
        question: "The sign represents...",
        answers: [
            { text: "Entry through right side prohibited", correct: false },
            { text: "Entry through left side prohibited", correct: false },
            { text: "No entry", correct: false },
            { text: "OVertaking prohibited", correct: true }
        ]
    },
    {
        id: 3,
        image: "images/3.png",
        question: "The sign represents...",
        answers: [
            { text: "No entry", correct: false },
            { text: "One way sign", correct: true },
            { text: "Vehicles prohibitted in both direction", correct: false },
            { text: "Overtaking prohibited", correct: false }
        ]
    },
    {
        id: 4,
        image: "images/4.png",
        question: "The sign represents...",
        answers: [
            { text: "No road to the right in front", correct: false },
            { text: "Compulsory turn right", correct: true },
            { text: "Turn to the right prohibited", correct: false },
            { text: "Keep right", correct: false }
        ]
    },
    {
        id: 5,
        image: "images/5.jpg",
        question: "The sign represents...",
        answers: [
            { text: "Compulsory turn right", correct: false },
            { text: "Right hair ping bend", correct: false },
            { text: "Keep right", correct: false },
            { text: "Right hand curve", correct: true }
        ]
    },
    {
        id: 6,
        image: "images/6.png",
        question: "The sign represents...",
        answers: [
            { text: "Left hand curve", correct: true },
            { text: "Left ascend", correct: false },
            { text: "Keep left", correct: false },
            { text: "Compulsory turn left", correct: false }
        ]
    },
    {
        id: 7,
        image: "images/7.jpg",
        question: "The sign represents...",
        answers: [
            { text: "Right hair pin bend", correct: true },
            { text: "Right turn ahead", correct: false },
            { text: "Right descend", correct: false },
            { text: "Right U-turn", correct: false }
        ]
    },
    {
        id: 8,
        image: "images/8.png",
        question: "The sign represents...",
        answers: [
            { text: "Left descent", correct: false },
            { text: "Left reverse bend", correct: true },
            { text: "Left hair pin bend", correct: false },
            { text: "Left U-turn bend", correct: false }
        ]
    },
    {
        id: 9,
        image: "images/9.png",
        question: "The sign represents...",
        answers: [
            { text: "Steep ascent", correct: false },
            { text: "Steep descent", correct: false },
            { text: "Falling rocks", correct: true },
            { text: "Towing vehicle", correct: false }
        ]
    }
];

// Captcha data - static images with answers
const captchaData = [
    {
        image: "captcha/VkcXBr.jpg",
        answer: "VkcXBr"
    },
    {
        image: "captcha/br8wrT.jpg",
        answer: "br8wrT"
    },
    {
        image: "captcha/9avAJC.jpg",
        answer: "9avAJC"
    },
    {
        image: "captcha/mufVNe.jpg",
        answer: "mufVNe"
    },
    {
        image: "captcha/T2ci97.jpg",
        answer: "T2ci97"
    },
    {
        image: "captcha/DHTBXn.jpg",
        answer: "DHTBXn"
    }
];

// State variables
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let timerInterval = null;
let timeLeft = CONFIG.questionTime;
let userAnswers = [];
let captchaFailed = false;
let currentCaptcha = null;

// Initialize quiz
function initQuiz() {
    loadQuestion();
    startTimer();
}

// Load question
function loadQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    const question = quizData[currentQuestionIndex];

    let html = `
        <img src="${question.image}" alt="Question Image" class="question-image">
        <div class="question-text">${question.question}</div>
        <div class="answers">
    `;

    question.answers.forEach((answer, index) => {
        html += `
            <button class="answer-btn" onclick="selectAnswer(${index})">
                ${String.fromCharCode(65 + index)}. ${answer.text}
            </button>
        `;
    });

    html += '</div>';
    questionContainer.innerHTML = html;

    selectedAnswer = null;
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
}

// Load captcha
function loadCaptcha() {
    const questionContainer = document.getElementById('questionContainer');

    // Select random captcha
    currentCaptcha = captchaData[Math.floor(Math.random() * captchaData.length)];

    const html = `
        <div class="captcha-container">
            <h2>Security Verification</h2>
            <p>Please enter the characters shown in the image below:</p>
            <img src="${currentCaptcha.image}" alt="Captcha" class="captcha-image">
            <input type="text" id="captchaInput" class="captcha-input"
                   placeholder="Enter captcha" maxlength="6"
                   oninput="checkCaptchaInput()">
        </div>
    `;

    questionContainer.innerHTML = html;
    document.getElementById('nextBtn').disabled = true;

    // Reset timer for captcha
    clearInterval(timerInterval);
    timeLeft = CONFIG.captchaTime;
    document.getElementById('timer').textContent = timeLeft;
    startTimer();
}

// Select answer
function selectAnswer(index) {
    // Remove previous selection
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Add selection to clicked button
    buttons[index].classList.add('selected');

    selectedAnswer = index;
    document.getElementById('nextBtn').disabled = false;
}

// Check captcha input
function checkCaptchaInput() {
    const input = document.getElementById('captchaInput');
    if (input.value.length === 6) {
        document.getElementById('nextBtn').disabled = false;
    } else {
        document.getElementById('nextBtn').disabled = true;
    }
}

// Start timer
function startTimer() {
    const timerElement = document.getElementById('timer');

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 10) {
            timerElement.parentElement.classList.add('warning');
        } else {
            timerElement.parentElement.classList.remove('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

// Handle timeout
function handleTimeout() {
    alert('Time is up!');

    // Check if we're on a captcha
    if ((currentQuestionIndex + 1) % 3 === 0 && currentQuestionIndex < 9 &&
        document.getElementById('captchaInput')) {
        captchaFailed = true;
        showResults();
    } else {
        // Move to next question without recording answer
        nextQuestion();
    }
}

// Next question
function nextQuestion() {
    clearInterval(timerInterval);

    // Check if this is a captcha
    if (document.getElementById('captchaInput')) {
        const input = document.getElementById('captchaInput').value;
        console.log('Captcha Input:', input);
        console.log('Captcha Answer:', currentCaptcha.answer);
        if (input !== currentCaptcha.answer) {
            captchaFailed = true;
            alert('Incorrect captcha! Quiz failed.');
            showResults();
            return;
        }
        // Captcha passed, continue to next question or end
    } else {
        // Record answer for question
        if (selectedAnswer !== null) {
            const question = quizData[currentQuestionIndex];
            if (question.answers[selectedAnswer].correct) {
                score++;
            }
            userAnswers.push({
                question: currentQuestionIndex,
                selected: selectedAnswer,
                correct: question.answers[selectedAnswer].correct
            });
        }

        currentQuestionIndex++;

        // Check if we need to show captcha (after questions 3, 6, and 9)
        if (currentQuestionIndex === 3 || currentQuestionIndex === 6 || currentQuestionIndex === 9) {
            loadCaptcha();
            return;
        }
    }

    // Check if quiz is complete (after last captcha)
    if (currentQuestionIndex >= quizData.length) {
        showResults();
        return;
    }

    // Load next question
    timeLeft = CONFIG.questionTime;
    document.getElementById('timer').textContent = timeLeft;
    loadQuestion();
    startTimer();
}

// Show results
function showResults() {
    clearInterval(timerInterval);

    const quizContent = document.getElementById('quizContent');
    const resultContainer = document.getElementById('resultContainer');

    quizContent.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const percentage = (score / quizData.length) * 100;
    const passed = percentage >= CONFIG.passPercentage && !captchaFailed;

    resultContainer.className = 'result-container ' + (passed ? 'pass' : 'fail');

    let resultHTML = `
        <h2>${passed ? '🎉 Congratulations!' : '❌ Failed'}</h2>
        <div class="score">
            Your Score: ${score} / ${quizData.length} (${percentage.toFixed(1)}%)
        </div>
    `;

    if (captchaFailed) {
        resultHTML += '<p style="color: #ff6b6b; font-size: 1.2em;">Captcha verification failed or timed out.</p>';
    } else if (!passed) {
        resultHTML += '<p style="font-size: 1.2em;">You need at least 50% to pass.</p>';
    }

    resultHTML += '<button class="restart-btn" onclick="restartQuiz()">Restart Quiz</button>';

    resultContainer.innerHTML = resultHTML;
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    userAnswers = [];
    captchaFailed = false;
    timeLeft = CONFIG.questionTime;

    document.getElementById('quizContent').classList.remove('hidden');
    document.getElementById('resultContainer').classList.add('hidden');

    initQuiz();
}

// Start quiz on page load
window.onload = initQuiz;
