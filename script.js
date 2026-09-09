// ================================
// ELEMENTS & VARIABLES
// ================================

const screens = [...document.querySelectorAll(".screen")];
const progress = document.getElementById("progressBar");
const hearts = document.getElementById("hearts");

let current = 0;
let noClicks = 0;


// ================================
// NO BUTTON MESSAGES
// ================================

const noMessages = [
  "Arey sun toh le yaar 😭",
  "Ek baar sunne mein kya jaa raha hai tera? 👀",
  "Itna attitude? Abhi toh tera game bajana padega. 😂💀",
  "Ab bas kar bhai... aur bada hua na toh screen se bahar aa jaunga! 😭💀",
  "Theek hai... ab drama band kar aur Haan dabaa. 🤨🩷"
];


// ================================
// SCREEN NAVIGATION
// ================================

function showScreen(index) {

  if (index < 0 || index >= screens.length) return;

  screens[current].classList.remove("active");

  current = index;

  screens[current].classList.add("active");

  if (progress) {
    progress.style.width =
      `${((current + 1) / screens.length) * 100}%`;
  }

  spawnHearts(7);
}


function nextScreen() {

  if (current < screens.length - 1) {
    showScreen(current + 1);
  }

}


// NEXT BUTTONS

document.querySelectorAll(".next").forEach(btn => {

  btn.addEventListener("click", nextScreen);

});


// ================================
// YES / NO SECTION
// ================================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noMessage = document.getElementById("noMessage");


if (noBtn && yesBtn) {

  noBtn.addEventListener("click", () => {

    noClicks++;

    const yesScale = Math.min(
      1 + noClicks * 0.18,
      2.15
    );

    yesBtn.style.transform =
      `scale(${yesScale})`;

    yesBtn.style.zIndex = 2;


    const noScale = Math.max(
      1 - noClicks * 0.06,
      0.7
    );


    noBtn.style.transform =
      `scale(${noScale}) rotate(${
        noClicks % 2 ? -3 : 3
      }deg)`;


    if (noMessage) {

      noMessage.textContent =
        noMessages[
          Math.min(
            noClicks - 1,
            noMessages.length - 1
          )
        ];

    }


    spawnHearts(10);

  });

}


// YES BUTTON

if (yesBtn) {

  yesBtn.addEventListener("click", () => {

    showScreen(1);

  });

}


// ================================
// DEPENDS BUTTON
// ================================

const dependsBtn =
  document.getElementById("dependsBtn");


if (dependsBtn) {

  dependsBtn.addEventListener("click", () => {

    const dependsMessage =
      document.getElementById("dependsMessage");


    if (dependsMessage) {

      dependsMessage.textContent =
        "Dekh confidence already low hai mera. 😭";

    }


    dependsBtn.animate(

      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(-4deg)" },
        { transform: "rotate(4deg)" },
        { transform: "rotate(0deg)" }
      ],

      {
        duration: 400
      }

    );

  });

}


// ================================
// REVEAL SECTION
// ================================

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


const revealText =
  document.getElementById("revealText");


const revealBtn =
  document.getElementById("revealBtn");


if (revealBtn && revealText) {

  revealBtn.addEventListener("click", () => {

    revealIndex++;


    if (revealIndex >= revealLines.length) {

      showScreen(5);

      return;

    }


    revealText.textContent =
      revealLines[revealIndex];


    revealText.animate(

      [
        {
          opacity: 0,
          transform: "translateY(10px)"
        },

        {
          opacity: 1,
          transform: "none"
        }
      ],

      {
        duration: 350
      }

    );

  });

}


// ================================
// FINAL RESPONSE DATA
// ================================

const finalMessages = {

  like:

    "WAIT... Ruk. Main itni jaldi emotionally prepare nahi tha. 😭❤️<br><br>" +
    "Best plot twist ever.",


  time:

    "Bilkul. Take your time. ❤️<br><br>" +
    "Main yahan panic nahi kar raha...<br>" +
    "<i>(100% panic kar raha hoon.)</i> 😂",


  friend:

    "Ye answer honestly expected bhi tha. 💀<br><br>" +
    "But still... tu meri favourite pagal insaan rahegi. 🫶"

};


const responseLabels = {

  like:
    "Okay... I think I Love you too. 🥹❤️",


  time:
    "Mujhe time chahiye. 💜",


  friend:
    "Pagal hai tu 😂"

};


// ================================
// NORMALIZE CHOICE
// ================================

