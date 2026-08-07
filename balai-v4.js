// ===========================
// BAL AI v4
// ===========================
const responses = window.responses;
console.log("BAL AI v4 Başladı 🐝");

// ===========================
// Hafıza
// ===========================

const memory = JSON.parse(localStorage.getItem("balMemory")) || {

    profile: {
        name: "",
        favoriteColor: "",
        favoriteFood: "",
        favoriteAnimal: ""
    },

    memories: [],

    conversation: []

};
let chatState = {
    mode: "normal",
    step: 0,
    lastTopic: "",
    lastMessage: "",
    lastBotReply: ""
};
function saveChat(text, reply) {

    chatState.lastMessage = text;
    chatState.lastBotReply = reply;
chatState.lastTopic = chatState.mode;
}
function continueConversation(text) {

    const lower = text.toLowerCase();

    if (chatState.lastTopic === "relationship") {

        if (
            lower.includes("o") ||
            lower.includes("kendisi") ||
            lower.includes("hala") ||
            lower.includes("sonra") ||
            lower.includes("yine")
        ) {
            chatState.mode = "relationship";
        }

    }

    if (chatState.lastTopic === "family") {

        if (
            lower.includes("annem") ||
            lower.includes("babam") ||
            lower.includes("ailem") ||
            lower.includes("evde") ||
            lower.includes("yine")
        ) {
            chatState.mode = "family";
        }

    }

    if (chatState.lastTopic === "school") {

        if (
            lower.includes("ders") ||
            lower.includes("sınav") ||
            lower.includes("hoca") ||
            lower.includes("not") ||
            lower.includes("yine")
        ) {
            chatState.mode = "school";
        }

    }

    if (chatState.lastTopic === "appearance") {

        if (
            lower.includes("tip") ||
            lower.includes("saç") ||
            lower.includes("yüz") ||
            lower.includes("kilo") ||
            lower.includes("yine")
        ) {
            chatState.mode = "appearance";
        }

    }

}
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
const conversationTopics = {

    family: [
        "annem",
        "annemle",
        "babam",
        "babamla",
        "ailem",
        "ailemle",
        "abim",
        "abi",
        "ağabeyim",
        "ablam",
        "abla",
        "kardeşim",
        "ev",
        "evde",
        "karışıyorlar",
        "karışıyor",
        "tartıştım",
        "kavga ettik",
        "bağırdı",
        "bağırıyor",
        "küstük",
        "beni anlamıyorlar",
        "beni anlamıyor",
        "destek olmuyorlar",
        "destek olmuyor"
    ],

    relationship: [
        "emirhan",
        "sevgilim",
        "erkek arkadaşım",
        "kız arkadaşım",
        "ilişki",
        "ilişkimiz",
        "ayrıldık",
        "barıştık",
        "kavga",
        "tartıştık",
        "yazmıyor",
        "soğuk davranıyor",
        "bana ilgisiz",
        "beni sevmiyor",
        "beni önemsemiyor"
    ],

    appearance: [
        "tip",
        "tipim",
        "görünüş",
        "görünüşüm",
        "saç",
        "saçım",
        "diş",
        "dişim",
        "burnum",
        "kafam",
        "kulaklarım",
        "yüzüm",
        "çirkin",
        "çirkinim",
        "güzel değilim",
        "yakışıklı değilim",
        "özgüven",
        "kiloluyum",
        "şişmanım",
        "zayıfım"
    ],

    school: [
        "okul",
        "okulda",
        "ders",
        "dersler",
        "öğretmen",
        "hoca",
        "sınav",
        "not",
        "ödev",
        "proje",
        "çalışamadım"
    ]

};

