const memories = [
  { file: "assets/photos/photo-01.jpg", label: "A LITTLE MEMORY", date: "DATE TO ADD", title: "One of My Favorite Moments", caption: "Some moments deserve to stay forever.", story: "A small moment that became a memory I want to keep close to my heart." },
  { file: "assets/photos/photo-02.jpg", label: "A MOMENT TO KEEP", date: "DATE TO ADD", title: "A Page in Our Story", caption: "The simplest memories can mean the most.", story: "A little snapshot from our story, ready for the details only we can add." },
  { file: "assets/photos/photo-03.jpg", label: "A LITTLE MEMORY", date: "DATE TO ADD", title: "A Day to Remember", caption: "Some days leave a gentle warmth behind.", story: "A quiet page in this scrapbook, kept here for us to remember in our own words." },
  { file: "assets/photos/photo-04.jpg", label: "KEPT CLOSE", date: "DATE TO ADD", title: "A Favorite Little Moment", caption: "A lovely moment, saved just as it is.", story: "This photo holds a place in our album; add the real story behind it whenever you like." },
  { file: "assets/photos/photo-05.jpg", label: "A MOMENT TO KEEP", date: "DATE TO ADD", title: "Little Things, Dearly Kept", caption: "The little things are worth remembering.", story: "A small piece of our story, with room for the details that make it yours." },
  { file: "assets/photos/photo-06.jpg", label: "A LITTLE MEMORY", date: "DATE TO ADD", title: "A Moment in Time", caption: "A photograph, and a feeling to hold onto.", story: "A memory held in one frame. Replace this note with the moment's details when ready." },
  { file: "assets/photos/photo-07.jpg", label: "KEPT CLOSE", date: "DATE TO ADD", title: "Another Page of Us", caption: "Every page adds something to our story.", story: "A place for another memory, told in the way only we can tell it." },
  { file: "assets/photos/photo-08.jpg", label: "A LITTLE MEMORY", date: "DATE TO ADD", title: "A Story Still Unfolding", caption: "Here's to all the moments still to come.", story: "One more photo to keep close, with a story you can personalize whenever you wish." }
];

const letterText = `Selamat ulang tahun.

Aku mungkin tidak selalu pandai mengatakan apa yang aku rasakan secara langsung, jadi kali ini aku ingin menuliskannya di sini.

Terima kasih sudah hadir, menjadi bagian dari cerita ini, dan untuk semua hal kecil yang mungkin tidak kamu sadari begitu berarti buat aku.

Aku tidak tahu akan sejauh apa perjalanan kita nanti, tapi untuk sekarang, aku cuma ingin kamu tahu...

I'm really happy that I met you.

Happy birthday, my love.
I love you.`;
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
  countdownMessage.textContent = isBirthday ? "Hari ini hari spesialmu, sayang." : "";
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
  const revealDashboard = () => {
    opening.classList.add("hidden");
    opening.classList.remove("opening-leave", "access-success");
    mainContent.classList.remove("hidden");
    mainContent.classList.add("dashboard-enter");
    document.body.classList.remove("locked");
    window.scrollTo(0, 0);
    window.setTimeout(() => {
      mainContent.classList.remove("dashboard-enter");
      revealAllVisible();
      updateMemory();
    }, 950);
  };

  if (opening.classList.contains("access-success")) {
    opening.classList.add("opening-leave");
    window.setTimeout(revealDashboard, 650);
    return;
  }
  revealDashboard();
}

