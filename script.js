const memories = [
  { file: "assets/photos/photo-01.jpg", title: "The beginning", caption: "one of my favorite moments.", date: "OUR MEMORY" },
  { file: "assets/photos/photo-02.jpg", title: "That smile", caption: "you looked beautiful that day.", date: "OUR MEMORY" },
  { file: "assets/photos/photo-03.jpg", title: "Just us", caption: "small moment, big memory.", date: "OUR MEMORY" },
  { file: "assets/photos/photo-04.jpg", title: "A favorite day", caption: "another memory I want to keep.", date: "OUR MEMORY" },
  { file: "assets/photos/photo-05.jpg", title: "Little things", caption: "the little things stay with me.", date: "OUR MEMORY" },
  { file: "assets/photos/photo-06.jpg", title: "With you", caption: "ordinary days feel different with you.", date: "OUR MEMORY" },
  { file: "assets/photos/photo-07.jpg", title: "Still choosing you", caption: "a quiet promise, for every day.", date: "OUR MEMORY" },
  { file: "assets/photos/photo-08.jpg", title: "Happy birthday", caption: "today is your day.", date: "31.12.2004" }
];

const letterText = `Dinda,

Selamat ulang tahun.

Aku mungkin tidak selalu pandai mengatakan apa yang aku rasakan secara langsung, jadi kali ini aku ingin menuliskannya di sini.

Terima kasih sudah hadir, menjadi bagian dari cerita ini, dan untuk semua hal kecil yang mungkin tidak kamu sadari begitu berarti buat aku.

Aku tidak tahu akan sejauh apa perjalanan kita nanti, tapi untuk sekarang, aku cuma ingin kamu tahu...

I'm really happy that I met you.

Happy birthday, Dinda.
I love you.

— Fauzia`;
const opening = document.getElementById("opening");
const mainContent = document.getElementById("mainContent");
const accessStep = document.getElementById("accessStep");
const codeStep = document.getElementById("codeStep");
const grantedStep = document.getElementById("grantedStep");
const enterSecret = document.getElementById("enterSecret");
const codeForm = document.getElementById("secretCodeForm");
const codeInputs = document.getElementById("codeInputs");
const codeDigits = [...document.querySelectorAll(".code-digit")];
const codeError = document.getElementById("codeError");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicPill = document.getElementById("musicPill");
const musicStatus = document.getElementById("musicStatus");
const vinyl = document.querySelector(".vinyl");
const musicProgress = document.getElementById("musicProgress");
const musicCurrentTime = document.getElementById("musicCurrentTime");
const musicDuration = document.getElementById("musicDuration");
const musicVolume = document.getElementById("musicVolume");
let musicUnavailable = false;
const countdownDays = document.getElementById("countdownDays");
const countdownHours = document.getElementById("countdownHours");
const countdownMinutes = document.getElementById("countdownMinutes");
const countdownSeconds = document.getElementById("countdownSeconds");
const countdownMessage = document.getElementById("countdownMessage");

function updateBirthdayCountdown() {
  const now = new Date();
  const isBirthday = now.getMonth() === 11 && now.getDate() === 31;
  const birthday = new Date(now.getFullYear(), 11, 31);
  if (!isBirthday && now > birthday) birthday.setFullYear(birthday.getFullYear() + 1);

  const remaining = isBirthday ? 0 : Math.max(0, birthday.getTime() - now.getTime());
  const totalSeconds = Math.floor(remaining / 1000);
  countdownDays.textContent = String(Math.floor(totalSeconds / 86400)).padStart(3, "0");
  countdownHours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0");
  countdownMinutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  countdownSeconds.textContent = String(totalSeconds % 60).padStart(2, "0");
  countdownMessage.textContent = isBirthday ? "Hari ini hari spesialmu, Dinda." : "";
}

updateBirthdayCountdown();
setInterval(updateBirthdayCountdown, 1000);

enterSecret.addEventListener("click", () => {
  accessStep.classList.add("hidden");
  codeStep.classList.remove("hidden");
  codeDigits[0].focus();
});

