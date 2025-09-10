// --- Game Setup ---
const gameData = {
    kpis: [
        { id: 1, text: "High Customer Churn Rate" },
        { id: 2, text: "Low Website Conversion Rate" },
        { id: 3, text: "Poor Social Media Engagement" },
        { id: 4, text: "High Cost Per Acquisition (CPA)" },
        { id: 5, text: "Low Average Order Value (AOV)" },
        { id: 6, text: "Stagnant Organic Traffic" }
    ],
    strategies: [
        { id: 1, text: "Implement a Customer Loyalty Program" },
        { id: 2, text: "A/B Test Landing Page CTAs" },
        { id: 3, text: "Launch an Interactive Content Campaign" },
        { id: 4, text: "Optimize Ad Spend with Negative Keywords" },
        { id: 5, text: "Introduce Product Bundles & Upsells" },
        { id: 6, text: "Develop a Pillar Content & Blog Strategy" }
    ]
};

let score = 0;
let timer = 60;
let timerInterval;
let selectedKpi = null;
let highScore = localStorage.getItem('strategySprintHighScore') || 0;

// --- DOM Elements ---
const kpiContainer = document.getElementById('kpi-cards');
const strategyContainer = document.getElementById('strategy-tiles');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const highScoreEl = document.getElementById('high-score');
const gameResultEl = document.getElementById('game-result');
const finalScoreEl = document.getElementById('final-score');
const resultInsightEl = document.getElementById('result-insight');
const playAgainBtn = document.getElementById('play-again-btn');

// --- Functions ---

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setupBoard() {
    kpiContainer.innerHTML = '';
    strategyContainer.innerHTML = '';
    gameResultEl.style.display = 'none';

    shuffle(gameData.kpis);
    shuffle(gameData.strategies);

    gameData.kpis.forEach(kpi => {
        const card = document.createElement('div');
        card.className = 'game-card kpi-card';
        card.textContent = kpi.text;
        card.dataset.id = kpi.id;
        card.addEventListener('click', onKpiClick);
        kpiContainer.appendChild(card);
    });

    gameData.strategies.forEach(strategy => {
        const tile = document.createElement('div');
        tile.className = 'game-tile strategy-tile';
        tile.textContent = strategy.text;
        tile.dataset.id = strategy.id;
        tile.addEventListener('click', onStrategyClick);
        strategyContainer.appendChild(tile);
    });
}

function onKpiClick(e) {
    if (selectedKpi) {
        selectedKpi.classList.remove('selected');
    }
    selectedKpi = e.target;
    selectedKpi.classList.add('selected');
}

function onStrategyClick(e) {
    if (!selectedKpi) return;

    const strategyId = e.target.dataset.id;
    const kpiId = selectedKpi.dataset.id;

    if (strategyId === kpiId) {
        // Correct match
        score += 10;
        selectedKpi.classList.add('matched');
        e.target.classList.add('matched');
        selectedKpi.removeEventListener('click', onKpiClick);
        e.target.removeEventListener('click', onStrategyClick);
    } else {
        // Incorrect match
        score -= 5;
        e.target.classList.add('incorrect');
        setTimeout(() => e.target.classList.remove('incorrect'), 500);
    }

    scoreEl.textContent = score;
    selectedKpi.classList.remove('selected');
    selectedKpi = null;

    checkWinCondition();
}

function checkWinCondition() {
    const matchedTiles = document.querySelectorAll('.strategy-tile.matched').length;
    if (matchedTiles === gameData.strategies.length) {
        endGame();
    }
}

function startGame() {
    score = 0;
    timer = 60;
    scoreEl.textContent = score;
    timerEl.textContent = timer;
    highScoreEl.textContent = highScore;
    setupBoard();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timer--;
    timerEl.textContent = timer;
    if (timer <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    gameResultEl.style.display = 'block';
    finalScoreEl.textContent = score;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('strategySprintHighScore', highScore);
        resultInsightEl.textContent = "New high score! You're a true strategist.";
    } else {
        resultInsightEl.textContent = "Good effort! Try again to beat your high score.";
    }
}

// --- Initialization ---
async function initPlayPage() {
    populateHeader();
    initBaseEventListeners();

    try {
        const response = await fetch('/data/site-config.json');
        if (!response.ok) throw new Error(`Failed to load site config: ${response.status}`);
        const config = await response.json();
        populateFooter(config.site);
    } catch (error) {
        console.error(error);
    }

    playAgainBtn.addEventListener('click', startGame);
    startGame();
}

document.addEventListener('DOMContentLoaded', initPlayPage);