let pinFeedbackInProgress = false;
codeForm.addEventListener("submit", event => {
  event.preventDefault();
  if (pinFeedbackInProgress) return;
  const enteredCode = codeDigits.map(input => input.value).join("");
  if (enteredCode !== "3112") {
    pinFeedbackInProgress = true;
    codeError.textContent = "Not quite...\nTry again, sayang.";
    codeError.classList.add("visible");
    codeInputs.classList.remove("shake", "wrong");
    void codeInputs.offsetWidth;
    codeInputs.classList.add("shake", "wrong");
    window.setTimeout(() => {
      codeInputs.classList.remove("shake", "wrong");
      codeDigits.forEach(input => { input.value = ""; });
      codeDigits[0].focus();
      pinFeedbackInProgress = false;
    }, 520);
    return;
  }

  codeError.textContent = "";
  codeError.classList.remove("visible");
  codeInputs.classList.add("success");
  opening.classList.add("access-success");
  sessionStorage.setItem("birthdayUnlocked", "true");
  codeStep.classList.add("hidden");
  grantedStep.classList.remove("hidden");
  window.setTimeout(() => {
    grantedStep.classList.add("hidden");
    openDashboard();
  }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 900 : 3300);
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

const navigationLinks = [...siteNavigation.querySelectorAll("a[href^='#']")];
const sectionNavigationObserver = new IntersectionObserver(entries => {
  const visibleSections = entries.filter(entry => entry.isIntersecting);
  if (!visibleSections.length) return;

  const activeSection = visibleSections.reduce((closest, entry) =>
    Math.abs(entry.boundingClientRect.top - innerHeight * .3) <
      Math.abs(closest.boundingClientRect.top - innerHeight * .3)
      ? entry
      : closest
  );

  navigationLinks.forEach(link => {
    if (link.hash === `#${activeSection.target.id}`) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}, { rootMargin: "-25% 0px -65% 0px", threshold: 0 });

navigationLinks.forEach(link => {
  const section = document.querySelector(link.hash);
  if (section) sectionNavigationObserver.observe(section);
});

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
const scrapbookPage = document.getElementById("scrapbookPage");
const scrapbookImage = document.getElementById("scrapbookImage");
const scrapbookLabel = document.getElementById("scrapbookLabel");
const scrapbookDate = document.getElementById("scrapbookDate");
const scrapbookTitle = document.getElementById("scrapbookTitle");
const scrapbookQuote = document.getElementById("scrapbookQuote");
const scrapbookStory = document.getElementById("scrapbookStory");
const memoryStatus = document.getElementById("memoryStatus");
const memoryModal = document.getElementById("memoryModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCaption = document.getElementById("modalCaption");
const modalStory = document.getElementById("modalStory");
const modalIndex = document.getElementById("modalIndex");
let current = 0;

function photoPlaceholder(index) {
  const number = String(index + 1).padStart(2, "0");
  const title = memories[index].title;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800"><defs><linearGradient id="wash" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff8ee"/><stop offset=".52" stop-color="#fcecef"/><stop offset="1" stop-color="#f7d6df"/></linearGradient><linearGradient id="frame" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fffdf9"/><stop offset="1" stop-color="#fff6f2"/></linearGradient></defs><rect width="600" height="800" fill="url(#wash)"/><circle cx="80" cy="110" r="105" fill="#fff" opacity=".32"/><circle cx="550" cy="520" r="145" fill="#efa8bc" opacity=".12"/><rect x="54" y="62" width="492" height="676" rx="5" fill="url(#frame)" stroke="#c98298" stroke-opacity=".28" stroke-width="2"/><path d="M84 92h50M84 92v50M516 92h-50M516 92v50M84 708h50M84 708v-50M516 708h-50M516 708v-50" fill="none" stroke="#c98298" stroke-opacity=".38" stroke-width="2"/><text x="300" y="325" text-anchor="middle" fill="#c98298" font-family="Georgia,serif" font-size="94">♡</text><path d="M218 375h164" stroke="#c98298" stroke-opacity=".35"/><text x="300" y="423" text-anchor="middle" fill="#8a6672" font-family="Georgia,serif" font-size="27" font-style="italic">${title}</text><text x="300" y="680" text-anchor="middle" fill="#8a6672" font-family="Arial,sans-serif" font-size="13" letter-spacing="4">A MEMORY OF US</text><text x="300" y="711" text-anchor="middle" fill="#c98298" font-family="monospace" font-size="12" letter-spacing="3">${number} / 08</text></svg>`)}`;
}

memories.forEach((m, i) => {
  const button = document.createElement("button");
  const image = document.createElement("img");
  const label = document.createElement("span");
  const fallbackPhoto = photoPlaceholder(i);
  button.className = "memory-thumb";
  button.type = "button";
  button.setAttribute("aria-label", `Show memory ${i + 1}: ${m.title}`);
  image.src = m.file;
  image.alt = "";
  image.loading = "lazy";
  image.addEventListener("error", () => {
    image.src = fallbackPhoto;
  }, { once: true });
  label.textContent = String(i + 1).padStart(2, "0");
  button.append(image, label);
  button.addEventListener("click", () => showMemory(i));
  track.appendChild(button);
});

function updateMemory() {
  const memory = memories[current];
  const number = String(current + 1).padStart(2, "0");
  scrapbookLabel.textContent = memory.label;
  scrapbookDate.textContent = memory.date;
  scrapbookTitle.textContent = memory.title;
  scrapbookQuote.textContent = memory.caption;
  scrapbookStory.textContent = memory.story;
  scrapbookImage.alt = `${memory.title}, memory ${number} of 08`;
  scrapbookImage.onerror = () => {
    scrapbookImage.onerror = null;
    scrapbookImage.src = photoPlaceholder(current);
  };
  scrapbookImage.src = memory.file;
  counter.textContent = `${number} / 08`;
  [...track.children].forEach((button, index) => {
    button.classList.toggle("selected", index === current);
    button.setAttribute("aria-pressed", String(index === current));
    if (index === current) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });
  scrapbookPage.classList.remove("page-turn");
  void scrapbookPage.offsetWidth;
  scrapbookPage.classList.add("page-turn");
  if (memoryModal.classList.contains("open")) openMemory(current);
}

function showMemory(index) {
  current = Math.max(0, Math.min(memories.length - 1, index));
  updateMemory();
}
document.getElementById("nextMemory").addEventListener("click", () => {
  showMemory(current + 1);
});
document.getElementById("prevMemory").addEventListener("click", () => {
  showMemory(current - 1);
});
document.getElementById("memoryDetail").addEventListener("click", () => openMemory(current));

document.addEventListener("keydown", e => {
  if (mainContent.classList.contains("hidden")) return;
  if (e.target instanceof HTMLElement && e.target.closest("input, textarea, select, button, a, [contenteditable='true']") && !memoryModal.classList.contains("open")) {
    if (e.key !== "Escape") return;
  }
  if (e.key === "ArrowRight" && (memoryModal.classList.contains("open") || document.getElementById("memories").getBoundingClientRect().top < innerHeight && document.getElementById("memories").getBoundingClientRect().bottom > 0)) showMemory(current + 1);
  if (e.key === "ArrowLeft" && (memoryModal.classList.contains("open") || document.getElementById("memories").getBoundingClientRect().top < innerHeight && document.getElementById("memories").getBoundingClientRect().bottom > 0)) showMemory(current - 1);
  if (e.key === "Escape") { closeAllModals(); }
});

// Touch swipe
let touchStartX = 0;
const stage = document.getElementById("memoryStage");
stage.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].clientX, {passive:true});
stage.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) showMemory(current + (dx < 0 ? 1 : -1));
}, {passive:true});

