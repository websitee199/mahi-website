// Chatbot container
const messages = document.getElementById("chatbot-messages");

// Web Speech API function
function speak(text){
    if('speechSynthesis' in window){
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1;
        speechSynthesis.speak(utterance);
    }
}

// Display bot message
function showBotMessage(text){
    const div = document.createElement("div");
    div.classList.add("message", "bot-message");
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    speak(text); // MAHI speaks
}

// Display user message
function showUserMessage(text){
    const div = document.createElement("div");
    div.classList.add("message", "user-message");
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

// Handle user input
function sendMessage(){
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if(!text) return;
    showUserMessage(text);
    input.value = "";

    setTimeout(() => {
        handleBotResponse(text.toLowerCase());
    }, 300); // small delay for realism
}

// Initial Bot Messages
const botIntro = [
    "Hello! I am MAHI, your friendly assistant!",
    "Our reunion is on 17th Jan 2026, Saturday at Chittoor, Andhra Pradesh.",
    "The contact person is Mahesh Babu. Feel free to reach out!",
    "I can also guide you with the route to reach Chittoor."
];

botIntro.forEach((msg, index) => {
    setTimeout(() => showBotMessage(msg), index * 1500);
});

// Bot Response Logic
function handleBotResponse(text){
    let reply = "I'm here to help! You can ask me about the date, time, venue, contact person, or route to Chittoor.";

    if(text.includes("venue") || text.includes("where")){
        reply = "The reunion venue is in Chittoor, Andhra Pradesh. The exact location is on the map above.";
    } else if(text.includes("time") || text.includes("when")){
        reply = "The event starts at 9:00 AM on 17th January 2026, Saturday.";
    } else if(text.includes("contact") || text.includes("person")){
        reply = "You can contact Mahesh Babu for any queries regarding the reunion.";
    } else if(text.includes("route") || text.includes("how to reach")){
        reply = "You can use the Google Map above to navigate to Chittoor from your location. Just click on Directions.";
    } else if(text.includes("hi") || text.includes("hello")){
        reply = "Hello! Excited to see you at the reunion!";
    }

    showBotMessage(reply);
}

