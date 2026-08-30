const screens = [...document.querySelectorAll(".screen")];
const progress = document.getElementById("progressBar");
const hearts = document.getElementById("hearts");
let current = 0;
let noClicks = 0;

const noMessages = [
  "Arey sun toh le yaar 😭",
  "Ek baar sunne mein kya jaa raha hai tera? 👀",
  "Itna attitude? Main note kar raha hoon. ✍️😂",
  "YES button dekh... gym jaake bada ho gaya hai. 💪😭",
  "Theek hai... ab drama band kar aur Haan dabaa. 🤨🩷"
];

function showScreen(index) {
  screens[current].classList.remove("active");
  current = index;
  screens[current].classList.add("active");
  progress.style.width = `${((current + 1) / screens.length) * 100}%`;
  spawnHearts(7);
}

function nextScreen() {
  if (current < screens.length - 1) showScreen(current + 1);
}

document.querySelectorAll(".next").forEach(btn => btn.addEventListener("click", nextScreen));

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noMessage = document.getElementById("noMessage");

noBtn.addEventListener("click", () => {
  noClicks++;
  const scale = Math.min(1 + noClicks * .18, 2.15);
  yesBtn.style.transform = `scale(${scale})`;
  yesBtn.style.zIndex = 2;
  noBtn.style.transform = `scale(${Math.max(1 - noClicks * .06, .7)}) rotate(${noClicks % 2 ? -3 : 3}deg)`;
  noMessage.textContent = noMessages[Math.min(noClicks - 1, noMessages.length - 1)];
  spawnHearts(10);
});

yesBtn.addEventListener("click", () => {
  showScreen(1);
});

const dependsBtn = document.getElementById("dependsBtn");
dependsBtn.addEventListener("click", () => {
  document.getElementById("dependsMessage").textContent = "Dekh confidence already low hai mera. 😭";
  dependsBtn.animate([
    {transform:"rotate(0deg)"},{transform:"rotate(-4deg)"},{transform:"rotate(4deg)"},{transform:"rotate(0deg)"}
  ], {duration:400});
});

const revealLines = [
  '"Best friend hai bas."',
  '"Achi friend hai."',
  '"Yaar iske message ka wait kyun kar raha hoon?" 🤡',
  '"Ye online aayi kya?" 👀',
  '"Aaj reply late kyun hai?" 😭',
  '"Okay... I think I like her." ❤️',
  '"Nahi... I don\'t just like her."'
];
let revealIndex = 0;
const revealText = document.getElementById("revealText");
document.getElementById("revealBtn").addEventListener("click", () => {
  revealIndex++;
  if (revealIndex >= revealLines.length) {
    showScreen(5);
    return;
  }
  revealText.textContent = revealLines[revealIndex];
  revealText.animate([{opacity:0, transform:"translateY(10px)"},{opacity:1, transform:"none"}], {duration:350});
});

const finalMessages = {
  like: "WAIT... Ruk. Main itni jaldi emotionally prepare nahi tha. 😭❤️<br><br>Best plot twist ever.",
  time: "Bilkul. Take your time. ❤️<br><br>Main yahan panic nahi kar raha...<br><i>(100% panic kar raha hoon.)</i> 😂",
  friend: "Ye answer honestly expected bhi tha. 💀<br><br>But still... tu meri favourite pagal insaan rahegi. 🫶"
};

const responseEmail = "vipulkatamble07@gmail.com";

const responseLabels = {
  like: "Okay... I think I like you too. 🥹❤️",
  time: "Mujhe time chahiye. 💜",
  friend: "Pagal hai tu 😂"
};

function sendResponse(choiceKey) {

  // Convert "Love" from HTML into "like" for the JavaScript data
  if (choiceKey === "Love") {
    choiceKey = "like";
  }

  const answer = responseLabels[choiceKey];

  const message =
    `💌 New response from What-I-Feel\n\n` +
    `Answer: ${answer}\n` +
    `Option: ${choiceKey}\n\n` +
    `Time: ${new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata"
    })}`;

  // =========================
  // 1. SEND EMAIL AUTOMATICALLY
  // =========================

  fetch("https://formsubmit.co/ajax/vipulkatamble07@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      subject: "💌 New What-I-Feel Response",
      answer: answer,
      option: choiceKey,
      submitted_at: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata"
      })
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Email sent:", data);
  })
  .catch(error => {
    console.error("Email error:", error);
  });


  // =========================
  // 2. OPEN WHATSAPP
  // =========================

  const whatsappNumber = "919148265307";

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
}
document.querySelectorAll(".choice").forEach(choice => {
  choice.addEventListener("click", () => {
    const selectedChoice = choice.dataset.choice;

    document.getElementById("finalMessage").innerHTML = finalMessages[selectedChoice];
    document.getElementById("finalMessage").classList.remove("hidden");
    document.querySelectorAll(".choice").forEach(c => c.disabled = true);
    document.getElementById("restart").classList.remove("hidden");
    spawnHearts(30);

    // Send the selected answer to the owner's email in the background.
    sendResponse(selectedChoice);
  });
});

document.getElementById("restart").addEventListener("click", () => location.reload());

function spawnHearts(count = 5) {
  const symbols = ["♥","♡","✦","✧","💗"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "float-heart";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = (12 + Math.random() * 18) + "px";
    el.style.animationDuration = (4 + Math.random() * 5) + "s";
    hearts.appendChild(el);
    setTimeout(() => el.remove(), 9500);
  }
}
setInterval(() => spawnHearts(2), 1800);
spawnHearts(12);
