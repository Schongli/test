// Flag data with country codes and names (101 countries, Israel excluded)
const flagData = [
    { code: 'us', country: 'United States' },
    { code: 'gb', country: 'United Kingdom' },
    { code: 'fr', country: 'France' },
    { code: 'de', country: 'Germany' },
    { code: 'it', country: 'Italy' },
    { code: 'es', country: 'Spain' },
    { code: 'ca', country: 'Canada' },
    { code: 'jp', country: 'Japan' },
    { code: 'cn', country: 'China' },
    { code: 'kr', country: 'South Korea' },
    { code: 'br', country: 'Brazil' },
    { code: 'ar', country: 'Argentina' },
    { code: 'mx', country: 'Mexico' },
    { code: 'au', country: 'Australia' },
    { code: 'in', country: 'India' },
    { code: 'ru', country: 'Russia' },
    { code: 'za', country: 'South Africa' },
    { code: 'eg', country: 'Egypt' },
    { code: 'ng', country: 'Nigeria' },
    { code: 'tr', country: 'Turkey' },
    { code: 'nl', country: 'Netherlands' },
    { code: 'se', country: 'Sweden' },
    { code: 'no', country: 'Norway' },
    { code: 'dk', country: 'Denmark' },
    { code: 'fi', country: 'Finland' },
    { code: 'ch', country: 'Switzerland' },
    { code: 'at', country: 'Austria' },
    { code: 'be', country: 'Belgium' },
    { code: 'pt', country: 'Portugal' },
    { code: 'gr', country: 'Greece' },
    { code: 'ie', country: 'Ireland' },
    { code: 'pl', country: 'Poland' },
    { code: 'cz', country: 'Czech Republic' },
    { code: 'hu', country: 'Hungary' },
    { code: 'ro', country: 'Romania' },
    { code: 'ua', country: 'Ukraine' },
    { code: 'th', country: 'Thailand' },
    { code: 'vn', country: 'Vietnam' },
    { code: 'ph', country: 'Philippines' },
    { code: 'id', country: 'Indonesia' },
    { code: 'my', country: 'Malaysia' },
    { code: 'sg', country: 'Singapore' },
    { code: 'sa', country: 'Saudi Arabia' },
    { code: 'ae', country: 'United Arab Emirates' },
    { code: 'cl', country: 'Chile' },
    { code: 'pe', country: 'Peru' },
    { code: 'co', country: 'Colombia' },
    { code: 've', country: 'Venezuela' },
    { code: 'ke', country: 'Kenya' },
    { code: 'et', country: 'Ethiopia' },
    { code: 'gh', country: 'Ghana' },
    { code: 'ma', country: 'Morocco' },
    { code: 'tn', country: 'Tunisia' },
    { code: 'dz', country: 'Algeria' },
    { code: 'nz', country: 'New Zealand' },
    { code: 'is', country: 'Iceland' },
    { code: 'lu', country: 'Luxembourg' },
    { code: 'mt', country: 'Malta' },
    { code: 'cy', country: 'Cyprus' },
    { code: 'ee', country: 'Estonia' },
    { code: 'lv', country: 'Latvia' },
    { code: 'lt', country: 'Lithuania' },
    { code: 'sk', country: 'Slovakia' },
    { code: 'si', country: 'Slovenia' },
    { code: 'hr', country: 'Croatia' },
    { code: 'ba', country: 'Bosnia and Herzegovina' },
    { code: 'rs', country: 'Serbia' },
    { code: 'me', country: 'Montenegro' },
    { code: 'mk', country: 'North Macedonia' },
    { code: 'al', country: 'Albania' },
    { code: 'bg', country: 'Bulgaria' },
    { code: 'md', country: 'Moldova' },
    { code: 'by', country: 'Belarus' },
    { code: 'kz', country: 'Kazakhstan' },
    { code: 'uz', country: 'Uzbekistan' },
    { code: 'kg', country: 'Kyrgyzstan' },
    { code: 'tj', country: 'Tajikistan' },
    { code: 'tm', country: 'Turkmenistan' },
    { code: 'af', country: 'Afghanistan' },
    { code: 'pk', country: 'Pakistan' },
    { code: 'bd', country: 'Bangladesh' },
    { code: 'lk', country: 'Sri Lanka' },
    { code: 'mv', country: 'Maldives' },
    { code: 'np', country: 'Nepal' },
    { code: 'bt', country: 'Bhutan' },
    { code: 'mm', country: 'Myanmar' },
    { code: 'kh', country: 'Cambodia' },
    { code: 'la', country: 'Laos' },
    { code: 'bn', country: 'Brunei' },
    { code: 'kp', country: 'North Korea' },
    { code: 'mn', country: 'Mongolia' },
    { code: 'ir', country: 'Iran' },
    { code: 'iq', country: 'Iraq' },
    { code: 'sy', country: 'Syria' },
    { code: 'lb', country: 'Lebanon' },
    { code: 'jo', country: 'Jordan' },
    { code: 'kw', country: 'Kuwait' },
    { code: 'bh', country: 'Bahrain' },
    { code: 'qa', country: 'Qatar' },
    { code: 'om', country: 'Oman' },
    { code: 'ye', country: 'Yemen' }
];

