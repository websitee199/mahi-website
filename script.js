// Countdown Timer
const countdownDate = new Date("Jan 17, 2026 09:00:00").getTime();

const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if(distance < 0){
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "The Reunion is Here!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24))/(1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
    const seconds = Math.floor((distance % (1000*60))/1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}, 1000);

// Google Form Button
function openGoogleForm(){
    window.open("https://forms.gle/YOUR_GOOGLE_FORM_LINK", "_blank");
}

// Chatbot
const messages = document.getElementById("chatbot-messages");

const botIntro = [
    "Hello! I am MAHI 🤖, your friendly assistant!",
    "Our reunion is on 17th Jan 2026, Saturday at Chittoor, Andhra Pradesh.",
    "The contact person is Mahesh Babu. Feel free to reach out!",
    "I can also guide you with the route to reach Chittoor.",
];

let botIndex = 0;

function showBotMessage(text){
    const div = document.createElement("div");
    div.classList.add("message", "bot-message");
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function showUserMessage(text){
    const div = document.createElement("div");
    div.classList.add("message", "user-message");
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function sendMessage(){
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if(!text) return;
    showUserMessage(text);
    input.value = "";

    setTimeout(() => {
        handleBotResponse(text.toLowerCase());
    }, 500);
}

// Initial Bot Messages
botIntro.forEach((msg, index) => {
    setTimeout(() => showBotMessage(msg), index * 1200);
});

function handleBotResponse(text){
    if(text.includes("venue") || text.includes("where")){
        showBotMessage("The reunion venue is in Chittoor, Andhra Pradesh. The exact location is on the map above.");
    } else if(text.includes("time") || text.includes("when")){
        showBotMessage("The event starts at 9:00 AM on 17th January 2026, Saturday.");
    } else if(text.includes("contact") || text.includes("person")){
        showBotMessage("You can contact Mahesh Babu for any queries regarding the reunion.");
    } else if(text.includes("route") || text.includes("how to reach")){
        showBotMessage("You can use the Google Map above to navigate to Chittoor from your location. Just click on Directions.");
    } else if(text.includes("hello") || text.includes("hi")){
        showBotMessage("Hello! Excited to see you at the reunion!");
    } else {
        showBotMessage("I'm here to help! You can ask me about the date, time, venue, contact person, or route to Chittoor.");
    }
}