function normalizeChoice(choice) {

  if (!choice) return null;


  const value =
    choice.toString().trim().toLowerCase();


  // Accept different versions

  const choiceMap = {

    love: "like",

    like: "like",

    time: "time",

    friend: "friend"

  };


  return choiceMap[value] || null;

}


// ================================
// SEND RESPONSE
// ================================

function sendResponse(choiceKey) {


  // Normalize choice

  choiceKey =
    normalizeChoice(choiceKey);


  // Stop if invalid

  if (!choiceKey) {

    console.error(
      "Invalid choice selected."
    );

    return;

  }


  const answer =
    responseLabels[choiceKey];


  // Extra safety

  if (!answer) {

    console.error(
      "Answer not found for:",
      choiceKey
    );

    return;

  }


  const currentTime =
    new Date().toLocaleString(
      "en-IN",
      {
        timeZone: "Asia/Kolkata"
      }
    );


  // WhatsApp message

  const message =

    `💌 New response from What-I-Feel\n\n` +

    `Answer: ${answer}\n` +

    `Option: ${choiceKey}\n\n` +

    `Time: ${currentTime}`;


  // ================================
  // SEND EMAIL
  // ================================

  fetch(
    "https://formsubmit.co/ajax/vipulkatamble07@gmail.com",

    {

      method: "POST",


      headers: {

        "Content-Type":
          "application/json",

        "Accept":
          "application/json"

      },


      body:

        JSON.stringify({

          subject:
            "💌 New What-I-Feel Response",


          answer:
            answer,


          option:
            choiceKey,


          submitted_at:
            currentTime

        })

    }

  )

  .then(response => response.json())

  .then(data => {

    console.log(
      "Email response:",
      data
    );

  })

  .catch(error => {

    console.error(
      "Email error:",
      error
    );

  });


  // ================================
  // OPEN WHATSAPP
  // ================================

  const whatsappNumber =
    "919148265307";


  const whatsappURL =

    `https://wa.me/${whatsappNumber}` +

    `?text=${encodeURIComponent(message)}`;


  window.open(
    whatsappURL,
    "_blank"
  );

}


// ================================
// FINAL CHOICE BUTTONS
// ================================

document
  .querySelectorAll(".choice")
  .forEach(choice => {


    choice.addEventListener(
      "click",

      () => {


        const rawChoice =
          choice.dataset.choice;


        const selectedChoice =
          normalizeChoice(rawChoice);


        // IMPORTANT:
        // Ignore invalid choice buttons

        if (
          !selectedChoice ||
          !finalMessages[selectedChoice]
        ) {

          console.error(
            "Invalid button found:",
            rawChoice
          );

          return;

        }


        // Show final message

        const finalMessage =
          document.getElementById(
            "finalMessage"
          );


        if (finalMessage) {

          finalMessage.innerHTML =
            finalMessages[
              selectedChoice
            ];


          finalMessage.classList.remove(
            "hidden"
          );

        }


        // Disable ALL valid buttons

        document
          .querySelectorAll(".choice")
          .forEach(c => {

            c.disabled = true;

          });


        // Show restart button

        const restart =
          document.getElementById(
            "restart"
          );


        if (restart) {

          restart.classList.remove(
            "hidden"
          );

        }


        // Hearts

        spawnHearts(30);


        // Send response

        sendResponse(
          selectedChoice
        );

      }

    );


  });


// ================================
// RESTART
// ================================

const restartBtn =
  document.getElementById("restart");


if (restartBtn) {

  restartBtn.addEventListener(
    "click",

    () => {

      location.reload();

    }

  );

}


// ================================
// FLOATING HEARTS
// ================================

function spawnHearts(count = 5) {


  if (!hearts) return;


  const symbols = [

    "♥",

    "♡",

    "✦",

    "✧",

    "💗"

  ];


  for (
    let i = 0;
    i < count;
    i++
  ) {


    const el =
      document.createElement(
        "span"
      );


    el.className =
      "float-heart";


    el.textContent =

      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    el.style.left =
      Math.random() * 100 + "%";


    el.style.fontSize =

      (
        12 +
        Math.random() * 18
      ) + "px";


    el.style.animationDuration =

      (
        4 +
        Math.random() * 5
      ) + "s";


    hearts.appendChild(el);


    setTimeout(

      () => el.remove(),

      9500

    );

  }

}


// ================================
// INITIAL HEARTS
// ================================

setInterval(
  () => spawnHearts(2),
  1800
);


spawnHearts(12);
