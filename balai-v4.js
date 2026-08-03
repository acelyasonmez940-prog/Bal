// ===========================
// BAL AI v4
// ===========================

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