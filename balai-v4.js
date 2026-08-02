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
// ===========================
// Bal Hafızası
// ===========================

let memory = JSON.parse(localStorage.getItem("balMemory")) || {
    name: "",
    favoriteColor: "",
    favoriteFood: "",
    favoriteAnimal: "",
    city: ""
};

function saveMemory() {
    localStorage.setItem("balMemory", JSON.stringify(memory));
}
function remember(text) {

    const original = text.trim();
    const lower = original.toLowerCase();

    if (lower.startsWith("adım ")) {
        memory.name = original.substring(5);
        saveMemory();
        return "💛 Tanıştığımıza sevindim " + memory.name + "!";
    }

    if (lower.startsWith("en sevdiğim renk ")) {
        memory.favoriteColor = original.substring(17);
        saveMemory();
        return "🎨 Tamam! En sevdiğin rengi unutmayacağım.";
    }

    if (lower.startsWith("en sevdiğim yemek ")) {
        memory.favoriteFood = original.substring(18);
        saveMemory();
        return "🍝 Bunu da aklıma yazdım.";
    }

    if (lower.startsWith("en sevdiğim hayvan ")) {
        memory.favoriteAnimal = original.substring(19);
        saveMemory();
        return "🐻 Ne güzel!";
    }

    if (lower.startsWith("izmirliyim")) {
        memory.city = "İzmir";
        saveMemory();
        return "🌼 İzmir'i aklımda tutacağım.";
    }

    return null;
}
