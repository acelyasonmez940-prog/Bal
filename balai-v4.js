// ===========================
// BAL AI v4
// ===========================
const responses = window.responses;
console.log("BAL AI v4 Başladı 🐝");

// ===========================
// Hafıza
// ===========================

const memory = JSON.parse(localStorage.getItem("balMemory")) || {
    name: "",
    favoriteColor: "",
    favoriteFood: "",
    favoriteAnimal: "",
    city: ""
};

function saveMemory() {
    localStorage.setItem("balMemory", JSON.stringify(memory));
}

// ===========================
// HTML
// ===========================

const welcomeScreen = document.getElementById("welcomeScreen");
const chatScreen = document.getElementById("chatScreen");

const messages = document.getElementById("messages");
const headerStatus = document.getElementById("headerStatus");

const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

const aci = document.getElementById("userAci");
const bolatinyo = document.getElementById("userBolatinyo");
// ===========================
// Mesaj Ekle
// ===========================

function addMessage(type, text) {

    messages.innerHTML += `
        <div class="message ${type}">
            ${text}
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;
}
function addTyping() {

    messages.innerHTML += `
        <div class="message bal" id="typing">
            🐝 Bal yazıyor...
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) {
        typing.remove();
    }
}
 function getFollowQuestion(text) {

    const lower = text.toLowerCase();

    if (
        lower.includes("üzgün") ||
        lower.includes("moralim bozuk") ||
        lower.includes("kötüyüm")
    ) {
        return "\n\n🌼 Seni en çok ne üzdü?";
    }

    if (
        lower.includes("mutlu") ||
        lower.includes("harikayım") ||
        lower.includes("çok iyiyim")
    ) {
        return "\n\n✨ Seni en çok ne mutlu etti?";
    }

    if (
        lower.includes("yoruldum") ||
        lower.includes("yorgunum")
    ) {
        return "\n\n☕ Bugün seni en çok ne yordu?";
    }

    return "";
}
// ===========================
// Kullanıcı Seçimi
// ===========================

function selectUser(name) {

    headerStatus.textContent = `💛 ${name} ile sohbet ediyor`;

    welcomeScreen.style.display = "none";
    chatScreen.style.display = "flex";

    messages.innerHTML = "";

    addMessage(
        "bal",
        `🐝 Merhaba <b>${name}</b> 💛<br><br>Ben Bal! Bugün nasılsın?`
    );
}

aci.addEventListener("click", () => {
    selectUser("Açı");
});

bolatinyo.addEventListener("click", () => {
    selectUser("Bolatinyo");
});
// ===========================
// Hafıza
// ===========================
function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
const questionGroups = {

    sad: [
        "💛 İstersen bana anlatabilirsin.",
        "🌼 Seni en çok ne üzdü?",
        "🫂 Sana şu an en iyi ne gelir sence?",
        "🐝 Biraz konuşmak ister misin?"
    ],

    happy: [
        "🥹 Seni en çok ne mutlu etti?",
        "✨ Bu güzel haberi biraz daha anlatır mısın?",
        "🌸 Bugün en güzel anın neydi?",
        "🎉 Bu mutluluğu kutlamak ister misin?"
    ],

    tired: [
        "☕ Bugün seni en çok ne yordu?",
        "🌙 Biraz dinlenmeye ne dersin?",
        "🐝 Kendine bugün zaman ayırabildin mi?",
        "💛 Yarın daha hafif bir gün olmasını isterim."
    ],

    general: [
        "🌼 Bugün seni en çok ne gülümsetti?",
        "🍯 Şu an aklından en çok ne geçiyor?",
        "💛 Bugün nasılsın gerçekten?",
        "☕ Bir yerde olabilsen nerede olmak isterdin?",
        "🎈 Bugün en çok neye güldün?"
    ]

};

