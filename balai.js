import responses from "./responses.js";

let currentUser = "";
let lastReply = "";

function selectUser(name) {
    currentUser = name;

    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("chatScreen").style.display = "flex";

    document.getElementById("messages").innerHTML = `
        <div class="message bal">
            🐝 Merhaba <b>${name}</b> 💗<br><br>
            Ben Bal! Bugün nasılsın? 🍯
        </div>
    `;
}
function getRandomReply(list) {
    if (!list || list.length === 0) {
        return "";
    }

    let reply;

    do {
        reply = list[Math.floor(Math.random() * list.length)];
    } while (reply === lastReply && list.length > 1);

    lastReply = reply;

    return reply;
}
function sendMessage() {
    const input = document.getElementById("messageInput");

    if (input.value.trim() === "") return;

    const messages = document.getElementById("messages");
    const text = input.value.trim().toLowerCase();

    // Kullanıcının mesajını göster
    messages.innerHTML += `
        <div class="message user">
            ${input.value}
        </div>
    `;

    input.value = "";

    let cevap = "";
    const selam = responses.selam;

if (selam.keywords.some(keyword => text.includes(keyword))) {
    cevap = getRandomReply(selam.replies);
}

if (!cevap && (text.includes("merhaba") || text.includes("selam"))) {
        cevap = `🐝 Merhabaa ${currentUser} 💕 Seni gördüğüme çok sevindim!`;
    }
    else if (text.includes("nasılsın")) {
        cevap = "🐝 Ben harikayım! Sen nasılsın? 🥰";
    }
    else if (text.includes("seni seviyorum")) {
        cevap = `🥹 Ben de seni çok seviyorum ${currentUser}! 💗`;
    }
    else if (text.includes("iyi geceler")) {
        cevap = "🌙 Tatlı rüyalar! Bal hep yanında. 🐝";
    }
    else if (text.includes("teşekkür")) {
        cevap = "💛 Ne demek! Her zaman buradayım.";
    }
    else {
        cevap = `🐝 Seni dinliyorum ${currentUser} 💕`;
    }

    // Yazıyor animasyonu
    messages.innerHTML += `
        <div class="message bal" id="typing">
            🐝 Yazıyor...
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
        const typing = document.getElementById("typing");
        if (typing) typing.remove();

        messages.innerHTML += `
            <div class="message bal">
                ${cevap}
            </div>
        `;

        messages.scrollTop = messages.scrollHeight;
    }, 1000);
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