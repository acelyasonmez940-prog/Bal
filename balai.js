import responses from "./responses.js";

let currentUser = "";
let lastReply = "";

function getRandomReply(list) {
    if (!list || list.length === 0) return "";

    let reply;

    do {
        reply = list[Math.floor(Math.random() * list.length)];
    } while (reply === lastReply && list.length > 1);

    lastReply = reply;
    return reply;
}

function selectUser(name) {
    currentUser = name;

    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("chatScreen").style.display = "flex";

    document.getElementById("messages").innerHTML = `
        <div class="message bal">
            🐝 Merhaba <b>${name}</b> 💛<br><br>
            Ben Bal! Bugün nasılsın?
        </div>
    `;
}

function findResponse(text) {

    for (const key in responses) {

        const category = responses[key];

        if (
            category &&
            typeof category === "object" &&
            Array.isArray(category.keywords) &&
            Array.isArray(category.replies)
        ) {

            if (
                category.keywords.some(keyword =>
                    text.includes(keyword.toLowerCase())
                )
            ) {
                return getRandomReply(category.replies);
            }

        }

    }

    return "";
}

function sendMessage() {

    const input = document.getElementById("messageInput");

    if (input.value.trim() === "") return;

    const originalText = input.value;
    const text = originalText.toLowerCase().trim();

    const messages = document.getElementById("messages");

    messages.innerHTML += `
        <div class="message user">
            ${originalText}
        </div>
    `;
        input.value = "";

    let cevap = findResponse(text);

    if (!cevap) {

        if (text.includes("nasılsın")) {
            cevap = "🐝 Ben çok iyiyim! Sen nasılsın? 💛";
        }

        else if (text.includes("seni seviyorum")) {
            cevap = `🥹 Ben de seni çok seviyorum ${currentUser}! 💛`;
        }

        else if (text.includes("teşekkür")) {
            cevap = "💛 Rica ederim. Her zaman buradayım.";
        }

        else if (
            text.includes("iyi geceler") ||
            text.includes("iyi geceler bal")
        ) {
            cevap = "🌙 Sana huzurlu geceler diliyorum. Tatlı rüyalar. 🐝";
        }

        else if (
            text.includes("görüşürüz") ||
            text.includes("bay") ||
            text.includes("bye")
        ) {
            cevap = "👋 Görüşürüz! Kendine iyi bak. 💛";
        }

        else {
            cevap = `🐝 Seni dinliyorum ${currentUser} 💕`;
        }

    }

    messages.innerHTML += `
        <div class="message bal" id="typing">
            🐝 Yazıyor...
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
            const typing = document.getElementById("typing");

        if (typing) {
            typing.remove();
        }

        messages.innerHTML += `
            <div class="message bal">
                ${cevap}
            </div>
        `;

        messages.scrollTop = messages.scrollHeight;

    }, 900);

}
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("messageInput");

    if (input) {

        input.addEventListener("keypress", function (e) {

            if (e.key === "Enter") {
                sendMessage();
            }

        });

    }

});

window.selectUser = selectUser;
window.sendMessage = sendMessage;
function showQuickActions(type) {

    const box = document.getElementById("quickActions");

    let buttons = "";

    if (type === "uzgun") {

        buttons = `
            <button onclick="quickAction('sohbet')">💬 Anlatmak İstiyorum</button>
            <button onclick="quickAction('oyun')">🎲 Oyun Oyna</button>
        `;

    }

    else if (type === "sinirli") {

        buttons = `
            <button onclick="quickAction('fikra')">😂 Fıkra</button>
            <button onclick="quickAction('bilmece')">🤔 Bilmece</button>
        `;

    }

    else if (type === "mutlu") {

        buttons = `
            <button onclick="quickAction('oyun')">🎉 Oyun</button>
            <button onclick="quickAction('bilmece')">🧩 Bilmece</button>
        `;

    }

    box.innerHTML = buttons;
    box.style.display = "flex";
}
function quickAction(type) {

    const messages = document.getElementById("messages");

    let cevap = "";

    if (type === "oyun") {
        cevap = "🎲 Harika! Yakında yazı tura ve sayı tahmin oyunumuz olacak.";
    }

    else if (type === "fikra") {
        cevap = "😂 Bir fıkra hazırlıyorum! Çok yakında burada olacak.";
    }

    else if (type === "bilmece") {
        cevap = "🤔 Bilmece modu yakında geliyor!";
    }

    else if (type === "sohbet") {
        cevap = "💛 Tabii. Seni dinliyorum, anlat bakalım.";
    }

    messages.innerHTML += `
        <div class="message bal">
            ${cevap}
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;
}

window.quickAction = quickAction;