function askQuestion(text) {

    const lower = text.toLowerCase();

    if (
        lower.includes("üzgün") ||
        lower.includes("moralim bozuk") ||
        lower.includes("kötüyüm")
    ) {
        return randomItem(questionGroups.sad);
    }

    if (
        lower.includes("mutlu") ||
        lower.includes("harikayım") ||
        lower.includes("çok iyiyim")
    ) {
        return randomItem(questionGroups.happy);
    }

    if (
        lower.includes("yoruldum") ||
        lower.includes("yorgunum")
    ) {
        return randomItem(questionGroups.tired);
    }

    return randomItem(questionGroups.general);
}
function getResponse(text) {

    const lower = text.toLowerCase();
console.log(window.responses);
    for (const key in window.responses) {

        const item = window.responses[key];

        if (!item.keywords) continue;

        for (const keyword of item.keywords) {

            if (lower.includes(keyword.toLowerCase())) {
                return randomItem(item.replies);
            }

        }
    }

    return null;
}
function remember(text) {

    const original = text.trim();
    const lower = original.toLowerCase();

    if (lower.startsWith("adım ")) {
const name = original.substring(5).trim();

memory.name =
    name.charAt(0).toUpperCase() +
    name.slice(1).toLowerCase();
        saveMemory();
        return `💛 Tanıştığımıza sevindim <b>${memory.name}</b>!`;
    }

    if (lower === "ben kimim" || lower === "ben kimim?") {

        if (memory.name) {
            return `💛 Senin adın <b>${memory.name}</b>.`;
        }

        return "🥺 Bana henüz adını söylemedin.";
    }

// Renk sorusu
if (lower === "en sevdiğim renk ne" ||
    lower === "en sevdiğim renk ne?") {

    if (memory.favoriteColor) {
        return `🎨 En sevdiğin renk <b>${memory.favoriteColor}</b>.`;
    }

    return "🥺 Bana henüz en sevdiğin rengi söylemedin.";
}
if (lower.startsWith("en sevdiğim renk ")) {

    memory.favoriteColor = original.substring(17).trim();
    saveMemory();

    return "🎨 Tamam! En sevdiğin rengi aklıma yazdım.";
}
// Yemek sorusu
if (lower === "en sevdiğim yemek ne" ||
    lower === "en sevdiğim yemek ne?") {

    if (memory.favoriteFood) {
        return `🍕 En sevdiğin yemek <b>${memory.favoriteFood}</b>.`;
    }

    return "🥺 Bana henüz en sevdiğin yemeği söylemedin.";
}

// En sevdiğim yemek
if (lower.startsWith("en sevdiğim yemek ")) {

    memory.favoriteFood = original.substring(18).trim();
    saveMemory();

    return "🍕 Tamam! En sevdiğin yemeği aklıma yazdım.";
}
// En sevdiğim hayvan
if (lower === "en sevdiğim hayvan ne" ||
    lower === "en sevdiğim hayvan ne?") {

    if (memory.favoriteAnimal) {
        return `🐱 En sevdiğin hayvan <b>${memory.favoriteAnimal}</b>.`;
    }

    return "🥺 Bana henüz en sevdiğin hayvanı söylemedin.";
}

if (lower.startsWith("en sevdiğim hayvan ")) {

    memory.favoriteAnimal = original.substring(19).trim();
    saveMemory();

    return "🐱 Tamam! En sevdiğin hayvanı aklıma yazdım.";
}
    return null;
}

// ===========================
// Mesaj Gönder
// ===========================

function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    addMessage("user", text);

    input.value = "";

    const memoryReply = remember(text);
    const aiReply = getResponse(text);
    setTimeout(() => {
if (memoryReply) {

    addMessage("bal", memoryReply);

} else if (aiReply) {

 addMessage(
    "bal",
    aiReply + getFollowQuestion(text)
);

} else {

if (Math.random() < 0.35) {
    addMessage("bal", askQuestion(text));
} else {
    addMessage("bal", "🐝 Seni dinliyorum. 💛");
}

}
    }, 500);
}

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        sendMessage();
    }

});