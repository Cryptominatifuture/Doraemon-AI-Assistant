const micBtn = document.getElementById("micBtn");
const statusText = document.getElementById("status");
const mouth = document.querySelector(".mouth");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";
recognition.interimResults = false;

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "hi-IN";
  speech.rate = 0.95;
  speech.pitch = 1.25;

  mouth.style.borderBottomWidth = "6px";
  speech.onend = () => mouth.style.borderBottomWidth = "3px";

  window.speechSynthesis.speak(speech);
}

recognition.onstart = () => {
  statusText.innerText = "Sun raha hoon 👂";
};

recognition.onresult = (event) => {
  const msg = event.results[0][0].transcript.toLowerCase();
  statusText.innerText = "Aap: " + msg;
  reply(msg);
};

function reply(msg) {
  let res = "Main samajh nahi paaya 😅 phir se bolo";

  if (msg.includes("hello") || msg.includes("hi")) {
    res = "Hello! Main Doraemon AI hoon 😄";
  } 
  else if (msg.includes("time")) {
    res = "Abhi time hai " + new Date().toLocaleTimeString();
  }
  else if (msg.includes("date")) {
    res = "Aaj ki date hai " + new Date().toDateString();
  }
  else if (msg.includes("tum kya kar sakte ho")) {
    res = "Main aapse baat kar sakta hoon, sawaal ka jawab de sakta hoon 💙";
  }
  else if (msg.includes("thank")) {
    res = "Arre koi baat nahi 😄";
  }

  speak(res);
}

micBtn.onclick = () => recognition.start();