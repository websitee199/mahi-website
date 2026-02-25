// ====== WEBSITE LOADED ======
console.log("SAP SAC Website Loaded");

// ====== CHATBOT LOGIC ======

const avatar = document.getElementById("avatar");
const chatBox = document.getElementById("chatBox");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const closeChat = document.getElementById("closeChat");

// Open Chat
avatar.onclick = () => {
    chatBox.style.display = "block";
    botReply("Hi Mahesh! I am your SAP Analytics Cloud assistant. How can I help you?");
};

// Close Chat
closeChat.onclick = () => {
    chatBox.style.display = "none";
};

// Send Message
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage("You", message);
    generateResponse(message);
    userInput.value = "";
}

// Add Message to UI
function addMessage(sender, text) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Bot Reply Wrapper
function botReply(text) {
    addMessage("Bot", text);
    speak(text);
}

// Generate Response
function generateResponse(input) {

    let reply = "I can help you with SAP Analytics Cloud Planning and Reporting.";

    const msg = input.toLowerCase();

    if (msg.includes("planning")) {
        reply = "SAP Analytics Cloud Planning supports budgeting, forecasting, allocations and version management.";
    }
    else if (msg.includes("data action")) {
        reply = "Data Actions automate copy, allocation and advanced formula calculations in SAC.";
    }
    else if (msg.includes("dashboard")) {
        reply = "Dashboards in SAC provide KPI tracking, drill-down analysis and interactive visualizations.";
    }
    else if (msg.includes("project")) {
        reply = "Mahesh worked on Dealer Performance and Financial Planning dashboards.";
    }
    else if (msg.includes("who are you")) {
        reply = "I am your interactive SAP Analytics Cloud assistant.";
    }

    botReply(reply);
}

// ====== VOICE OUTPUT ======
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speechSynthesis.speak(speech);
}

// ====== VOICE INPUT ======
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        sendMessage();
    };
}
