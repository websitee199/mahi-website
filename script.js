function openTab(id) {
  document.querySelectorAll(".section")
    .forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function assistantTalk() {
  const input = document.getElementById("userInput").value.toLowerCase();
  const avatar = document.getElementById("avatar");
  const reply = document.getElementById("reply");

  let text = "";

  if (input.includes("hello") || input.includes("hai")) {
    text = "Hello! Welcome to Mahesh Babu's newly launched interactive website.";
  } 
  else if (input.includes("website")) {
    text = "This website includes a modern design, voice assistant, 3D avatar, and interactive sections.";
  } 
  else {
    text = "I am your virtual assistant. Ask me about this website.";
  }

  avatar.classList.add("talking");
  reply.innerText = text;

  const speech = new SpeechSynthesisUtterance(text);
  speech.onend = () => avatar.classList.remove("talking");
  speechSynthesis.speak(speech);
}