codeDigits.forEach((input, index) => {
  input.addEventListener("input", () => {
    const digits = input.value.replace(/\D/g, "");
    if (digits.length > 1) {
      digits.slice(0, codeDigits.length - index).split("").forEach((digit, offset) => {
        codeDigits[index + offset].value = digit;
      });
      codeDigits[Math.min(index + digits.length, codeDigits.length - 1)].focus();
      codeError.textContent = "";
      return;
    }
    input.value = digits;
    if (input.value && index < codeDigits.length - 1) codeDigits[index + 1].focus();
    codeError.textContent = "";
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Backspace" && !input.value && index > 0) {
      codeDigits[index - 1].focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      codeDigits[index - 1].focus();
    } else if (event.key === "ArrowRight" && index < codeDigits.length - 1) {
      event.preventDefault();
      codeDigits[index + 1].focus();
    }
  });
  input.addEventListener("paste", event => {
    event.preventDefault();
    const pastedDigits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, codeDigits.length - index);
    pastedDigits.split("").forEach((digit, digitIndex) => {
      codeDigits[index + digitIndex].value = digit;
    });
    codeDigits[Math.min(index + pastedDigits.length, codeDigits.length - 1)].focus();
    codeError.textContent = "";
  });
});

function openDashboard() {
  opening.classList.add("hidden");
  mainContent.classList.remove("hidden");
  document.body.classList.remove("locked");
  window.scrollTo(0, 0);
  window.setTimeout(() => {
    revealAllVisible();
    updateMemory();
  }, 150);
}

codeForm.addEventListener("submit", event => {
  event.preventDefault();
  const enteredCode = codeDigits.map(input => input.value).join("");
  if (enteredCode !== "3112") {
    codeError.textContent = "Not quite...\nTry the code I gave you.";
    codeInputs.classList.remove("shake");
    void codeInputs.offsetWidth;
    codeInputs.classList.add("shake");
    const firstEmpty = codeDigits.find(input => !input.value);
    (firstEmpty || codeDigits[0]).focus();
    window.setTimeout(() => codeInputs.classList.remove("shake"), 500);
    return;
  }

  codeError.textContent = "";
  sessionStorage.setItem("birthdayUnlocked", "true");
  codeStep.classList.add("hidden");
  grantedStep.classList.remove("hidden");
  window.setTimeout(() => {
    grantedStep.classList.add("hidden");
    openDashboard();
  }, 1500);
});

const navToggle = document.getElementById("navToggle");
const siteNavigation = document.getElementById("siteNavigation");
navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  siteNavigation.classList.toggle("open", !expanded);
});
siteNavigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  siteNavigation.classList.remove("open");
}));

function setMusicUI(playing) {
  musicToggle.textContent = playing ? "Ⅱ" : "▶";
  musicToggle.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  musicStatus.textContent = playing ? "now playing" : musicUnavailable ? "music unavailable" : "music off";
  if (playing) musicUnavailable = false;
  musicPill.classList.toggle("playing", playing);
  vinyl.classList.toggle("playing", playing);
}

musicToggle.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
    } catch (error) {
      musicUnavailable = true;
      setMusicUI(false);
      musicStatus.textContent = "audio could not be played";
      console.warn("Music could not be played.", error);
    }
  } else {
    bgMusic.pause();
  }
});

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function updateMusicProgress() {
  const duration = bgMusic.duration;
  musicCurrentTime.textContent = formatTime(bgMusic.currentTime);
  musicDuration.textContent = formatTime(duration);
  musicProgress.value = Number.isFinite(duration) && duration > 0
    ? String((bgMusic.currentTime / duration) * 100)
    : "0";
}

musicProgress.addEventListener("input", () => {
  if (Number.isFinite(bgMusic.duration) && bgMusic.duration > 0) {
    bgMusic.currentTime = (Number(musicProgress.value) / 100) * bgMusic.duration;
  }
});
musicVolume.addEventListener("input", () => {
  bgMusic.volume = Number(musicVolume.value);
});
bgMusic.volume = Number(musicVolume.value);
bgMusic.addEventListener("play", () => setMusicUI(true));
bgMusic.addEventListener("pause", () => setMusicUI(false));
bgMusic.addEventListener("timeupdate", updateMusicProgress);
bgMusic.addEventListener("loadedmetadata", updateMusicProgress);
bgMusic.addEventListener("durationchange", updateMusicProgress);
bgMusic.addEventListener("error", () => {
  musicUnavailable = true;
  setMusicUI(false);
  musicStatus.textContent = "audio file unavailable";
});

