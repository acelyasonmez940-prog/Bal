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

    addMessage("bal", aiReply);

} else {

    addMessage(
        "bal",
        "🐝 Seni duydum. 💛"
    );

}
    }, 500);
}

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        sendMessage();
    }

});