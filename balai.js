let currentUser = "";

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

function sendMessage() {
    const input = document.getElementById("messageInput");

    if (input.value.trim() === "") return;

    const messages = document.getElementById("messages");

    messages.innerHTML += `
        <div class="message user">
            ${input.value}
        </div>
    `;

const text = input.value.trim().toLowerCase();

messages.innerHTML += `
    <div class="message user">
        ${input.value}
    </div>
`;

input.value = "";

   let text = input.value.toLowerCase();
let cevap = "";

if (text.includes("merhaba") || text.includes("selam")) {
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

messages.innerHTML += `
<div class="message bal">
${cevap}
</div>
`;

    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
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
        input.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                sendMessage();
            }
        });
    }
});
