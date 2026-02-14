const botText = document.getElementById("botText");
const startBtn = document.getElementById("startBtn");

let userName = "";
let step = 0;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "en-US";

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
    botText.innerText = text;
}

window.onload = () => {
    setTimeout(() => {
        speak("Hi, what is your name?");
        step = 1;
    }, 1000);
};

startBtn.onclick = () => {
    recognition.start();
};

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;

    if (step === 1) {
        userName = transcript;
        speak("Nice to meet you " + userName + 
              ". Welcome to our newly launched website. " +
              "This platform is designed to provide interactive experiences, smart solutions, and modern digital services.");
        step = 2;
    }
};

