// Configuration
const CONFIG = {
    questionTime: 30, // seconds per question
    questionWithCaptchaTime: 45,  // seconds for question with captcha
    passPercentage: 50 // minimum percentage to pass
};

// UI Text translations
const uiText = {
    en: {
        progressLabel: "Question",
        ofLabel: "of",
        timeLabel: "Time:",
        nextBtn: "Next",
        restartBtn: "Restart Quiz",
        congratulations: "🎉 Congratulations!",
        failed: "❌ Failed",
        yourScore: "Your Score:",
        captchaFailed: "Captcha verification failed or timed out.",
        needToPass: "You need at least 50% to pass.",
        timeUp: "Time is up!",
        incorrectCaptcha: "Incorrect captcha! Quiz failed.",
        securityVerification: "Security Verification",
        enterCaptcha: "Please enter the characters shown in the image below:",
        captchaPlaceholder: "Enter captcha"
    },
    ml: {
        progressLabel: "ചോദ്യം",
        ofLabel: "ൽ",
        timeLabel: "സമയം:",
        nextBtn: "അടുത്തത്",
        restartBtn: "വീണ്ടും ആരംഭിക്കുക",
        congratulations: "🎉 അഭിനന്ദനങ്ങൾ!",
        failed: "❌ പരാജയപ്പെട്ടു",
        yourScore: "നിങ്ങളുടെ സ്കോർ:",
        captchaFailed: "ക്യാപ്ച്ച സ്ഥിരീകരണം പരാജയപ്പെട്ടു അല്ലെങ്കിൽ സമയം കഴിഞ്ഞു.",
        needToPass: "പാസാകാൻ കുറഞ്ഞത് 50% ആവശ്യമാണ്.",
        timeUp: "സമയം കഴിഞ്ഞു!",
        incorrectCaptcha: "തെറ്റായ ക്യാപ്ച്ച! ക്വിസ് പരാജയപ്പെട്ടു.",
        securityVerification: "സുരക്ഷാ സ്ഥിരീകരണം",
        enterCaptcha: "ചിത്രത്തിൽ കാണിച്ചിരിക്കുന്ന പ്രതീകങ്ങൾ നൽകുക:",
        captchaPlaceholder: "ക്യാപ്ച്ച നൽകുക"
    }
};

