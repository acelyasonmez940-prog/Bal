import responses from "./responses.js";

// ===========================
// BAL AI v3
// ===========================

let currentUser = "";
let lastReply = "";
let currentMode = "chat";

const welcomeScreen = document.getElementById("welcomeScreen");
const chatScreen = document.getElementById("chatScreen");
const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

const quickActions = document.getElementById("quickActions");
const quickButtons = document.getElementById("quickButtons");
const quickTitle = document.querySelector(".quick-title");

// ===========================
// Yardımcı Fonksiyonlar
// ===========================

function scrollBottom() {
    messages.scrollTop = messages.scrollHeight;
}

function randomReply(list) {

    if (!list || list.length === 0) {
        return "";
    }

    let reply;

    do {

        reply = list[Math.floor(Math.random() * list.length)];

    } while (
        reply === lastReply &&
        list.length > 1
    );

    lastReply = reply;

    return reply;
}

function addMessage(type, text) {

    messages.innerHTML += `
        <div class="message ${type}">
            ${text}
        </div>
    `;

    scrollBottom();
}

function typing(callback) {

    addMessage("bal", "🐝 Yazıyor...");

    const typingMessage =
        messages.lastElementChild;

    setTimeout(() => {

        typingMessage.remove();

        callback();

    }, 900);

}
// ===========================
// Kullanıcı Seçimi
// ===========================

function selectUser(name) {

    currentUser = name;

    welcomeScreen.style.display = "none";
    chatScreen.style.display = "flex";

    messages.innerHTML = "";

    addMessage(
        "bal",
        `🐝 Merhaba <b>${name}</b> 💛<br><br>Ben Bal! Bugün nasılsın?`
    );

}

// ===========================
// Cevap Bul
// ===========================

function findResponse(text) {

    for (const key in responses) {

        const item = responses[key];

        if (
            item &&
            Array.isArray(item.keywords) &&
            Array.isArray(item.replies)
        ) {

            const found = item.keywords.some(keyword =>
                text.includes(keyword.toLowerCase())
            );

            if (found) {
                return randomReply(item.replies);
            }

        }

    }

    return "";

}

// ===========================
// Mesaj Gönder
// ===========================

function sendMessage() {

    const original = input.value.trim();

    if (!original) return;

    const text = original.toLowerCase();

    addMessage("user", original);

    input.value = "";

    quickActions.style.display = "none";

    let reply = findResponse(text);

    if (!reply) {

        if (text.includes("nasılsın")) {

            reply = "🐝 Ben çok iyiyim! Sen nasılsın? 💛";

        }

        else if (text.includes("teşekkür")) {

            reply = "💛 Rica ederim.";

        }

        else if (text.includes("seni seviyorum")) {

            reply = `🥹 Ben de seni çok seviyorum ${currentUser}!`;

        }

        else if (
            text.includes("görüşürüz") ||
            text.includes("bye")
        ) {

            reply = "👋 Görüşürüz! Kendine iyi bak.";

        }

        else {

            reply = `🐝 Seni dinliyorum ${currentUser}.`;

        }

    }

    typing(() => {

        addMessage("bal", reply);

        checkQuickActions(text);

    });

}
// ===========================
// Hızlı Aksiyonlar
// ===========================

function checkQuickActions(text) {

    if (
        text.includes("üzgün") ||
        text.includes("moral") ||
        text.includes("kötüyüm")
    ) {

        showQuickActions("sad");
    }

    else if (
        text.includes("mutlu") ||
        text.includes("çok iyiyim") ||
        text.includes("harikayım")
    ) {

        showQuickActions("happy");
    }

    else if (
        text.includes("sinir") ||
        text.includes("öfke") ||
        text.includes("kızgın")
    ) {

        showQuickActions("angry");
    }

}

function showQuickActions(type) {

    quickButtons.innerHTML = "";

    quickActions.style.display = "flex";

    if (type === "sad") {

        quickTitle.innerHTML =
            "💛 Belki bunlardan biri iyi gelir.";

        quickButtons.innerHTML = `
            <button onclick="quickAction('talk')">💬 Sohbet Edelim</button>
            <button onclick="quickAction('game')">🎲 Oyun Oyna</button>
        `;

    }

    else if (type === "happy") {

        quickTitle.innerHTML =
            "🎉 Harika! Devam edelim.";

        quickButtons.innerHTML = `
            <button onclick="quickAction('game')">🎲 Oyun Oyna</button>
            <button onclick="quickAction('riddle')">🧩 Bilmece</button>
        `;

    }

    else {

        quickTitle.innerHTML =
            "🌼 Biraz kafa dağıtalım.";

        quickButtons.innerHTML = `
            <button onclick="quickAction('joke')">😂 Fıkra</button>
            <button onclick="quickAction('game')">🎲 Oyun</button>
        `;

    }

}

