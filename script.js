let balance = 1000;

// LOAD SAVED DATA
if (localStorage.getItem("froxy_balance")) {
balance = parseFloat(localStorage.getItem("froxy_balance"));
}

let portfolio = JSON.parse(localStorage.getItem("froxy_portfolio")) || {
BTC: 0,
AAPL: 0,
TSLA: 0
};

let prices = {
BTC: 2000000,
AAPL: 10000,
TSLA: 8000
};

// LOGIN
function login() {
document.getElementById("loginScreen").classList.add("hidden");
document.getElementById("loadingScreen").classList.remove("hidden");

setTimeout(() => {
document.getElementById("loadingScreen").classList.add("hidden");
document.getElementById("app").classList.remove("hidden");
updateUI();
}, 2000);
}

// MARKET RANDOMIZER (more realistic movement)
function updatePrices() {

prices.BTC += (Math.random() - 0.5) * 80000;
prices.AAPL += (Math.random() - 0.5) * 800;
prices.TSLA += (Math.random() - 0.5) * 900;

document.getElementById("btcPrice").innerText = "₱" + prices.BTC.toFixed(2);
document.getElementById("aaplPrice").innerText = "₱" + prices.AAPL.toFixed(2);
document.getElementById("tslaPrice").innerText = "₱" + prices.TSLA.toFixed(2);

updatePortfolio();
saveData();
}

setInterval(updatePrices, 1500);

// BUY
function buy(asset) {
let cost = prices[asset];

if (balance >= cost) {
balance -= cost;
portfolio[asset]++;
updateUI();
saveData();
}
}

// SELL
function sell(asset) {
if (portfolio[asset] > 0) {
balance += prices[asset];
portfolio[asset]--;
updateUI();
saveData();
}
}

// UI UPDATE
function updateUI() {
document.getElementById("balance").innerText = balance.toFixed(2);
updatePortfolio();
}

// PORTFOLIO DISPLAY
function updatePortfolio() {
document.getElementById("portfolio").innerText =
JSON.stringify(portfolio, null, 2);
}

// SAVE SYSTEM
function saveData() {
localStorage.setItem("froxy_balance", balance);
localStorage.setItem("froxy_portfolio", JSON.stringify(portfolio));
}

// MARKET NEWS SYSTEM
const news = [
"BTC surges after global demand increase 📈",
"Tech stocks recover after market dip 💹",
"TSLA shows volatility due to investor speculation ⚡",
"Crypto market reacts to global regulations 🌍",
"AI stocks booming in early trading 🤖"
];

function showNews() {
const randomNews = news[Math.floor(Math.random() * news.length)];
let newsBox = document.getElementById("newsBox");

if (newsBox) {
newsBox.innerText = randomNews;
}
}

setInterval(showNews, 4000);
