// Game state
let currentGame = null;
let currentRound = 0;
let correctAnswers = 0;
let lastValue = null;

// Arabic letters from أ to ي with emojis
const arabicLetters = [
    { letter: 'أ', words: [{text: 'أسد', emoji: '🦁'}, {text: 'أرنب', emoji: '🐰'}, {text: 'أنف', emoji: '👃'}] },
    { letter: 'ب', words: [{text: 'بطة', emoji: '🦆'}, {text: 'بيت', emoji: '🏠'}, {text: 'باب', emoji: '🚪'}] },
    { letter: 'ت', words: [{text: 'تفاح', emoji: '🍎'}, {text: 'تمر', emoji: '🌴'}, {text: 'تاج', emoji: '👑'}] },
    { letter: 'ث', words: [{text: 'ثعلب', emoji: '🦊'}, {text: 'ثوب', emoji: '👗'}, {text: 'ثلج', emoji: '❄️'}] },
    { letter: 'ج', words: [{text: 'جمل', emoji: '🐫'}, {text: 'جبل', emoji: '⛰️'}, {text: 'جزر', emoji: '🥕'}] },
    { letter: 'ح', words: [{text: 'حصان', emoji: '🐴'}, {text: 'حوت', emoji: '🐋'}, {text: 'حليب', emoji: '🥛'}] },
    { letter: 'خ', words: [{text: 'خروف', emoji: '🐑'}, {text: 'خبز', emoji: '🍞'}, {text: 'خيار', emoji: '🥒'}] },
    { letter: 'د', words: [{text: 'دجاجة', emoji: '🐔'}, {text: 'دب', emoji: '🐻'}, {text: 'درج', emoji: '🪜'}] },
    { letter: 'ذ', words: [{text: 'ذئب', emoji: '🐺'}, {text: 'ذرة', emoji: '🌽'}, {text: 'ذهب', emoji: '✨'}] },
    { letter: 'ر', words: [{text: 'رمان', emoji: '🍒'}, {text: 'رز', emoji: '🍚'}, {text: 'ريش', emoji: '🪶'}] },
    { letter: 'ز', words: [{text: 'زرافة', emoji: '🦒'}, {text: 'زيت', emoji: '🫒'}, {text: 'زهرة', emoji: '🌸'}] },
    { letter: 'س', words: [{text: 'سمك', emoji: '🐟'}, {text: 'سيارة', emoji: '🚗'}, {text: 'سكر', emoji: '🍬'}] },
    { letter: 'ش', words: [{text: 'شمس', emoji: '☀️'}, {text: 'شجرة', emoji: '🌳'}, {text: 'شباك', emoji: '🪟'}] },
    { letter: 'ص', words: [{text: 'صقر', emoji: '🦅'}, {text: 'صابون', emoji: '🧼'}, {text: 'صخرة', emoji: '🪨'}] },
    { letter: 'ض', words: [{text: 'ضفدع', emoji: '🐸'}, {text: 'ضوء', emoji: '💡'}, {text: 'ضرس', emoji: '🦷'}] },
    { letter: 'ط', words: [{text: 'طائر', emoji: '🐦'}, {text: 'طاولة', emoji: '🪑'}, {text: 'طماطم', emoji: '🍅'}] },
    { letter: 'ظ', words: [{text: 'ظرف', emoji: '✉️'}, {text: 'ظل', emoji: '🌑'}, {text: 'ظفر', emoji: '💅'}] },
    { letter: 'ع', words: [{text: 'عصفور', emoji: '🐦'}, {text: 'عنب', emoji: '🍇'}, {text: 'عين', emoji: '👁️'}] },
    { letter: 'غ', words: [{text: 'غراب', emoji: '🐦‍⬛'}, {text: 'غزال', emoji: '🦌'}, {text: 'غيمة', emoji: '☁️'}] },
    { letter: 'ف', words: [{text: 'فراشة', emoji: '🦋'}, {text: 'فيل', emoji: '🐘'}, {text: 'فم', emoji: '👄'}] },
    { letter: 'ق', words: [{text: 'قطة', emoji: '🐱'}, {text: 'قمر', emoji: '🌙'}, {text: 'قلب', emoji: '❤️'}] },
    { letter: 'ك', words: [{text: 'كلب', emoji: '🐕'}, {text: 'كتاب', emoji: '📖'}, {text: 'كرة', emoji: '⚽'}] },
    { letter: 'ل', words: [{text: 'ليمون', emoji: '🍋'}, {text: 'لبن', emoji: '🥛'}, {text: 'ليل', emoji: '🌙'}] },
    { letter: 'م', words: [{text: 'موز', emoji: '🍌'}, {text: 'ماء', emoji: '💧'}, {text: 'مفتاح', emoji: '🔑'}] },
    { letter: 'ن', words: [{text: 'نمر', emoji: '🐯'}, {text: 'نجمة', emoji: '⭐'}, {text: 'نار', emoji: '🔥'}] },
    { letter: 'ه', words: [{text: 'هدية', emoji: '🎁'}, {text: 'هلال', emoji: '🌙'}, {text: 'هرة', emoji: '🐱'}] },
    { letter: 'و', words: [{text: 'وردة', emoji: '🌹'}, {text: 'وحش', emoji: '👹'}, {text: 'وجه', emoji: '😊'}] },
    { letter: 'ي', words: [{text: 'يد', emoji: '🖐️'}, {text: 'يمامة', emoji: '🕊️'}, {text: 'يخت', emoji: '⛵'}] }
];

// Utility functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomExcluding(min, max, exclude) {
    let num;
    do {
        num = getRandomInt(min, max);
    } while (num === exclude);
    return num;
}