// Quiz data - 9 questions (English and Malayalam)
const quizData = [
    {
        id: 1,
        image: "images/1.png",
        question: {
            en: "The sign represents...",
            ml: "ഈ ചിഹ്നം സൂചിപ്പിക്കുന്നത്..."
        },
        answers: [
            { text: { en: "Road closed", ml: "റോഡ് അടച്ചിരിക്കുന്നു" }, correct: false },
            { text: { en: "No Parking", ml: "പാർക്കിംഗ് പാടില്ല" }, correct: false },
            { text: { en: "Restriction ends sign", ml: "നിയന്ത്രണം അവസാനിക്കുന്നു" }, correct: true },
            { text: { en: "No entry", ml: "പ്രവേശനം പാടില്ല" }, correct: false }
        ]
    },
    {
        id: 2,
        image: "images/2.jpg",
        question: {
            en: "The sign represents...",
            ml: "ഈ ചിഹ്നം സൂചിപ്പിക്കുന്നത്..."
        },
        answers: [
            { text: { en: "Entry through right side prohibited", ml: "വലതുവശത്തുകൂടി പ്രവേശനം പാടില്ല" }, correct: false },
            { text: { en: "Entry through left side prohibited", ml: "ഇടതുവശത്തുകൂടി പ്രവേശനം പാടില്ല" }, correct: false },
            { text: { en: "No entry", ml: "പ്രവേശനം പാടില്ല" }, correct: false },
            { text: { en: "Overtaking prohibited", ml: "ഓവർടേക്കിംഗ് പാടില്ല" }, correct: true }
        ]
    },
    {
        id: 3,
        image: "images/3.png",
        question: {
            en: "The sign represents...",
            ml: "ഈ ചിഹ്നം സൂചിപ്പിക്കുന്നത്..."
        },
        answers: [
            { text: { en: "No entry", ml: "പ്രവേശനം പാടില്ല" }, correct: false },
            { text: { en: "One way sign", ml: "ഒറ്റവഴി" }, correct: true },
            { text: { en: "Vehicles prohibited in both direction", ml: "രണ്ടു ദിശയിലും വാഹനം പാടില്ല" }, correct: false },
            { text: { en: "Overtaking prohibited", ml: "ഓവർടേക്കിംഗ് പാടില്ല" }, correct: false }
        ]
    },
    {
        id: 4,
        image: "images/4.png",
        question: {
            en: "The sign represents...",
            ml: "ഈ ചിഹ്നം സൂചിപ്പിക്കുന്നത്..."
        },
        answers: [
            { text: { en: "No road to the right in front", ml: "മുന്നിൽ വലത്തോട്ട് റോഡില്ല" }, correct: false },
            { text: { en: "Compulsory turn right", ml: "നിർബന്ധമായും വലത്തോട്ട് തിരിയണം" }, correct: true },
            { text: { en: "Turn to the right prohibited", ml: "വലത്തോട്ട് തിരിയാൻ പാടില്ല" }, correct: false },
            { text: { en: "Keep right", ml: "വലത്തു നിർത്തുക" }, correct: false }
        ]
    },
    {
        id: 5,
        image: "images/5.jpg",
        question: {
            en: "The sign represents...",
            ml: "ഈ ചിഹ്നം സൂചിപ്പിക്കുന്നത്..."
        },
        answers: [
            { text: { en: "Compulsory turn right", ml: "നിർബന്ധമായും വലത്തോട്ട് തിരിയണം" }, correct: false },
            { text: { en: "Right hair pin bend", ml: "വലത് ഹെയർപിൻ വളവ്" }, correct: false },
            { text: { en: "Keep right", ml: "വലത്തു നിൽക്കുക" }, correct: false },
            { text: { en: "Right hand curve", ml: "വലത് വളവ്" }, correct: true }
        ]
    },
    {
        id: 6,
        image: "images/6.png",
        question: {
            en: "The sign represents...",
            ml: "ഈ ചിഹ്നം സൂചിപ്പിക്കുന്നത്..."
        },
        answers: [
            { text: { en: "Left hand curve", ml: "ഇടത് വളവ്" }, correct: true },
            { text: { en: "Left ascend", ml: "ഇടത് കയറ്റം" }, correct: false },
            { text: { en: "Keep left", ml: "ഇടത്തു നിൽക്കുക" }, correct: false },
            { text: { en: "Compulsory turn left", ml: "നിർബന്ധമായും ഇടത്തോട്ട് തിരിയണം" }, correct: false }
        ]
    },
    {
        id: 7,
        image: "images/7.jpg",
        question: {
            en: "The sign represents...",
            ml: "ഈ ചിഹ്നം സൂചിപ്പിക്കുന്നത്..."
        },
        answers: [
            { text: { en: "Right hair pin bend", ml: "വലത് ഹെയർപിൻ വളവ്" }, correct: true },
            { text: { en: "Right turn ahead", ml: "മുന്നിൽ വലത്തോട്ട് തിരിവ്" }, correct: false },
            { text: { en: "Right descend", ml: "വലത് ഇറക്കം" }, correct: false },
            { text: { en: "Right U-turn", ml: "വലത് യു-ടേൺ" }, correct: false }
        ]
    },
    {
        id: 8,
        image: "images/8.png",
        question: {
            en: "The sign represents...",
            ml: "ഈ ചിഹ്നം സൂചിപ്പിക്കുന്നത്..."
        },
        answers: [
            { text: { en: "Left descent", ml: "ഇടത് ഇറക്കം" }, correct: false },
            { text: { en: "Left reverse bend", ml: "ഇടത് റിവേഴ്സ് വളവ്" }, correct: true },
            { text: { en: "Left hair pin bend", ml: "ഇടത് ഹെയർപിൻ വളവ്" }, correct: false },
            { text: { en: "Left U-turn bend", ml: "ഇടത് യു-ടേൺ വളവ്" }, correct: false }
        ]
    },
    {
        id: 9,
        image: "images/9.png",
        question: {
            en: "The sign represents...",
            ml: "ഈ ചിഹ്നം സൂചിപ്പിക്കുന്നത്..."
        },
        answers: [
            { text: { en: "Steep ascent", ml: "കുത്തനെയുള്ള കയറ്റം" }, correct: false },
            { text: { en: "Steep descent", ml: "കുത്തനെയുള്ള ഇറക്കം" }, correct: false },
            { text: { en: "Falling rocks", ml: "പാറ വീഴാനുള്ള സാധ്യത" }, correct: true },
            { text: { en: "Towing vehicle", ml: "ടോയിംഗ് വാഹനം" }, correct: false }
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
let captchaQuestions = []; // Will hold indices of questions that need captcha
let currentCaptchaInput = null; // Stores the captcha input for current question
let selectedLanguage = 'en'; // Default language

// Select language and start quiz
function selectLanguage(lang) {
    selectedLanguage = lang;
    document.getElementById('languageSelection').classList.add('hidden');
    document.getElementById('quizContent').classList.remove('hidden');

    // Update UI text based on language
    updateUIText();

    initQuiz();
}

// Update UI text based on selected language
function updateUIText() {
    const text = uiText[selectedLanguage];
    document.getElementById('progressLabel').textContent = text.progressLabel;
    document.getElementById('ofLabel').textContent = text.ofLabel;
    document.getElementById('timeLabel').textContent = text.timeLabel;
    document.getElementById('nextBtn').textContent = text.nextBtn;
}

// Initialize quiz
function initQuiz() {
    // Randomly select 3 questions (out of 9) to show captcha
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    captchaQuestions = [];
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        captchaQuestions.push(indices[randomIndex]);
        indices.splice(randomIndex, 1);
    }
    console.log('Captcha will appear on questions:', captchaQuestions.map(i => i + 1));

    loadQuestion();
    startTimer();
}

// Load question
function loadQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    const question = quizData[currentQuestionIndex];
    const hasCaptcha = captchaQuestions.includes(currentQuestionIndex);
    const text = uiText[selectedLanguage];

    let html = `
        <img src="${question.image}" alt="Question Image" class="question-image">
        <div class="question-text">${question.question[selectedLanguage]}</div>
        <div class="answers">
    `;

    question.answers.forEach((answer, index) => {
        html += `
            <button class="answer-btn" onclick="selectAnswer(${index})">
                ${String.fromCharCode(65 + index)}. ${answer.text[selectedLanguage]}
            </button>
        `;
    });

    html += '</div>';

    // Add captcha if this question requires it
    if (hasCaptcha) {
        loadCaptchaForQuestion();
        html += `
            <div class="captcha-container" style="margin-top: 20px;">
                <h3>${text.securityVerification}</h3>
                <p>${text.enterCaptcha}</p>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img id="captchaImage" src="${currentCaptcha.image}" alt="Captcha" class="captcha-image">
                    <button onclick="refreshCaptcha()" class="refresh-btn" style="padding: 10px; cursor: pointer; background: #667eea; color: white; border: none; border-radius: 5px;">🔄</button>
                </div>
                <input type="text" id="captchaInput" class="captcha-input"
                       placeholder="${text.captchaPlaceholder}" maxlength="6"
                       oninput="checkCaptchaInput()">
            </div>
        `;
        // Set longer time for questions with captcha
        timeLeft = CONFIG.questionWithCaptchaTime;
    } else {
        currentCaptcha = null;
        timeLeft = CONFIG.questionTime;
    }

    questionContainer.innerHTML = html;

    selectedAnswer = null;
    currentCaptchaInput = null;
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
}

// Load captcha for question
function loadCaptchaForQuestion() {
    currentCaptcha = captchaData[Math.floor(Math.random() * captchaData.length)];
}

// Refresh captcha
function refreshCaptcha() {
    loadCaptchaForQuestion();
    const captchaImage = document.getElementById('captchaImage');
    if (captchaImage) {
        captchaImage.src = currentCaptcha.image;
    }
    // Clear captcha input
    const captchaInput = document.getElementById('captchaInput');
    if (captchaInput) {
        captchaInput.value = '';
        checkCaptchaInput();
    }
}

// Select answer
function selectAnswer(index) {
    // Remove previous selection
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Add selection to clicked button
    buttons[index].classList.add('selected');

    selectedAnswer = index;

    // Check if we need to wait for captcha input
    const captchaInput = document.getElementById('captchaInput');
    if (captchaInput) {
        // If captcha exists, enable next only if both answer and captcha are filled
        if (captchaInput.value.length === 6) {
            document.getElementById('nextBtn').disabled = false;
        }
    } else {
        // No captcha, just enable next button
        document.getElementById('nextBtn').disabled = false;
    }
}

// Check captcha input
function checkCaptchaInput() {
    const input = document.getElementById('captchaInput');
    // Enable next button only if both answer is selected AND captcha is filled
    if (input.value.length === 6 && selectedAnswer !== null) {
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
    const text = uiText[selectedLanguage];
    alert(text.timeUp);

    // If current question has captcha and it's not filled, quiz fails
    if (document.getElementById('captchaInput') && currentCaptcha) {
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

    const text = uiText[selectedLanguage];

    // Check if current question has captcha
    const captchaInput = document.getElementById('captchaInput');
    if (captchaInput && currentCaptcha) {
        const input = captchaInput.value;
        console.log('Captcha Input:', input);
        console.log('Captcha Answer:', currentCaptcha.answer);
        if (input !== currentCaptcha.answer) {
            captchaFailed = true;
            alert(text.incorrectCaptcha);
            showResults();
            return;
        }
    }

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

    // Check if quiz is complete
    if (currentQuestionIndex >= quizData.length) {
        showResults();
        return;
    }

    // Load next question
    document.getElementById('timer').textContent = timeLeft;
    loadQuestion();
    startTimer();
}

// Show results
function showResults() {
    clearInterval(timerInterval);

    const text = uiText[selectedLanguage];
    const quizContent = document.getElementById('quizContent');
    const resultContainer = document.getElementById('resultContainer');

    quizContent.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const percentage = (score / quizData.length) * 100;
    const passed = percentage >= CONFIG.passPercentage && !captchaFailed;

    resultContainer.className = 'result-container ' + (passed ? 'pass' : 'fail');

    let resultHTML = `
        <h2>${passed ? text.congratulations : text.failed}</h2>
        <div class="score">
            ${text.yourScore} ${score} / ${quizData.length} (${percentage.toFixed(1)}%)
        </div>
    `;

    if (captchaFailed) {
        resultHTML += `<p style="color: #ff6b6b; font-size: 1.2em;">${text.captchaFailed}</p>`;
    } else if (!passed) {
        resultHTML += `<p style="font-size: 1.2em;">${text.needToPass}</p>`;
    }

    resultHTML += `<button class="restart-btn" onclick="restartQuiz()">${text.restartBtn}</button>`;

    resultContainer.innerHTML = resultHTML;
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    userAnswers = [];
    captchaFailed = false;
    currentCaptcha = null;
    captchaQuestions = [];
    timeLeft = CONFIG.questionTime;

    document.getElementById('quizContent').classList.add('hidden');
    document.getElementById('resultContainer').classList.add('hidden');
    document.getElementById('languageSelection').classList.remove('hidden');
}