// Game state variables
let currentQuestion = 0;
let score = 0;
let streak = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let currentFlag = null;
let answered = false;
let usedFlags = [];
let difficulty = 'easy';
let timeLeft = 30;
let timer = null;
let questionsPerRound = 20;
let sessionFlags = [];
let streakHistory = [];

// Difficulty settings
const difficultySettings = {
    easy: { options: 4, time: 30, points: 10 },
    medium: { options: 6, time: 25, points: 15 },
    hard: { options: 8, time: 20, points: 20 }
};

// Initialize stars background
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// Difficulty selector event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            difficulty = btn.dataset.difficulty;
            restartGame();
        });
    });
});

// Timer functions
function startTimer() {
    timeLeft = difficultySettings[difficulty].time;
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 5) {
            document.getElementById('timer').classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    document.getElementById('timer').classList.remove('warning');
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
}

function timeUp() {
    if (!answered) {
        answered = true;
        streak = 0;
        showFeedback('⏰ Time\'s up!', 'incorrect');
        highlightCorrectAnswer();
        updateStats();
        document.getElementById('nextBtn').disabled = false;
    }
}

// Flag functions
function getFlagUrl(countryCode) {
    const flagSources = [
        `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`,
        `https://flagpedia.net/data/flags/w580/${countryCode.toLowerCase()}.png`,
        `https://www.worldometers.info/img/flags/${countryCode.toLowerCase()}-flag.gif`
    ];
    return flagSources;
}

