let balance = 1000;

let portfolio = {
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
}, 2000);
}

// UPDATE MARKET PRICES
function updatePrices() {

prices.BTC += (Math.random() - 0.5) * 50000;
prices.AAPL += (Math.random() - 0.5) * 500;
prices.TSLA += (Math.random() - 0.5) * 500;

document.getElementById("btcPrice").innerText = "₱" + prices.BTC.toFixed(2);
document.getElementById("aaplPrice").innerText = "₱" + prices.AAPL.toFixed(2);
document.getElementById("tslaPrice").innerText = "₱" + prices.TSLA.toFixed(2);

updatePortfolio();
}

setInterval(updatePrices, 2000);

// BUY
function buy(asset) {
let cost = prices[asset];

if (balance >= cost) {
balance -= cost;
portfolio[asset]++;
updateUI();
}
}

// SELL
function sell(asset) {
if (portfolio[asset] > 0) {
balance += prices[asset];
portfolio[asset]--;
updateUI();
}
}

function updateUI() {
document.getElementById("balance").innerText = balance.toFixed(2);
updatePortfolio();
}

function updatePortfolio() {
document.getElementById("portfolio").innerText =
JSON.stringify(portfolio, null, 2);
}
