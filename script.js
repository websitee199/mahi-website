// Tabs
function showTab(id){
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// 3D Particle Universe
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('bg'), alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for(let i=0;i<particlesCount*3;i++){
  posArray[i] = (Math.random() - 0.5) * 200;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({size:0.7});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

function animate(){
  requestAnimationFrame(animate);
  particlesMesh.rotation.y += 0.0008;
  renderer.render(scene, camera);
}
animate();

// Chat
const chatIcon = document.getElementById("chatIcon");
const chatbot = document.getElementById("chatbot");
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const bgMusic = document.getElementById("bgMusic");

let userName = localStorage.getItem("mbkUser") || "";
let started = false;

chatIcon.onclick = () => {
  chatbot.style.display = chatbot.style.display === "block" ? "none" : "block";
};

function typeEffect(text, callback){
  let i = 0;
  const div = document.createElement("div");
  chatBody.appendChild(div);

  const interval = setInterval(()=>{
    div.textContent += text[i];
    i++;
    if(i >= text.length){
      clearInterval(interval);
      if(callback) callback();
    }
  }, 25);
}

function speak(text){
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}

document.addEventListener("click", function init(){
  if(started) return;
  started = true;

  chatbot.style.display = "block";
  bgMusic.volume = 0.2;
  bgMusic.play().catch(()=>{});

  if(userName){
    const greetBack = "Welcome back " + userName;
    typeEffect(greetBack);
    speak(greetBack);
  } else {
    const greeting = "Welcome to MBK Motivation. What is your name?";
    typeEffect(greeting);
    speak(greeting);
  }

  document.removeEventListener("click", init);
});

userInput.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    if(!userName){
      userName = userInput.value;
      localStorage.setItem("mbkUser", userName);
      const reply = "Nice to meet you " + userName;
      typeEffect(reply);
      speak(reply);
    } else {
      const reply = "Stay motivated " + userName;
      typeEffect(reply);
      speak(reply);
    }
    userInput.value = "";
  }
});