// CSS Flag colors for fallback
function getFlagColors(countryCode) {
    const flagColors = {
        'us': ['#B22234', '#FFFFFF', '#3C3B6E'],
        'gb': ['#012169', '#FFFFFF', '#C8102E'],
        'fr': ['#0055A4', '#FFFFFF', '#EF4135'],
        'de': ['#000000', '#DD0000', '#FFCE00'],
        'it': ['#009246', '#FFFFFF', '#CE2B37'],
        'es': ['#AA151B', '#F1BF00', '#AA151B'],
        'ca': ['#FF0000', '#FFFFFF', '#FF0000'],
        'jp': ['#FFFFFF', '#BC002D', '#FFFFFF'],
        'cn': ['#DE2910', '#FFDE00', '#DE2910'],
        'br': ['#009739', '#FEDD00', '#012169'],
        'ar': ['#74ACDF', '#FFFFFF', '#74ACDF'],
        'au': ['#012169', '#FFFFFF', '#E4002B'],
        'in': ['#FF9933', '#FFFFFF', '#138808'],
        'ru': ['#FFFFFF', '#0039A6', '#D52B1E'],
        'mx': ['#006847', '#FFFFFF', '#CE1126'],
        'nl': ['#21468B', '#FFFFFF', '#AE1C28'],
        'se': ['#006AA7', '#FECC00', '#006AA7'],
        'no': ['#EF2B2D', '#FFFFFF', '#002868'],
        'dk': ['#C60C30', '#FFFFFF', '#C60C30'],
        'fi': ['#003580', '#FFFFFF', '#003580'],
        'ch': ['#FF0000', '#FFFFFF', '#FF0000'],
        'at': ['#ED2939', '#FFFFFF', '#ED2939'],
        'be': ['#000000', '#FDDA24', '#ED2939'],
        'pt': ['#046A38', '#FFFFFF', '#DA020E'],
        'gr': ['#0D5EAF', '#FFFFFF', '#0D5EAF'],
        'ie': ['#009A49', '#FFFFFF', '#FF7900'],
        'pl': ['#FFFFFF', '#DC143C', '#FFFFFF'],
        'cz': ['#FFFFFF', '#11457E', '#D7141A'],
        'hu': ['#CE2939', '#FFFFFF', '#436F4D'],
        'ro': ['#002B7F', '#FCD116', '#CE1126'],
        'ua': ['#0057B7', '#FFD700', '#0057B7'],
        'th': ['#ED1C24', '#FFFFFF', '#241D4F'],
        'vn': ['#DA020E', '#FFFF00', '#DA020E'],
        'ph': ['#0038A8', '#FFFFFF', '#CE1126'],
        'id': ['#FFFFFF', '#FF0000', '#FFFFFF'],
        'my': ['#010066', '#FFFFFF', '#CC0001'],
        'sg': ['#FFFFFF', '#ED2939', '#FFFFFF'],
        'sa': ['#006C35', '#FFFFFF', '#006C35'],
        'ae': ['#00732F', '#FFFFFF', '#FF0000'],
        'cl': ['#0039A6', '#FFFFFF', '#D52B1E'],
        'pe': ['#FFFFFF', '#D91023', '#FFFFFF'],
        'co': ['#FDE047', '#003DA5', '#CE1126'],
        've': ['#CF142B', '#00247D', '#FCDD09'],
        'ke': ['#000000', '#FFFFFF', '#006600'],
        'et': ['#078930', '#FCDD09', '#DA020E'],
        'gh': ['#006B3F', '#FCD116', '#CE1126'],
        'ma': ['#C1272D', '#006233', '#C1272D'],
        'tn': ['#E70013', '#FFFFFF', '#E70013'],
        'dz': ['#006233', '#FFFFFF', '#D21034'],
        'nz': ['#012169', '#FFFFFF', '#CC142B'],
        'is': ['#003897', '#FFFFFF', '#D72828'],
        'lu': ['#ED2939', '#FFFFFF', '#00A1DE'],
        'mt': ['#FFFFFF', '#CF142B', '#FFFFFF'],
        'cy': ['#FFFFFF', '#D57800', '#FFFFFF'],
        'ee': ['#0072CE', '#000000', '#FFFFFF'],
        'lv': ['#9E3039', '#FFFFFF', '#9E3039'],
        'lt': ['#FDB913', '#006A44', '#C1272D'],
        'sk': ['#FFFFFF', '#0B4EA2', '#EE1C25'],
        'si': ['#FFFFFF', '#005CE6', '#FF0000'],
        'hr': ['#FF0000', '#FFFFFF', '#171796'],
        'ba': ['#002395', '#FECB00', '#002395'],
        'rs': ['#C6363C', '#0C4076', '#FFFFFF'],
        'me': ['#C40308', '#D4AF37', '#C40308'],
        'mk': ['#D20000', '#FFE600', '#D20000'],
        'al': ['#E41E20', '#000000', '#E41E20'],
        'bg': ['#FFFFFF', '#00966E', '#D62612'],
        'md': ['#0033A0', '#FFD200', '#CC092F'],
        'by': ['#006600', '#FF0000', '#FFFFFF'],
        'kz': ['#1EB53A', '#FFDC00', '#1EB53A'],
        'uz': ['#1EB53A', '#FFFFFF', '#0099B5'],
        'kg': ['#E4002B', '#FFE000', '#E4002B'],
        'tj': ['#006600', '#FFFFFF', '#CC0000'],
        'tm': ['#00B04F', '#FFFFFF', '#00B04F'],
        'af': ['#000000', '#D32011', '#007A33'],
        'pk': ['#01411C', '#FFFFFF', '#01411C'],
        'bd': ['#006A4E', '#F42A41', '#006A4E'],
        'lk': ['#FF7900', '#FFCC00', '#8D153A'],
        'mv': ['#D21034', '#FFFFFF', '#007E3A'],
        'np': ['#DC143C', '#003893', '#DC143C'],
        'bt': ['#FFD520', '#FF4E12', '#FFD520'],
        'mm': ['#FECB00', '#34B233', '#EA2839'],
        'kh': ['#032EA1', '#E4181C', '#032EA1'],
        'la': ['#CE1126', '#002868', '#FFFFFF'],
        'bn': ['#FEDD00', '#000000', '#FFFFFF'],
        'kp': ['#024FA2', '#ED1C27', '#FFFFFF'],
        'mn': ['#0066CC', '#E4002B', '#0066CC'],
        'ir': ['#239F40', '#FFFFFF', '#DA0000'],
        'iq': ['#CE1126', '#FFFFFF', '#000000'],
        'sy': ['#CE1126', '#FFFFFF', '#000000'],
        'lb': ['#ED1C24', '#FFFFFF', '#ED1C24'],
        'jo': ['#CE1126', '#FFFFFF', '#007A3D'],
        'kw': ['#007A3D', '#FFFFFF', '#CE1126'],
        'bh': ['#CE1126', '#FFFFFF', '#CE1126'],
        'qa': ['#8D1B3D', '#FFFFFF', '#8D1B3D'],
        'om': ['#ED1C24', '#FFFFFF', '#008000'],
        'ye': ['#CE1126', '#FFFFFF', '#000000']
    };
    return flagColors[countryCode.toLowerCase()] || ['#4A5568', '#FFFFFF', '#4A5568'];
}

