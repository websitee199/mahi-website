// -----------------------
// Countdown Timer
// -----------------------
const countdownEl = document.getElementById("countdown");
const eventDate = new Date("January 17, 2026 11:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if(distance < 0) {
        countdownEl.innerHTML = "The event has started!";
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);

    countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// -----------------------
// Mahi Voice Chatbot
// -----------------------
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const voiceBtn = document.getElementById("voice-btn");

// Basic responses
function getResponse(message) {
    message = message.toLowerCase();
    if(message.includes("hello") || message.includes("hi")) return "Hello! I'm Mahi. How can I help you?";
    if(message.includes("event") || message.includes("date")) return "The event is on 17 January 2026, Saturday at 11:00 AM in Chittoor.";
    if(message.includes("time")) return "The event starts at 11:00 AM.";
    if(message.includes("place") || message.includes("location") || message.includes("chittoor")) return "The event location is Chittoor.";
    return "Sorry, I didn't understand that. You can ask me about the event date, time, or location.";
}

// Display message and speak
function displayMessage(message, sender="Mahi") {
    const msgEl = document.createElement("p");
    msgEl.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(msgEl);
    chatBox.scrollTop = chatBox.scrollHeight;

    if(sender === "Mahi") {
        // Voice output
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
    }
}

// Send user message
function sendMessage() {
    const message = userInput.value.trim();
    if(!message) return;
    displayMessage(message, "You");
    userInput.value = "";
    const reply = getResponse(message);
    displayMessage(reply);
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(e) {
    if(e.key === "Enter") sendMessage();
});

// Voice input
voiceBtn.addEventListener("click", function() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        sendMessage();
    };
    recognition.onerror = function(event) {
        alert("Voice recognition error: " + event.error);
    }
});
