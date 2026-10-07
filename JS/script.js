function toggleAudio() {
  const bgMusic = document.getElementById("bgMusic");
  const musicIcon = document.getElementById("musicIcon");
  if (bgMusic.paused) {
    bgMusic.play();
    musicIcon.className = "fa-solid fa-music";
  } else {
    bgMusic.pause();
    musicIcon.className = "fa-solid fa-volume-xmark";
  }
}

const video = document.getElementById("bgVideo");
if (video) {
  video.addEventListener("timeupdate", function () {
    if (this.duration && this.currentTime >= this.duration - 0.15) {
      this.currentTime = 0;
      this.play();
    }
  });
}
function openRoyalEnvelopeSimple() {
  const envelopeBox = document.getElementById("envelopeBox");
  const envelopeOverlay = document.getElementById("royalEnvelope");
  const bgMusic = document.getElementById("bgMusic");
  const musicIcon = document.getElementById("musicIcon");

  if (bgMusic) {
    bgMusic.volume = 0.7;
    bgMusic
      .play()
      .then(() => {
        if (musicIcon) musicIcon.className = "fa-solid fa-music";
      })
      .catch((err) => {
        console.log("Audio play error", err);
      });
  }
  envelopeBox.classList.add("active-seal-glow");
  setTimeout(() => {
    envelopeBox.classList.add("opening");
  }, 900);

  setTimeout(() => {
    envelopeOverlay.style.display = "none";
  }, 1900);
}
window.addEventListener("DOMContentLoaded", function () {
  const bgVideo = document.querySelector(".bg-video");
  if (bgVideo) {
    bgVideo.style.opacity = 0;
    let opacityVal = 0;
    let fadeInInterval = setInterval(function () {
      opacityVal += 0.05;
      if (opacityVal >= 1) {
        opacityVal = 1;
        clearInterval(fadeInInterval);
      }
      if (window.scrollY === 0) {
        bgVideo.style.opacity = opacityVal;
      }
    }, 30);
  }
  startCountdown();
});

let musicStartedOnScroll = false;

function triggerAudioOnInteraction() {
  const bgMusic = document.getElementById("bgMusic");
  const musicIcon = document.getElementById("musicIcon");

  if (!musicStartedOnScroll && bgMusic) {
    bgMusic.volume = 0.7;
    bgMusic
      .play()
      .then(() => {
        musicIcon.className = "fa-solid fa-music";
        musicStartedOnScroll = true;
      })
      .catch((error) => {
        console.log("Autoplay prevented");
      });
  }
}

window.addEventListener("scroll", function () {
  triggerAudioOnInteraction();

  const bgVideo = document.querySelector(".bg-video");
  if (!bgVideo) return;

  let scrollPosition = window.scrollY;
  let windowHeight = window.innerHeight;

  if (scrollPosition < windowHeight) {
    let progress = scrollPosition / windowHeight;
    bgVideo.style.opacity = Math.max(1 - progress * 0.65, 0.35);
  } else {
    bgVideo.style.opacity = 0.35;
  }
});

window.addEventListener(
  "touchstart",
  function () {
    triggerAudioOnInteraction();
  },
  { once: true },
);

function startCountdown() {
  const weddingDate = new Date("October 20, 2026 20:00:00").getTime();
  setInterval(function () {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    if (distance < 0) {
      document.getElementById("days").innerText = "00";
      document.getElementById("hours").innerText = "00";
      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText =
      hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText =
      minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText =
      seconds < 10 ? "0" + seconds : seconds;
  }, 1000);
}
function sendToWhatsApp(event) {
  event.preventDefault();

  const name = document.getElementById("guestName").value;
  const count = document.getElementById("guestCount").value;
  const message = document.getElementById("guestMessage").value;
  const ownerPhoneNumber = "201145557775";
  let whatsappMessage =
    "تأكيد حضور حفل زفاف أحمد ونور%0a%0a" +
    "أهلاً بك، لقد تلقيت رداً جديداً من أحد المدعوين:%0a" +
    "-----------------------------------%0a" +
    "اسم الضيف الكريم: " +
    name +
    "%0a" +
    "عدد الحضور المؤكد: " +
    count +
    " أفراد%0a";

  if (message && message.trim() !== "") {
    whatsappMessage += 'رسالة التهنئة: "' + message + '"%0a';
  }

  whatsappMessage +=
    "-----------------------------------%0a" +
    "مبارك للعروسين وعقبال الفرحة الكبرى";

  alert(
    "تم تجهيز تأكيد الحضور بنجاح. سيتم تحويلك الآن لتطبيق الواتساب لإرسال الرسالة.",
  );

  const whatsappURL =
    "https://wa.me/" + ownerPhoneNumber + "?text=" + whatsappMessage;

  window.open(whatsappURL, "_blank");

  document.getElementById("rsvpForm").reset();
}
