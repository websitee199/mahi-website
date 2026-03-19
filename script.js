/* ⭐ Hover Text */

const cards = document.querySelectorAll(".icon-card");
const info = document.getElementById("infoText");

cards.forEach(card=>{
  card.onmouseenter = () => info.textContent = card.dataset.text;
  card.onmouseleave = () => info.textContent = "Hover an icon";
});

/* 🚀 Redirect with loader */

function goPage(url){
  const loader = document.getElementById("loader");
  loader.classList.add("show");

  setTimeout(()=> location.href = url, 100); // 0.10 sec
}

/* 🔊 Voice Greeting */

const message =
"Hey user, welcome to Work Force. Your search should stop here. Here are your end to end solutions.";

function speakMessage(){

  const speech = new SpeechSynthesisUtterance(message);

  const voices = speechSynthesis.getVoices();

  const femaleVoice =
    voices.find(v => v.name.includes("Female")) ||
    voices.find(v => v.name.includes("Google UK English Female")) ||
    voices[1];

  speech.voice = femaleVoice;
  speech.rate = 0.95;
  speech.pitch = 1.2;

  speechSynthesis.speak(speech);
}

/* Auto greet on page load */

window.onload = ()=>{
  setTimeout(speakMessage,700);
};