function createCSSFlag(colors, countryName) {
    const [color1, color2, color3] = colors;
    return `
        <div style="
            width: 240px; 
            height: 160px; 
            margin: 0 auto; 
            border-radius: 12px; 
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            position: relative;
        ">
            <div style="
                width: 100%; 
                height: 33.33%; 
                background: ${color1};
            "></div>
            <div style="
                width: 100%; 
                height: 33.33%; 
                background: ${color2};
                display: flex;
                align-items: center;
                justify-content: center;
                color: ${color2 === '#FFFFFF' ? '#333' : '#FFF'};
                font-weight: bold;
                font-size: 0.9em;
            ">${countryName.substring(0, 3).toUpperCase()}</div>
            <div style="
                width: 100%; 
                height: 33.33%; 
                background: ${color3};
            "></div>
            <div style="
                position: absolute;
                bottom: 5px;
                right: 8px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.75em;
                font-weight: 500;
            ">${countryName}</div>
        </div>
    `;
}

function loadFlagImage(flagData) {
    const flagContainer = document.getElementById('flagContainer');
    flagContainer.innerHTML = '<div class="loading-spinner"></div>';
    
    const flagSources = getFlagUrl(flagData.code);
    let currentSourceIndex = 0;
    let imageLoadTimeout;
    
    function tryLoadFlag() {
        if (currentSourceIndex >= flagSources.length) {
            showCSSFlag();
            return;
        }
        
        if (imageLoadTimeout) {
            clearTimeout(imageLoadTimeout);
        }
        
        const img = new Image();
        
        imageLoadTimeout = setTimeout(() => {
            currentSourceIndex++;
            tryLoadFlag();
        }, 2000);
        
        img.onload = function() {
            clearTimeout(imageLoadTimeout);
            flagContainer.innerHTML = `<img src="${this.src}" alt="Flag of ${flagData.country}" />`;
        };
        
        img.onerror = function() {
            clearTimeout(imageLoadTimeout);
            currentSourceIndex++;
            tryLoadFlag();
        };
        
        img.crossOrigin = "anonymous";
        img.src = flagSources[currentSourceIndex];
    }
    
    function showCSSFlag() {
        const flagColors = getFlagColors(flagData.code);
        const flagHtml = createCSSFlag(flagColors, flagData.country);
        flagContainer.innerHTML = flagHtml;
    }
    
    setTimeout(() => {
        if (flagContainer.innerHTML.includes('loading-spinner')) {
            showCSSFlag();
        }
    }, 1000);
    
    tryLoadFlag();
}

