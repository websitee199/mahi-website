// 3D Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('bg')});
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < 5000; i++) {
    vertices.push(
        THREE.MathUtils.randFloatSpread(2000),
        THREE.MathUtils.randFloatSpread(2000),
        THREE.MathUtils.randFloatSpread(2000)
    );
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({ color: 0x00c6ff });
const particles = new THREE.Points(geometry, material);

scene.add(particles);
camera.position.z = 500;

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize",()=>{
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
});

// Chat Toggle
function toggleChat(){
let chat = document.getElementById("chatBox");
chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}

// AI Typing Effect
function typeEffect(text){
let chat = document.getElementById("chatMessages");
let msg = document.createElement("div");
chat.appendChild(msg);

let i = 0;
function typing(){
if(i < text.length){
msg.innerHTML += text.charAt(i);
i++;
setTimeout(typing, 30);
}
}
typing();
}

// Send Message
function sendMessage(){
let input = document.getElementById("userInput");
let message = input.value.trim();
if(message === "") return;

let chat = document.getElementById("chatMessages");
chat.innerHTML += "<div><b>You:</b> " + message + "</div>";

let reply = "Thanks for reaching out! I will respond shortly.";

if(message.toLowerCase().includes("hello"))
reply = "Hello 👋 Welcome to mahesh  3D portfolio!";
if(message.toLowerCase().includes("project"))
reply = "I specialize in 3D Cloud & SAP Analytics projects.";
if(message.toLowerCase().includes("contact"))
reply = "Please click the Contact Me button to fill the form.";

typeEffect("Bot: " + reply);

chat.scrollTop = chat.scrollHeight;
input.value = "";
}

// Google Form Redirect
function openForm(){
window.open("https://forms.gle/S9LiHaBHiFqsU85H8", "_blank");
}