// Cursor glow
const cursorGlow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

// Reveal on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
function revealAllVisible() {
  document.querySelectorAll(".reveal").forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight * .9) el.classList.add("visible");
  });
}

// Memories
const track = document.getElementById("memoryTrack");
const counter = document.getElementById("memoryCounter");
let current = 0;

function photoPlaceholder(index) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800"><rect width="600" height="800" fill="#292127"/><text x="50%" y="46%" text-anchor="middle" fill="#d99aa8" font-family="Georgia" font-size="42">PHOTO ${String(index + 1).padStart(2, "0")}</text><text x="50%" y="53%" text-anchor="middle" fill="#a99ba0" font-family="Arial" font-size="18">replace photo-${String(index + 1).padStart(2, "0")}.jpg</text></svg>`)}`;
}

memories.forEach((m, i) => {
  const card = document.createElement("article");
  const fallbackPhoto = photoPlaceholder(i);
  card.className = "memory-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Open memory ${i + 1}: ${m.title}`);
  card.style.setProperty("--rot", `${[-2,1,-1.2,1.5,-1,1.2,-1.4,.8][i]}deg`);
  card.innerHTML = `
    <img src="${m.file}" alt="${m.title}" loading="lazy"
      onerror="this.onerror=null;this.src='${fallbackPhoto}'">
    <div class="memory-card-info">
      <span>${String(i+1).padStart(2,"0")} · ${m.date}</span>
      <h3>${m.title}</h3>
      <p>${m.caption}</p>
    </div>`;
  card.addEventListener("click", () => openMemory(i));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMemory(i);
    }
  });
  track.appendChild(card);
});

function updateMemory() {
  const cards = [...track.children];
  if (!cards.length) return;
  const cardWidth = cards[0].getBoundingClientRect().width + 22;
  const viewport = document.getElementById("memoryStage").getBoundingClientRect().width;
  const maxOffset = Math.max(0, track.scrollWidth - viewport);
  const target = Math.min(current * cardWidth, maxOffset);
  track.style.transform = `translateX(-${target}px)`;
  counter.textContent = `${String(current+1).padStart(2,"0")} / 08`;
}
document.getElementById("nextMemory").addEventListener("click", () => {
  current = Math.min(current + 1, memories.length - 1);
  updateMemory();
});
document.getElementById("prevMemory").addEventListener("click", () => {
  current = Math.max(current - 1, 0);
  updateMemory();
});
window.addEventListener("resize", updateMemory);

document.addEventListener("keydown", e => {
  if (mainContent.classList.contains("hidden")) return;
  if (e.target instanceof HTMLElement && e.target.closest("input, textarea, select, button, a, [contenteditable='true']")) {
    if (e.key !== "Escape") return;
  }
  if (e.key === "ArrowRight") { current = Math.min(current + 1, 7); updateMemory(); }
  if (e.key === "ArrowLeft") { current = Math.max(current - 1, 0); updateMemory(); }
  if (e.key === "Escape") { closeAllModals(); }
});

// Touch swipe
let touchStartX = 0;
const stage = document.getElementById("memoryStage");
stage.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].clientX, {passive:true});
stage.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    current += dx < 0 ? 1 : -1;
    current = Math.max(0, Math.min(7, current));
    updateMemory();
  }
}, {passive:true});

