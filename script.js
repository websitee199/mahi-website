/* TAB SWITCH */
function tab(id){
document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

/* COUNTDOWN */
const eDate=new Date("Jan 17 2026 11:00:00").getTime();
setInterval(()=>{
let d=eDate-Date.now();
if(d>0){
document.getElementById("d").innerText=Math.floor(d/86400000);
document.getElementById("h").innerText=Math.floor(d%86400000/3600000);
document.getElementById("m").innerText=Math.floor(d%3600000/60000);
document.getElementById("s").innerText=Math.floor(d%60000/1000);
}
},1000);

/* TIMER VOICE */
function speakBox(type){
let id=type[0];
let val=document.getElementById(id).innerText;
speechSynthesis.cancel();
speechSynthesis.speak(new SpeechSynthesisUtterance(val+" "+type));
}

/* CHATBOT */
let opened=false;
function toggleBot(){
bot.style.display=opened?"none":"block";
opened=!opened;

if(opened){
let intro="Hi, I am Mahi, your reunion assistant. You can ask me about event details, venue, route to Chittoor, or registration help.";
add("bot",intro);
speechSynthesis.cancel();
speechSynthesis.speak(new SpeechSynthesisUtterance(intro));
}
}

function add(who,msg){
chatlog.innerHTML+=`<div class="chat ${who}">${msg}</div>`;
chatlog.scrollTop=9999;
}

function send(){
let m=chatInput.value.toLowerCase();
if(!m)return;

add("user",m);

let r="Sorry, I didn't understand.";
if(/event/.test(m)) r="The reunion is on seventeenth January two thousand twenty six.";
else if(/venue|place/.test(m)) r="The venue is PCR Auditorium, Chittoor.";
else if(/route|chittoor/.test(m)) r="You can reach Chittoor via Tirupati, Vellore or Bangalore.";
else if(/registration help|register/.test(m)) r="Please click on the Registration tab to fill the Google form.";

add("bot",r);
speechSynthesis.speak(new SpeechSynthesisUtterance(r));
chatInput.value="";
}

function listen(){
let r=new (webkitSpeechRecognition||SpeechRecognition)();
r.lang="en-IN";
r.start();
r.onresult=e=>{
chatInput.value=e.results[0][0].transcript;
send();
}
}

/* PARTICLES */
particlesJS("particles-js",{
particles:{number:{value:80},color:{value:"#2ecc71"},move:{speed:2}}
});

/* QR CODE */
new QRCode(document.getElementById("qrcode"),{
text:"BCA Reunion – PCR Chittoor – 17 Jan 2026",
width:150,
height:150
});