// Utility functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Game logic functions
function initializeSessionFlags() {
    const allFlags = [...flagData];
    sessionFlags = [];
    
    for (let i = 0; i < 20 && allFlags.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * allFlags.length);
        sessionFlags.push(allFlags[randomIndex]);
        allFlags.splice(randomIndex, 1);
    }
    
    console.log('Session flags initialized:', sessionFlags.map(f => f.country));
}

function generateQuestion() {
    if (sessionFlags.length === 0) {
        initializeSessionFlags();
    }

    if (usedFlags.length >= sessionFlags.length) {
        usedFlags = [];
    }

    const availableFlags = sessionFlags.filter(flag => !usedFlags.includes(flag.country));
    const randomIndex = Math.floor(Math.random() * availableFlags.length);
    currentFlag = availableFlags[randomIndex];
    usedFlags.push(currentFlag.country);

    const optionCount = difficultySettings[difficulty].options;
    const options = getRandomFlags(currentFlag, optionCount);
    
    loadFlagImage(currentFlag);
    generateOptions(options);
    
    answered = false;
    document.getElementById('nextBtn').disabled = true;
    hideFeedback();
    
    updateProgress();
    startTimer();
}

function getRandomFlags(correct, count) {
    const options = [correct];
    const availableFlags = sessionFlags.filter(f => f.country !== correct.country);
    
    while (options.length < count && availableFlags.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableFlags.length);
        const randomFlag = availableFlags[randomIndex];
        if (!options.find(opt => opt.country === randomFlag.country)) {
            options.push(randomFlag);
        }
        availableFlags.splice(randomIndex, 1);
    }
    
    if (options.length < count) {
        const remainingFlags = flagData.filter(f => 
            !options.find(opt => opt.country === f.country)
        );
        
        while (options.length < count && remainingFlags.length > 0) {
            const randomIndex = Math.floor(Math.random() * remainingFlags.length);
            const randomFlag = remainingFlags[randomIndex];
            options.push(randomFlag);
            remainingFlags.splice(randomIndex, 1);
        }
    }
    
    return shuffleArray(options);
}

function generateOptions(options) {
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.country;
        button.onclick = () => selectAnswer(option.country, button);
        
        // Add keyboard hint
        const hint = document.createElement('span');
        hint.className = 'key-hint';
        hint.textContent = ` (${index + 1})`;
        hint.style.opacity = '0.6';
        hint.style.fontSize = '0.8em';
        button.appendChild(hint);
        
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedCountry, buttonElement) {
    if (answered) return;
    
    answered = true;
    stopTimer();
    
    const isCorrect = selectedCountry === currentFlag.country;
    totalQuestions++;
    
    if (isCorrect) {
        const points = difficultySettings[difficulty].points;
        const timeBonus = Math.max(0, Math.floor(timeLeft / 5));
        const streakBonus = Math.min(streak * 2, 20);
        const totalPoints = points + timeBonus + streakBonus;
        
        score += totalPoints;
        streak++;
        correctAnswers++;
        
        let message = '🎉 Correct!';
        if (timeBonus > 0) message += ` (+${timeBonus} time bonus)`;
        if (streakBonus > 0) message += ` (+${streakBonus} streak bonus)`;
        
        showFeedback(message, 'correct');
        buttonElement.classList.add('correct');
        playSound('correct');
    } else {
        streak = 0;
        showFeedback(`❌ Wrong! It was ${currentFlag.country}`, 'incorrect');
        buttonElement.classList.add('incorrect');
        highlightCorrectAnswer();
        playSound('incorrect');
    }
    
    disableAllOptions();
    updateStats();
    document.getElementById('nextBtn').disabled = false;
}

function highlightCorrectAnswer() {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        if (btn.textContent.includes(currentFlag.country)) {
            btn.classList.add('correct');
        }
    });
}