function detectTopic(text) {

    const lower = text.toLowerCase();

    for (const topic in conversationTopics) {

        for (const word of conversationTopics[topic]) {

            if (lower.includes(word)) {

                chatState.mode = topic;
                chatState.step = 1;

                return topic;

            }

        }

    }

    return chatState.mode;

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
const intentReplies = {

help: [
"💛 Tabii ki yardım ederim. Birlikte çözeriz.",
"🌼 Elimden geldiğince yardımcı olurum.",
"🫂 Anlat bana, birlikte bakalım."
],

advice: [
"🌸 Birlikte düşünebiliriz.",
"💛 Sence en çok seni zorlayan kısım ne?",
"🐝 İstersen farklı yollar deneyebiliriz."
],

thanks: [
"🥹 Ne demek.",
"💛 Her zaman buradayım.",
"🌼 Buna sevindim."
],

goodnight: [
"🌙 İyi geceler. Umarım güzel dinlenirsin.",
"💛 Tatlı rüyalar.",
"🐝 Yarın yine konuşuruz."
]

};
const topicReplies = {

    family: [
        "💛 Aile içinde böyle şeyler yaşamak gerçekten yorucu olabiliyor. Seni en çok kıran ne oldu?",
        "🌼 Dilersen neler yaşandığını baştan anlatabilirsin.",
        "🫂 Keşke seni biraz rahatlatabilsem. En çok neye üzüldün?",
        "💛 Bazen en çok yakınlarımızın sözleri canımızı acıtabiliyor."
    ],

    relationship: [
    "💛 İlişkiler bazen gerçekten karmaşık olabiliyor. Seni en çok ne düşündürüyor?",
    "🌸 Bunu yaşarken kendini nasıl hissettin?",
    "🫂 Onun davranışı seni kırmış gibi geliyor.",
    "💛 İstersen birlikte konuşabiliriz.",
    "🌼 Bu durum uzun zamandır mı böyle devam ediyor?",
    "💛 Onun adına da biraz üzüldüm. Kendine karşı çok acımasız davranıyor gibi.",
    "🫂 Sen de ona destek olmaya çalışıyorsun gibi hissediyorum.",
    "💛 İnsan bazen kendi kusurlarına başkalarının gördüğünden çok daha fazla takılabiliyor.",
    "🌼 Sence onu en çok hangi düşünce üzüyor?",
    "💛 Onunla bu konu hakkında hiç uzun uzun konuştunuz mu?",
    "🫂 Böyle zamanlarda yanında olman bile ona iyi gelebilir.",
    "💛 Umarım zamanla kendini olduğu gibi sevebilir.",
    "🌸 Bu durum seni de üzmeye başlamış gibi hissediyorum.",
    "🫂 Sen onun için elinden geleni yapıyorsun gibi görünüyor.",
    "💛 Keşke kendini senin gördüğün gözlerle görebilse.",
    "🌼 O bunları anlatırken sen ne hissediyorsun?",
    "💛 Her insanın kusurlu olduğunu bazen kendimize hatırlatmamız gerekiyor.",
    "🫂 Belki de en çok ihtiyacı olan şey yargılanmadan dinlenmek.",
    "💛 Onun yanında olmaya devam etmen çok kıymetli.",
    "🌸 Umarım zamanla kendine karşı daha nazik olmayı öğrenebilir."
],

    appearance: [
        "💛 İnsan bazen kendine karşı çok acımasız olabiliyor.",
        "🌼 Kendin hakkında böyle düşünmene sebep olan ne oldu?",
        "🫂 Dış görünüşünden çok daha fazlasısın.",
        "💛 Seni en çok hangi düşünce üzüyor?"
    ],

    school: [
        "📚 Sınavlar bazen istediğimiz gibi gitmeyebilir.",
        "💛 En çok zorlandığın ders hangisiydi?",
        "🌼 Bir dahaki sınav için birlikte plan yapabiliriz.",
        "🫂 Kendine çok yüklenme olur mu?"
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
function detectIntent(text) {

    const lower = text.toLowerCase();

    if (
        lower.includes("yardım") ||
        lower.includes("yardımcı olur musun") ||
        lower.includes("yardım eder misin")
    ) {
        return randomItem(intentReplies.help);
    }

    if (
        lower.includes("sence") ||
        lower.includes("ne yapmalıyım")
    ) {
        return randomItem(intentReplies.advice);
    }

    if (
        lower.includes("teşekkür")
    ) {
        return randomItem(intentReplies.thanks);
    }

    if (
        lower.includes("iyi geceler")
    ) {
        return randomItem(intentReplies.goodnight);
    }

    return null;
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
    detectTopic(text);
    continueConversation(text);
    const intentReply = detectIntent(text);
    addTyping();
    setTimeout(() => {
    removeTyping();
if (memoryReply) {

    addMessage("bal", memoryReply);
} else if (intentReply) {

    addMessage("bal", intentReply);

    saveChat(text, intentReply);

} else if (aiReply) {

    let reply = aiReply;

    if (topicReplies[chatState.mode]) {
        reply += "\n\n" + randomItem(topicReplies[chatState.mode]);
    }

    const follow = getFollowQuestion(text);

    if (follow) {
        reply += follow;
    }

    addMessage("bal", reply);
saveChat(text, reply);
} else {

    if (topicReplies[chatState.mode]) {

        const topicReply = randomItem(topicReplies[chatState.mode]);

        addMessage("bal", topicReply);

        saveChat(text, topicReply);

    } else if (Math.random() < 0.35) {

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