function quickAction(type) {

    switch (type) {

        case "talk":

            addMessage(
                "bal",
                "💛 Seni dinliyorum. İstediğin kadar anlatabilirsin."
            );

            break;

        case "joke":

            addMessage(
                "bal",
                "😂 Fıkra sistemi çok yakında eklenecek."
            );

            break;

        case "riddle":

            addMessage(
                "bal",
                "🤔 Bilmece sistemi bir sonraki bölümde gelecek."
            );

            break;

        case "game":

            currentMode = "games";

            addMessage(
                "bal",
                `
🎲 Bir oyun seç!

<br><br>

<button onclick="startGame('coin')">🪙 Yazı Tura</button>

<button onclick="startGame('guess')">🎯 Sayı Tahmini</button>

<button onclick="startGame('riddle')">🤔 Bilmece</button>
`
            );

            break;

    }

}

// ===========================
// Eventler
// ===========================

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keypress", e => {

    if (e.key === "Enter") {
        sendMessage();
    }

});

document.getElementById("userAci")
    .addEventListener("click", () => selectUser("Açı"));

document.getElementById("userBolatinyo")
    .addEventListener("click", () => selectUser("Bolatinyo"));

window.quickAction = quickAction;
// ===========================
// Oyun Sistemi
// ===========================

let guessNumber = null;

function startGame(game) {

    currentMode = game;

    switch (game) {

        case "coin":

            addMessage(
                "bal",
                `
🪙 Yazı mı seçiyorsun, Tura mı?

<br><br>

<button onclick="coinFlip('yazı')">Yazı</button>

<button onclick="coinFlip('tura')">Tura</button>
`
            );

            break;

        case "guess":

            guessNumber = Math.floor(Math.random() * 10) + 1;

            addMessage(
                "bal",
                "🎯 1 ile 10 arasında bir sayı tuttum. Tahminini yaz!"
            );

            break;

        case "riddle":

            addMessage(
                "bal",
                `
🤔 Bilmece:

Kanadı var kuş değildir.

Nedir?
`
            );

            break;

    }

}

function coinFlip(choice) {

    const result =
        Math.random() < 0.5 ? "yazı" : "tura";

    if (choice === result) {

        addMessage(
            "bal",
            `🎉 Tebrikler! ${result} geldi ve bildin.`
        );

    }

    else {

        addMessage(
            "bal",
            `😄 ${result} geldi. Bu kez olmadı.`
        );

    }

}

window.coinFlip = coinFlip;
window.startGame = startGame;

// ===========================
// Tahmin Oyunu
// ===========================

const oldSendMessage = sendMessage;

sendMessage = function () {

    if (currentMode === "guess") {

        const value = Number(input.value);

        if (!input.value.trim()) return;

        addMessage("user", input.value);

        input.value = "";

        if (value === guessNumber) {

            addMessage(
                "bal",
                "🎉 Doğru bildin!"
            );

            currentMode = "chat";

        }

        else if (value > guessNumber) {

            addMessage(
                "bal",
                "📉 Daha küçük bir sayı dene."
            );

        }

        else {

            addMessage(
                "bal",
                "📈 Daha büyük bir sayı dene."
            );

        }

        return;

    }

    if (currentMode === "riddle") {

        const answer =
            input.value.trim().toLowerCase();

        addMessage("user", input.value);

        input.value = "";

        if (
            answer.includes("uçak")
        ) {

            addMessage(
                "bal",
                "🎉 Doğru cevap!"
            );

        }

        else {

            addMessage(
                "bal",
                "😄 Bilemedin. Cevap: Uçak."
            );

        }

        currentMode = "chat";

        return;

    }

    oldSendMessage();

};

// ===========================
// Global
// ===========================

window.selectUser = selectUser;
window.sendMessage = sendMessage;
window.quickAction = quickAction;
window.startGame = startGame;