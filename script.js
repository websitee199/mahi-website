/* ⭐ Hover Text */

const cards = document.querySelectorAll(".icon-card");
const info = document.getElementById("infoText");

cards.forEach(card=>{
  card.onmouseenter = () => info.textContent = card.dataset.text;
  card.onmouseleave = () => info.textContent = "Hover an icon";
});

/* 🚀 Redirect */

function goPage(url){
  const loader = document.getElementById("loader");
  loader.classList.add("show");

  setTimeout(()=> location.href = url, 100);
}

/* 🔊 Voice Message */

const message =
"Hey user, welcome to Work Force. Your search should stop here. Here are your end to end solutions.";

function speakMessage(){

  const speech = new SpeechSynthesisUtterance(message);

  const voices = speechSynthesis.getVoices();

  const femaleVoice =
    voices.find(v => v.name.includes("Female")) ||
    voices.find(v => v.name.includes("Google UK English Female")) ||
    voices[0];

  speech.voice = femaleVoice;
  speech.rate = 0.95;
  speech.pitch = 1.2;

  speechSynthesis.speak(speech);
}

/* ✅ FIX: Auto greet after FIRST CLICK anywhere */

document.addEventListener("click", function firstClick(){
  speakMessage();
  document.removeEventListener("click", firstClick);
});
