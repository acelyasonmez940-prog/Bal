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

    input.value = "";

    messages.innerHTML += `
        <div class="message bal" id="typing">
            🐝 Bal yazıyor...
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {

        const typing = document.getElementById("typing");
        if (typing) typing.remove();

        messages.innerHTML += `
            <div class="message bal">
                🐝 Seni dinliyorum ${currentUser} 💕
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