// Modal
const memoryModal = document.getElementById("memoryModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCaption = document.getElementById("modalCaption");
const modalIndex = document.getElementById("modalIndex");
let selectedMemory = 0;

function openMemory(i) {
  selectedMemory = i;
  const m = memories[i];
  modalImage.src = m.file;
  modalImage.onerror = () => {
    modalImage.onerror = null;
    modalImage.src = photoPlaceholder(i);
  };
  modalImage.alt = m.title;
  modalTitle.textContent = m.title;
  modalCaption.textContent = m.caption;
  modalIndex.textContent = `${String(i+1).padStart(2,"0")} · ${m.date}`;
  memoryModal.classList.add("open");
  memoryModal.setAttribute("aria-hidden","false");
}
function closeMemory() {
  memoryModal.classList.remove("open");
  memoryModal.setAttribute("aria-hidden","true");
}
document.querySelectorAll('[data-close="memory"]').forEach(el => el.addEventListener("click", closeMemory));

// Download high-res memory card as PNG
document.getElementById("downloadMemory").addEventListener("click", async () => {
  const memoryIndex = selectedMemory;
  const m = memories[memoryIndex];
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = m.file;
  try { await img.decode(); } catch (_) {}
  const canvas = document.createElement("canvas");
  canvas.width = 1800;
  canvas.height = 2400;
  const ctx = canvas.getContext("2d");

  // paper
  ctx.fillStyle = "#f4eee8";
  ctx.fillRect(0,0,1800,2400);

  // subtle film background
  const grad = ctx.createRadialGradient(900,800,50,900,1000,1500);
  grad.addColorStop(0,"rgba(217,154,168,.11)");
  grad.addColorStop(1,"rgba(40,25,31,.02)");
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,1800,2400);

  // photo frame
  const x = 120, y = 150, w = 1560, h = 1620;
  ctx.fillStyle = "#1c1719";
  ctx.fillRect(x,y,w,h);

  // cover image with crop
  if (img.naturalWidth) {
    const scale = Math.max(w/img.naturalWidth, h/img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = x + (w-dw)/2;
    const dy = y + (h-dh)/2;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.clip();
    ctx.drawImage(img,dx,dy,dw,dh);
    ctx.restore();
  } else {
    ctx.fillStyle="#30262a";
    ctx.fillRect(x,y,w,h);
    ctx.fillStyle="#f4eee8";
    ctx.font="50px Georgia";
    ctx.textAlign="center";
    ctx.fillText("Add your photo",900,950);
  }

  // camera date stamp
  ctx.fillStyle = "rgba(255,255,255,.85)";
  ctx.font = "32px monospace";
  ctx.textAlign = "right";
  ctx.fillText(m.date, 1600, 1705);

  // caption
  ctx.fillStyle = "#24191d";
  ctx.textAlign = "left";
  ctx.font = "500 68px Georgia";
  ctx.fillText(m.title, 120, 1880);
  ctx.fillStyle = "#765f66";
  ctx.font = "32px Arial";
  wrapText(ctx, m.caption, 120, 1950, 1500, 48);

  // footer
  ctx.fillStyle = "#9a6c77";
  ctx.font = "28px monospace";
  ctx.letterSpacing = "4px";
  ctx.fillText("MUHAMMAD FAUZIA  ×  DINDA KHARNITA",120,2250);
  ctx.fillStyle = "#9b8a8f";
  ctx.font = "24px monospace";
  ctx.fillText("A LITTLE STORY  ·  MADE FOR YOU",120,2295);

  // film border
  ctx.strokeStyle = "rgba(70,50,55,.18)";
  ctx.lineWidth = 4;
  ctx.strokeRect(55,55,1690,2290);

  canvas.toBlob(blob => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fauzia-dinda-memory-${String(memoryIndex+1).padStart(2,"0")}.png`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
});

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else line = testLine;
  }
  ctx.fillText(line, x, y);
}

document.getElementById("printMemory").addEventListener("click", () => {
  window.print();
});

// Letter
const letterModal = document.getElementById("letterModal");
const envelope = document.getElementById("openLetter");
const typedLetter = document.getElementById("typedLetter");
let typed = false;
envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  letterModal.classList.add("open");
  letterModal.setAttribute("aria-hidden","false");
  if (!typed) {
    typeLetter();
    typed = true;
  }
});
document.querySelectorAll('[data-close="letter"]').forEach(el => el.addEventListener("click", () => {
  letterModal.classList.remove("open");
  letterModal.setAttribute("aria-hidden","true");
}));

function typeLetter() {
  typedLetter.textContent = "";
  let i = 0;
  const speed = 13;
  function step() {
    if (i < letterText.length) {
      typedLetter.textContent += letterText[i++];
      setTimeout(step, speed);
    }
  }
  step();
}
function closeAllModals() {
  closeMemory();
  letterModal.classList.remove("open");
  letterModal.setAttribute("aria-hidden","true");
}

// Initial memory state
updateMemory();
if (sessionStorage.getItem("birthdayUnlocked") === "true") {
  openDashboard();
}
