console.log("BAL V4 ÇALIŞTI");

const aci = document.getElementById("userAci");
const bolatinyo = document.getElementById("userBolatinyo");
const welcomeScreen = document.getElementById("welcomeScreen");
const chatScreen = document.getElementById("chatScreen");
const messages = document.getElementById("messages");
const headerStatus = document.getElementById("headerStatus");

function addMessage(type, text) {
    messages.innerHTML += `
        <div class="message ${type}">
            ${text}
        </div>
    `;
}

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