// Modal
let selectedMemory = 0;

function openMemory(i) {
  selectedMemory = i;
  const m = memories[i];
  modalImage.onerror = () => {
    modalImage.onerror = null;
    modalImage.src = photoPlaceholder(i);
  };
  modalImage.src = m.file;
  modalImage.alt = m.title;
  modalTitle.textContent = m.title;
  modalCaption.textContent = m.caption;
  modalStory.textContent = m.story;
  modalIndex.textContent = `${String(i+1).padStart(2,"0")} · ${m.label} · ${m.date}`;
  memoryModal.classList.add("open");
  memoryModal.setAttribute("aria-hidden","false");
}
function closeMemory() {
  memoryModal.classList.remove("open");
  memoryModal.setAttribute("aria-hidden","true");
}
document.querySelectorAll('[data-close="memory"]').forEach(el => el.addEventListener("click", closeMemory));

// Download high-res memory card as PNG
async function downloadMemoryImage() {
  const memoryIndex = memoryModal.classList.contains("open") ? selectedMemory : current;
  const m = memories[memoryIndex];
  memoryStatus.textContent = "Preparing your scrapbook page…";
  const img = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => {
      image.onerror = () => reject(new Error("The memory image could not be loaded."));
      image.src = photoPlaceholder(memoryIndex);
    };
    image.src = m.file;
  });
  const canvas = document.createElement("canvas");
  canvas.width = 1800;
  canvas.height = 2400;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser could not create the scrapbook image.");

  ctx.fillStyle = "#FFF8EE";
  ctx.fillRect(0, 0, 1800, 2400);

  const grad = ctx.createRadialGradient(900, 800, 50, 900, 1000, 1500);
  grad.addColorStop(0, "rgba(239,168,188,.16)");
  grad.addColorStop(1, "rgba(201,130,152,.025)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1800, 2400);

  const x = 120, y = 155, w = 1560, h = 1500;
  ctx.fillStyle = "#FCECEF";
  ctx.fillRect(x, y, w, h);

  if (img.naturalWidth) {
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = x + (w - dw) / 2;
    const dy = y + (h - dh) / 2;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  } else {
    ctx.fillStyle = "#F7D6DF";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#5B3945";
    ctx.font = "50px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("Add your photo", 900, 950);
  }

  ctx.strokeStyle = "rgba(255,255,255,.88)";
  ctx.lineWidth = 18;
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = "#C98298";
  ctx.font = "28px Arial";
  ctx.textAlign = "left";
  ctx.fillText(m.label, 125, 1740);
  ctx.fillStyle = "#8A6672";
  ctx.font = "27px Georgia";
  ctx.textAlign = "right";
  ctx.fillText(m.date, 1675, 1740);
  ctx.fillStyle = "#5B3945";
  ctx.textAlign = "left";
  ctx.font = "500 68px Georgia";
  ctx.fillText(m.title, 120, 1840);
  ctx.fillStyle = "#8A6672";
  ctx.font = "32px Arial";
  wrapText(ctx, m.caption, 120, 1910, 1500, 48);
  ctx.font = "italic 30px Georgia";
  wrapText(ctx, m.story, 120, 2025, 1500, 46);

  ctx.fillStyle = "#C98298";
  ctx.font = "28px monospace";
  ctx.fillText("MUHAMMAD FAUZIA  ×  DINDA KHARNITA", 120, 2250);
  ctx.fillStyle = "#8A6672";
  ctx.font = "24px monospace";
  ctx.fillText("A LITTLE STORY  ·  MADE FOR YOU", 120, 2295);

  ctx.strokeStyle = "rgba(150,100,100,.22)";
  ctx.lineWidth = 4;
  ctx.strokeRect(55, 55, 1690, 2290);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(result => result ? resolve(result) : reject(new Error("The scrapbook PNG could not be created.")), "image/png");
  });
  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement("a");
    a.href = url;
    a.download = `fauzia-dinda-memory-${String(memoryIndex + 1).padStart(2, "0")}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    memoryStatus.textContent = "Your 1800 × 2400 PNG is ready.";
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

document.querySelectorAll("#downloadMemory, [data-memory-action='download']").forEach(button => {
  button.addEventListener("click", async () => {
    try {
      await downloadMemoryImage();
    } catch (error) {
      memoryStatus.textContent = "The scrapbook PNG could not be prepared. Please try again.";
      console.error("Memory download failed.", error);
    }
  });
});

function printSelectedMemory() {
  if (!memoryModal.classList.contains("open")) openMemory(current);
  window.setTimeout(() => window.print(), 150);
}
document.querySelectorAll("#printMemory, [data-memory-action='print']").forEach(button => {
  button.addEventListener("click", printSelectedMemory);
});

const reasons = [
  "I love the way your smile can make an ordinary moment feel special.",
  "I love the little things you do without even realizing how meaningful they are.",
  "I love hearing your stories, even the smallest ones.",
  "I love the comfort of simply being around you.",
  "I love the memories we have started making together.",
  "I love how one little moment with you can stay in my mind for a long time.",
  "I love the happiness hidden in our simplest conversations.",
  "I love getting to know more about you, one day at a time.",
  "I love the way you bring warmth into my ordinary days.",
  "I love that meeting you became a part of my story.",
  "I love the little things that make you, you.",
  "And most of all, I love you for being yourself."
];
const reasonTrigger = document.getElementById("reasonTrigger");
const reasonCard = document.getElementById("reasonCard");
const reasonMessage = document.getElementById("reasonMessage");
const reasonSparkles = document.getElementById("reasonSparkles");
let reasonIndex = 0;

reasonTrigger.addEventListener("click", () => {
  reasonMessage.textContent = reasons[reasonIndex];
  reasonIndex = (reasonIndex + 1) % reasons.length;
  reasonCard.hidden = false;
  reasonCard.classList.remove("is-visible");
  reasonSparkles.classList.remove("is-active");
  reasonTrigger.classList.remove("is-pulsing");
  void reasonCard.offsetWidth;
  reasonCard.classList.add("is-visible");
  reasonSparkles.classList.add("is-active");
  reasonTrigger.classList.add("is-pulsing");
  reasonTrigger.setAttribute("aria-expanded", "true");
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

// Letter
const letterModal = document.getElementById("letterModal");
const envelope = document.getElementById("openLetter");
const typedLetter = document.getElementById("typedLetter");
let typed = false;
let letterOpening = false;
function openLetterModal() {
  letterModal.classList.add("open");
  letterModal.setAttribute("aria-hidden", "false");
  if (!typed) {
    typeLetter();
    typed = true;
  }
}
envelope.addEventListener("click", () => {
  if (letterOpening) return;
  if (envelope.classList.contains("open")) {
    openLetterModal();
    return;
  }
  letterOpening = true;
  envelope.classList.add("opening");
  window.setTimeout(() => {
    envelope.classList.remove("opening");
    envelope.classList.add("open");
    window.setTimeout(() => {
      envelope.classList.remove("open");
      window.setTimeout(() => {
        openLetterModal();
        letterOpening = false;
      }, 650);
    }, 850);
  }, 500);
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