function getRandomLetter(exclude) {
    let letter;
    do {
        letter = arabicLetters[getRandomInt(0, arabicLetters.length - 1)];
    } while (exclude && letter.letter === exclude.letter);
    return letter;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function goHome() {
    showScreen('home-screen');
    currentGame = null;
    currentRound = 0;
    correctAnswers = 0;
    lastValue = null;
}

function updateProgressBar(progressId, current, total) {
    const percentage = (current / total) * 100;
    document.getElementById(progressId).style.width = percentage + '%';
}

// Game initialization
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const game = card.dataset.game;
            startGame(game);
        });
    });
});

function startGame(game) {
    currentGame = game;
    currentRound = 0;
    correctAnswers = 0;
    lastValue = null;

    switch(game) {
        case 'numbers-memory':
            showScreen('numbers-memory-screen');
            nextNumbersMemory();
            break;
        case 'before-after':
            showScreen('before-after-screen');
            nextBeforeAfter();
            break;
        case 'letters-memory':
            showScreen('letters-memory-screen');
            nextLettersMemory();
            break;
    }
}

// Numbers Memory Game
function nextNumbersMemory() {
    if (currentRound >= 50) {
        showCompletion();
        return;
    }

    currentRound++;
    document.getElementById('nm-round').textContent = currentRound;
    updateProgressBar('nm-progress', currentRound, 50);

    const number = getRandomExcluding(0, 10, lastValue);
    lastValue = number;

    document.getElementById('nm-number').textContent = number;
}

function answerNumbersMemory(isCorrect) {
    if (isCorrect) {
        correctAnswers++;
    }
    nextNumbersMemory();
}

// Before and After Game
let currentQuestion = null;

function nextBeforeAfter() {
    if (currentRound >= 50) {
        showCompletion();
        return;
    }

    currentRound++;
    document.getElementById('ba-round').textContent = currentRound;
    updateProgressBar('ba-progress', currentRound, 50);

    // Generate new question different from last one
    let newQuestion;
    do {
        const isBefore = Math.random() > 0.5;
        // If before: number must be 1-10 (answer 0-9)
        // If after: number must be 0-9 (answer 1-10)
        const num = isBefore ? getRandomInt(1, 10) : getRandomInt(0, 9);
        newQuestion = { num, isBefore };
    } while (currentQuestion &&
             currentQuestion.num === newQuestion.num &&
             currentQuestion.isBefore === newQuestion.isBefore);

    currentQuestion = newQuestion;

    // Display question (left-to-right order in HTML, but displays RTL)
    const questionEl = document.getElementById('ba-question');
    if (currentQuestion.isBefore) {
        // Blank before number in LTR = [_, 3] answer: 2
        questionEl.innerHTML = '<div>' + currentQuestion.num + '</div><div class="blank"></div>';
    } else {
        // Number before blank in LTR = [6, _] answer: 7
        questionEl.innerHTML = '<div class="blank"></div><div>' + currentQuestion.num + '</div>';
    }

    // Generate options - ensure all are within 0-10 range
    const correctAnswer = currentQuestion.isBefore ? currentQuestion.num - 1 : currentQuestion.num + 1;

    // Only add correct answer if it's within valid range (0-10)
    const options = new Set();
    if (correctAnswer >= 0 && correctAnswer <= 10) {
        options.add(correctAnswer);
    }

    // Add 3 random wrong answers within 0-10 range
    while (options.size < 4) {
        const option = getRandomInt(0, 10);
        if (option !== currentQuestion.num && (correctAnswer < 0 || correctAnswer > 10 || option !== correctAnswer)) {
            options.add(option);
        }
    }

    // Shuffle and display options
    const optionsArray = Array.from(options).sort(() => Math.random() - 0.5);
    const optionsEl = document.getElementById('ba-options');
    optionsEl.innerHTML = '';

    optionsArray.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => selectBeforeAfterOption(option, correctAnswer, btn);
        optionsEl.appendChild(btn);
    });
}

function selectBeforeAfterOption(selected, correct, btn) {
    const isCorrect = selected === correct;

    if (isCorrect) {
        correctAnswers++;
        btn.classList.add('correct');
    } else {
        btn.classList.add('wrong');
        // Highlight correct answer
        document.querySelectorAll('.option-btn').forEach(b => {
            if (parseInt(b.textContent) === correct) {
                b.classList.add('correct');
            }
        });
    }

    // Disable all buttons
    document.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
    });

    // Next question after delay
    setTimeout(() => {
        nextBeforeAfter();
    }, 1000);
}

// Letters Memory Game
let currentLetter = null;

function nextLettersMemory() {
    if (currentRound >= 50) {
        showCompletion();
        return;
    }

    currentRound++;
    document.getElementById('lm-round').textContent = currentRound;
    updateProgressBar('lm-progress', currentRound, 50);

    currentLetter = getRandomLetter(lastValue);
    lastValue = currentLetter;

    document.getElementById('lm-letter').textContent = currentLetter.letter;
    document.getElementById('lm-word').textContent = '';
}

function answerLettersMemory(isCorrect) {
    if (isCorrect) {
        correctAnswers++;
    }

    // Show emoji and word
    const randomWord = currentLetter.words[getRandomInt(0, currentLetter.words.length - 1)];

    document.getElementById('lm-word').textContent = randomWord.emoji + ' ' + randomWord.text;

    // Hide answer buttons temporarily
    const buttons = document.querySelector('#letters-memory-screen .answer-buttons');
    buttons.style.visibility = 'hidden';

    // Next question after delay
    setTimeout(() => {
        buttons.style.visibility = 'visible';
        nextLettersMemory();
    }, 1000);
}

// Completion
function showCompletion() {
    document.getElementById('final-score').textContent = correctAnswers;
    showScreen('completion-screen');
}

function restartGame() {
    if (currentGame) {
        startGame(currentGame);
    }
}