function disableAllOptions() {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.classList.add('disabled');
        btn.style.pointerEvents = 'none';
    });
}

function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type} show`;
}

function hideFeedback() {
    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback';
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion >= questionsPerRound) {
        showGameComplete();
        return;
    }
    
    generateQuestion();
}

function showGameComplete() {
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const flagContainer = document.getElementById('flagContainer');
    
    flagContainer.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <h2 style="color: #667eea; margin-bottom: 20px;">🏁 Round Complete!</h2>
            <div style="font-size: 1.2em; line-height: 1.6;">
                <div>Final Score: <strong>${score}</strong></div>
                <div>Questions: <strong>${correctAnswers}/${totalQuestions}</strong></div>
                <div>Accuracy: <strong>${accuracy}%</strong></div>
                <div>Best Streak: <strong>${Math.max(...streakHistory, streak)}</strong></div>
                <div style="margin-top: 15px; color: #a0aec0; font-size: 0.9em;">
                    You completed 20 random flags from our collection of 101!
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('questionText').textContent = 'Great job! Ready for another 20 flags?';
    document.getElementById('optionsContainer').innerHTML = '';
    document.getElementById('nextBtn').style.display = 'none';
    
    showFeedback(getPerformanceMessage(accuracy), accuracy >= 70 ? 'correct' : 'incorrect');
}

function getPerformanceMessage(accuracy) {
    if (accuracy >= 90) return '🏆 Outstanding! Geography master!';
    if (accuracy >= 80) return '🌟 Excellent work! Well done!';
    if (accuracy >= 70) return '👏 Good job! Keep it up!';
    if (accuracy >= 50) return '📚 Not bad! Room for improvement!';
    return '🎯 Keep practicing! You\'ll get better!';
}

function updateStats() {
    document.getElementById('score').textContent = score;
    document.getElementById('streak').textContent = streak;
    
    if (streak > 0) {
        streakHistory.push(streak);
    }
    
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy + '%';
}

function updateProgress() {
    const questionNumber = currentQuestion + 1;
    document.getElementById('question').textContent = questionNumber;
    document.getElementById('progressText').textContent = `Question ${questionNumber} of ${questionsPerRound}`;
    
    const progress = (currentQuestion / questionsPerRound) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function restartGame() {
    currentQuestion = 0;
    score = 0;
    streak = 0;
    totalQuestions = 0;
    correctAnswers = 0;
    usedFlags = [];
    sessionFlags = [];
    streakHistory = [];
    answered = false;
    
    stopTimer();
    
    document.getElementById('nextBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').disabled = true;
    
    updateStats();
    generateQuestion();
}

// Sound effects
function playSound(type) {
    if (typeof AudioContext === 'undefined' && typeof webkitAudioContext === 'undefined') return;
    
    try {
        const audioContext = new (AudioContext || webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        let frequency, duration;
        switch (type) {
            case 'correct':
                frequency = 523.25;
                duration = 0.3;
                break;
            case 'incorrect':
                frequency = 220;
                duration = 0.5;
                break;
            case 'tick':
                frequency = 800;
                duration = 0.1;
                break;
        }
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type === 'incorrect' ? 'sawtooth' : 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.log('Audio not supported');
    }
}

// Keyboard event listeners
document.addEventListener('keydown', (e) => {
    if (answered) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!document.getElementById('nextBtn').disabled) {
                nextQuestion();
            }
        }
        return;
    }
    
    const optionButtons = document.querySelectorAll('.option-btn');
    const keyNum = parseInt(e.key);
    if (keyNum >= 1 && keyNum <= optionButtons.length) {
        e.preventDefault();
        optionButtons[keyNum - 1].click();
    }
});

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    
    // Add initial animation
    const gameContainer = document.querySelector('.game-container');
    gameContainer.style.opacity = '0';
    gameContainer.style.transform = 'translateY(20px)';
    gameContainer.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        gameContainer.style.opacity = '1';
        gameContainer.style.transform = 'translateY(0)';
    }, 100);
    
    generateQuestion();
});

// Global functions for HTML onclick handlers
window.nextQuestion = nextQuestion;
window.restartGame = restartGame;
        '