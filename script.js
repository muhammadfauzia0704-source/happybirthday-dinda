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

const heroPhoto = document.getElementById("heroPhoto");
const heroPhotoInput = document.getElementById("heroPhotoInput");
const heroPhotoPlaceholder = document.getElementById("heroPhotoPlaceholder");
const heroPhotoPickerText = document.getElementById("heroPhotoPickerText");
const heroPhotoCaption = document.getElementById("heroPhotoCaption");
const heroPhotoStatus = document.getElementById("heroPhotoStatus");
let selectedHeroPhotoUrl = "";

heroPhotoInput.addEventListener("change", () => {
  const file = heroPhotoInput.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    heroPhotoStatus.textContent = "Please choose an image file.";
    heroPhotoInput.value = "";
    return;
  }

  const imageUrl = URL.createObjectURL(file);
  const preview = new Image();
  preview.onload = () => {
    const previousUrl = selectedHeroPhotoUrl;
    selectedHeroPhotoUrl = imageUrl;
    heroPhoto.src = imageUrl;
    heroPhoto.hidden = false;
    heroPhoto.alt = `A memory selected from this device: ${file.name}`;
    heroPhotoPlaceholder.hidden = true;
    heroPhotoPickerText.textContent = "Change photo";
    heroPhotoCaption.textContent = file.name;
    heroPhotoStatus.textContent = "PHOTO ADDED";
    if (previousUrl) URL.revokeObjectURL(previousUrl);
  };
  preview.onerror = () => {
    URL.revokeObjectURL(imageUrl);
    heroPhotoStatus.textContent = "That image could not be opened. Please choose another.";
    heroPhotoInput.value = "";
  };
  preview.src = imageUrl;
});

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

const littleReasons = [
  "I love how your smile can make an ordinary moment feel special.",
  "I love that talking with you can make the day feel a little lighter.",
  "I love the calm I feel when we simply spend time together.",
  "I love learning something new about you, one day at a time.",
  "I love that our story began in an unexpected way.",
  "I love how small conversations can become meaningful memories.",
  "I love the thoughtfulness you bring to the people around you.",
  "I love that you have your own way of seeing the world.",
  "I love the warmth you bring into an ordinary day.",
  "I love hearing what has been on your mind.",
  "I love that being with you never needs a grand plan.",
  "I love how your presence can make a place feel familiar.",
  "I love the little expressions that are uniquely yours.",
  "I love how much there is still to discover about you.",
  "I love sharing quiet moments as much as lively conversations.",
  "I love the kindness you show in ways both big and small.",
  "I love how a simple hello from you can brighten my mood.",
  "I love the memories we have begun collecting together.",
  "I love how we can keep learning and growing side by side.",
  "I love the honest way you share your thoughts.",
  "I love the gentle strength you carry within you.",
  "I love that you make room for the people you care about.",
  "I love the way you make everyday things feel worth noticing.",
  "I love that I can keep getting to know you better.",
  "I love the happiness tucked into our simplest exchanges.",
  "I love how your ideas make me look at things differently.",
  "I love that you are wonderfully and completely yourself.",
  "I love the softness you bring to a busy day.",
  "I love how being near you can feel like taking a breath.",
  "I love the little details that make your point of view yours.",
  "I love that you have dreams and hopes of your own.",
  "I love being someone who gets to cheer you on.",
  "I love the way you make space for a new chapter to begin.",
  "I love that there is no need to make every moment impressive.",
  "I love the care you put into the things that matter to you.",
  "I love that your laugh is a sound I am glad to know.",
  "I love how even a short conversation can stay with me.",
  "I love that we can make memories at our own pace.",
  "I love your curiosity about the world around you.",
  "I love the comfort of knowing we are writing this story together.",
  "I love the thoughtful questions you ask.",
  "I love that your feelings deserve the time and care you give them.",
  "I love the way you make kindness feel natural.",
  "I love how much meaning can live in a small gesture.",
  "I love discovering the things that make you happy.",
  "I love that we can keep choosing patience and understanding.",
  "I love your perspective, even when it surprises me.",
  "I love how a shared memory can make me smile again.",
  "I love that we do not have to be perfect to be meaningful.",
  "I love the possibility of all the ordinary days still ahead.",
  "I love how you bring your own color into my life.",
  "I love the way you listen when something matters.",
  "I love that your hopes are worth believing in.",
  "I love the small pauses when we can simply be ourselves.",
  "I love how our conversations can wander and find their way.",
  "I love that you keep becoming more yourself.",
  "I love seeing the world through the stories you tell.",
  "I love the care behind the things you do.",
  "I love that we can celebrate little wins together.",
  "I love that quiet support can say so much.",
  "I love how you remind me to notice what is good.",
  "I love the little world we are making, moment by moment.",
  "I love how your presence stays in my thoughts after we part.",
  "I love that your individuality is one of my favorite things.",
  "I love the way you make room for joy in simple moments.",
  "I love that we can learn from one another.",
  "I love the trust that grows through honest conversations.",
  "I love how you can make a familiar day feel a little new.",
  "I love the care you deserve, simply because you are you.",
  "I love that I can be grateful for you without needing a reason.",
  "I love the gentle memories that are still becoming ours.",
  "I love the thoughtful way you notice people and details.",
  "I love how you keep moving forward in your own time.",
  "I love that rest and softness belong in your story too.",
  "I love sharing hopes for the future without needing every answer.",
  "I love how your words can bring a little perspective.",
  "I love that your presence is enough; you do not have to perform.",
  "I love the feeling of being understood a little more each day.",
  "I love that we can make a story out of simple beginnings.",
  "I love your tender side and the strength beside it.",
  "I love that getting to know you is still an unfolding adventure.",
  "I love how the smallest kindness can stay in my heart.",
  "I love the warmth in the way you say what you mean.",
  "I love that you inspire me to show up with more care.",
  "I love the gentle excitement of making plans together.",
  "I love the memories that begin with an ordinary day.",
  "I love that every chapter can teach us something new.",
  "I love the little things you may not realize are meaningful.",
  "I love the way you make a shared silence feel comfortable.",
  "I love how your hopes make me want to support you.",
  "I love the gratitude I feel when I think of meeting you.",
  "I love your thoughtful way of being in the world.",
  "I love that we can keep making room for each other's growth.",
  "I love the way your smile lives in my favorite thoughts.",
  "I love that our story belongs to us, one day at a time.",
  "I love having you as a part of my life.",
  "I love the chance to care for you in simple, sincere ways.",
  "I love that there is always more to appreciate about you.",
  "I love you for being yourself, today and in every new chapter.",
  "I love that there is always a new little reason to be thankful for you."
];

const openWhenLetters = [
  { prompt: "OPEN WHEN YOU'RE SAD", title: "A soft place to pause", description: "For a day that feels heavier than usual.", icon: "☁", body: "Hey, my love. You do not have to be okay all the time. It is alright to pause, take a breath, and give yourself the kindness you deserve. Your feelings are allowed to be here. I hope this little letter reminds you that you are precious, even on the days when everything feels heavy." },
  { prompt: "OPEN WHEN YOU MISS ME", title: "A little closeness", description: "For a moment when you wish we were near.", icon: "♡", body: "If you are missing me right now, let this note be a small reminder that distance does not erase what we are building. Think of this as a quiet hello from Fauzia, sent with all the care I can fit into a few lines. I am grateful our paths crossed, my love." },
  { prompt: "OPEN WHEN YOU NEED A HUG", title: "A hug in a letter", description: "A gentle reminder to be kind to yourself.", icon: "✿", body: "Imagine this page wrapped around you like the softest hug. Let your shoulders rest for a moment. You do not need to solve everything at once. You deserve patience, comfort, and care, including from yourself. Sending you a little warmth, sayang." },
  { prompt: "OPEN WHEN YOU CAN'T SLEEP", title: "For a quiet night", description: "Something gentle to read before you rest.", icon: "☾", body: "The night can make thoughts feel louder. You can let this moment be simple: breathe in, breathe out, and give yourself permission to rest. Tomorrow does not need to be solved right now. I hope the quiet brings you a little peace, my love." },
  { prompt: "OPEN WHEN YOU NEED A SMILE", title: "A tiny smile, if it helps", description: "A small note with a little affection tucked in.", icon: "☼", body: "Here is a completely official reminder from your personal admirer: you are very easy to appreciate, and this little website is proof that I wanted to make you smile. If it worked even a little, then this note has done its job. Sending you a soft smile back, love." },
  { prompt: "OPEN WHEN YOU DOUBT YOURSELF", title: "Remember your own worth", description: "For a moment when confidence feels far away.", icon: "✧", body: "You do not need to have everything figured out to be worthy of respect and love. Your effort matters, your perspective matters, and you are allowed to grow at your own pace. I believe in the person you are and the person you are becoming. Be gentle with yourself, sayang." },
  { prompt: "OPEN WHEN YOU FEEL TIRED", title: "Rest is allowed", description: "A little permission to slow down.", icon: "☁", body: "You are allowed to pause without earning it first. A slower moment does not undo your effort. Take the space you need, drink some water, and let one thing wait if it can. I hope you can offer yourself the same care you give to others." },
  { prompt: "OPEN WHEN YOU NEED TO FEEL LOVED", title: "You are deeply cherished", description: "For a reminder that you matter just as you are.", icon: "♡", body: "My love, you are not valued only for what you do or how you feel on a particular day. I care about you because you are you: thoughtful, growing, and entirely your own person. I am so grateful to know you and to share a part of this story with you. — Fauzia" }
];

const loveJarMessages = [
  "You deserve a moment of rest today.",
  "A little reminder: your feelings matter.",
  "I am grateful our paths crossed.",
  "Take one small thing at a time; that is enough.",
  "You bring a gentle warmth to my thoughts.",
  "It is okay to pause and begin again later.",
  "I hope something kind finds you today.",
  "You do not have to have every answer right now.",
  "Thank you for being part of my story.",
  "Your presence is a lovely thing to appreciate.",
  "Let yourself celebrate a small win.",
  "You are allowed to make room for quiet.",
  "I am cheering for you in all the little steps.",
  "May today hold one peaceful moment for you.",
  "You deserve kindness from yourself, too.",
  "Some of my favorite thoughts begin with you.",
  "It is enough to do what you can, as you are.",
  "I hope this note makes your day feel softer.",
  "There is no rush to become anyone but yourself.",
  "I love the little world we are building together.",
  "A sip of water and a deep breath, if you need one.",
  "You make ordinary moments worth noticing.",
  "May you find time for something that feels like you.",
  "I am thankful for every page of our story so far.",
  "Your hopes deserve space to grow.",
  "Let this be your reminder to rest without guilt.",
  "You are loved in the quiet moments, too.",
  "A small step still moves you forward.",
  "I hope you feel appreciated today, my love.",
  "Whatever today holds, you can meet it one moment at a time."
];

const hiddenNotes = [
  "Psst... you make this little world feel warmer.",
  "A tiny reminder: you are loved.",
  "Some of my favorite things begin with you.",
  "Thank you for becoming a part of my story.",
  "I hope this little surprise makes you smile.",
  "You deserve gentle days and beautiful things.",
  "One small note, with a whole lot of love.",
  "Happy Birthday, my love. Here's another little secret.",
  "A little heart was hiding here, just for you."
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

function makeShuffledOrder(length) {
  const order = Array.from({ length }, (_, index) => index);
  for (let index = order.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }
  return order;
}

const littleReasonsKey = "fauziaBirthday.littleReasons.v1";
const reasonsProgress = document.getElementById("reasonsProgress");
const hundredReasonMessage = document.getElementById("hundredReasonMessage");
const nextLittleReason = document.getElementById("nextLittleReason");
const previousLittleReason = document.getElementById("previousLittleReason");
const replayLittleReasons = document.getElementById("replayLittleReasons");
let littleReasonOrder = makeShuffledOrder(littleReasons.length);
let littleReasonsOpened = 0;
let littleReasonView = -1;

function loadLittleReasonsProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(littleReasonsKey) || "null");
    if (!saved || saved.version !== 1 || !Array.isArray(saved.order) ||
      saved.order.length !== littleReasons.length ||
      !saved.order.every(index => Number.isInteger(index) && index >= 0 && index < littleReasons.length) ||
      new Set(saved.order).size !== littleReasons.length ||
      !Number.isInteger(saved.opened) || saved.opened < 0 || saved.opened > littleReasons.length) return;
    littleReasonOrder = saved.order;
    littleReasonsOpened = saved.opened;
    littleReasonView = littleReasonsOpened - 1;
  } catch (error) {
    console.warn("Little Reasons progress could not be loaded.", error);
  }
}

function saveLittleReasonsProgress() {
  try {
    localStorage.setItem(littleReasonsKey, JSON.stringify({
      version: 1,
      order: littleReasonOrder,
      opened: littleReasonsOpened
    }));
  } catch (error) {
    console.warn("Little Reasons progress could not be saved; it will remain for this session.", error);
  }
}

function renderLittleReason() {
  reasonsProgress.textContent = `${littleReasonsOpened} / ${littleReasons.length}${littleReasonsOpened === littleReasons.length ? " · All the little reasons are open." : ""}`;
  if (littleReasonsOpened === littleReasons.length && littleReasonView >= littleReasons.length) {
    hundredReasonMessage.textContent = "And after all these little reasons, the simplest one remains: I love you, my love. Happy Birthday. — Fauzia ♡";
    previousLittleReason.disabled = false;
    nextLittleReason.hidden = true;
    replayLittleReasons.hidden = false;
    return;
  }

  if (littleReasonView < 0 || littleReasonsOpened === 0) {
    hundredReasonMessage.textContent = "A little collection, waiting to be opened.";
  } else {
    hundredReasonMessage.textContent = littleReasons[littleReasonOrder[littleReasonView]];
  }
  previousLittleReason.disabled = littleReasonView <= 0;
  nextLittleReason.hidden = littleReasonView >= littleReasons.length;
  nextLittleReason.textContent = littleReasonView < littleReasonsOpened - 1
    ? "Next note"
    : littleReasonView === littleReasons.length - 1
      ? "One more little note ♡"
      : littleReasonsOpened ? "Open the next reason ♡" : "Open a Little Reason ♡";
  replayLittleReasons.hidden = littleReasonsOpened !== littleReasons.length || littleReasonView < littleReasons.length;
}

loadLittleReasonsProgress();
renderLittleReason();
nextLittleReason.addEventListener("click", () => {
  if (littleReasonView < littleReasonsOpened - 1) {
    littleReasonView++;
  } else if (littleReasonsOpened < littleReasons.length) {
    littleReasonView = littleReasonsOpened;
    littleReasonsOpened++;
    saveLittleReasonsProgress();
  } else if (littleReasonView === littleReasons.length - 1) {
    littleReasonView = littleReasons.length;
  }
  renderLittleReason();
});
previousLittleReason.addEventListener("click", () => {
  if (littleReasonView > 0) littleReasonView--;
  renderLittleReason();
});
replayLittleReasons.addEventListener("click", () => {
  littleReasonOrder = makeShuffledOrder(littleReasons.length);
  littleReasonsOpened = 0;
  littleReasonView = -1;
  saveLittleReasonsProgress();
  renderLittleReason();
});

const openWhenList = document.getElementById("openWhenLetters");
const openWhenModal = document.getElementById("openWhenModal");
const featureLetterPrompt = document.getElementById("featureLetterPrompt");
const featureLetterTitle = document.getElementById("featureLetterTitle");
const featureLetterDescription = document.getElementById("featureLetterDescription");
const featureLetterBody = document.getElementById("featureLetterBody");
let openWhenReturnFocus = null;

openWhenLetters.forEach((letter, index) => {
  const button = document.createElement("button");
  const icon = document.createElement("span");
  const title = document.createElement("strong");
  const description = document.createElement("small");
  button.className = "open-when-envelope";
  button.type = "button";
  button.setAttribute("aria-label", `${letter.prompt}: ${letter.description}`);
  icon.className = "open-when-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = letter.icon;
  title.textContent = letter.prompt;
  description.textContent = letter.description;
  button.append(icon, title, description);
  button.addEventListener("click", () => {
    openWhenReturnFocus = button;
    featureLetterPrompt.textContent = letter.prompt;
    featureLetterTitle.textContent = letter.title;
    featureLetterDescription.textContent = letter.description;
    featureLetterBody.textContent = letter.body;
    openWhenModal.classList.add("open");
    openWhenModal.setAttribute("aria-hidden", "false");
    openWhenModal.querySelector(".modal-close").focus();
  });
  openWhenList.append(button);
});

function closeOpenWhenLetter() {
  openWhenModal.classList.remove("open");
  openWhenModal.setAttribute("aria-hidden", "true");
  openWhenReturnFocus?.focus();
}
openWhenModal.querySelectorAll('[data-close="open-when"]').forEach(button => button.addEventListener("click", closeOpenWhenLetter));

let loveJarOrder = makeShuffledOrder(loveJarMessages.length);
let loveJarOpened = 0;
const loveJarCard = document.getElementById("loveJarCard");
const loveJarMessage = document.getElementById("loveJarMessage");
const loveJarCounter = document.getElementById("loveJarCounter");
const pickLoveNote = document.getElementById("pickLoveNote");
const nextLoveNote = document.getElementById("nextLoveNote");
const restartLoveJar = document.getElementById("restartLoveJar");
const jarLayout = document.querySelector(".jar-layout");

function pickNextJarNote() {
  if (loveJarOpened >= loveJarMessages.length) return;
  const noteIndex = loveJarOrder[loveJarOpened];
  loveJarOpened++;
  loveJarMessage.textContent = loveJarMessages[noteIndex];
  loveJarCounter.textContent = `${loveJarOpened} / ${loveJarMessages.length} little notes`;
  loveJarCard.hidden = false;
  jarLayout.classList.remove("note-picked");
  void jarLayout.offsetWidth;
  jarLayout.classList.add("note-picked");
  pickLoveNote.hidden = true;
  nextLoveNote.hidden = loveJarOpened >= loveJarMessages.length;
  restartLoveJar.hidden = loveJarOpened < loveJarMessages.length;
}

pickLoveNote.addEventListener("click", pickNextJarNote);
nextLoveNote.addEventListener("click", pickNextJarNote);
document.getElementById("closeLoveJarNote").addEventListener("click", () => {
  loveJarCard.hidden = true;
  pickLoveNote.hidden = loveJarOpened >= loveJarMessages.length;
  nextLoveNote.hidden = true;
});
restartLoveJar.addEventListener("click", () => {
  loveJarOrder = makeShuffledOrder(loveJarMessages.length);
  loveJarOpened = 0;
  loveJarCard.hidden = true;
  pickLoveNote.hidden = false;
  nextLoveNote.hidden = true;
  restartLoveJar.hidden = true;
  loveJarCounter.textContent = `0 / ${loveJarMessages.length} little notes`;
});

const surpriseStages = [
  { label: "A LITTLE NOTE", message: "I made this little world with you in mind. I hope it gives you a moment that feels warm and entirely yours." },
  { label: "A LITTLE MEMORY", message: "A page from our scrapbook, waiting for one of your photos." },
  { label: "A LITTLE REASON", message: littleReasons[18] },
  { label: "THE BIGGEST LITTLE SURPRISE", message: "Of all the unexpected things in life, meeting you is one of my favorites.\n\nHappy Birthday, my love.\n\nThank you for being part of my story. — Fauzia ♡" }
];
const giftBox = document.getElementById("giftBox");
const surpriseProgress = document.getElementById("surpriseProgress");
const surpriseCard = document.getElementById("surpriseCard");
const surpriseLabel = document.getElementById("surpriseLabel");
const surpriseMessage = document.getElementById("surpriseMessage");
const surpriseImage = document.getElementById("surpriseImage");
const openSurprise = document.getElementById("openSurprise");
const nextSurprise = document.getElementById("nextSurprise");
const replaySurprises = document.getElementById("replaySurprises");
let surpriseIndex = -1;
let surpriseLocked = false;

function openSurpriseStage() {
  if (surpriseLocked) return;
  surpriseLocked = true;
  openSurprise.hidden = true;
  nextSurprise.hidden = true;
  replaySurprises.hidden = true;
  surpriseIndex++;
  const stage = surpriseStages[surpriseIndex];
  surpriseProgress.textContent = `Surprise ${surpriseIndex + 1} of ${surpriseStages.length}`;
  surpriseLabel.textContent = stage.label;
  surpriseMessage.textContent = stage.message;
  surpriseImage.hidden = surpriseIndex !== 1;
  if (surpriseIndex === 1) {
    surpriseImage.onerror = () => {
      surpriseImage.onerror = null;
      surpriseImage.src = photoPlaceholder(0);
    };
    surpriseImage.src = memories[0].file;
    surpriseImage.alt = "A scrapbook photo from the first memory";
  } else {
    surpriseImage.removeAttribute("src");
    surpriseImage.alt = "";
  }
  surpriseCard.hidden = false;
  giftBox.classList.add("is-open");
  window.setTimeout(() => {
    surpriseLocked = false;
    if (surpriseIndex === surpriseStages.length - 1) {
      replaySurprises.hidden = false;
      surpriseProgress.textContent = "All four little surprises are open.";
    } else {
      nextSurprise.hidden = false;
    }
  }, 450);
}

openSurprise.addEventListener("click", openSurpriseStage);
nextSurprise.addEventListener("click", openSurpriseStage);
replaySurprises.addEventListener("click", () => {
  surpriseIndex = -1;
  surpriseCard.hidden = true;
  replaySurprises.hidden = true;
  nextSurprise.hidden = true;
  openSurprise.hidden = false;
  surpriseProgress.textContent = "A surprise is waiting";
  giftBox.classList.remove("is-open");
});

const relationshipSection = document.getElementById("relationship-counter");
let relationshipInterval = 0;
let relationshipVisible = false;
const relationshipStart = new Date(2025, 11, 13);

function getCalendarDay(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function updateRelationshipCounter() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const totalDays = Math.floor((getCalendarDay(today) - getCalendarDay(relationshipStart)) / 86400000);
  if (totalDays < 0) {
    document.getElementById("relationshipNote").textContent = "Our little journey begins on 13 December 2025. Until then, this counter is waiting with us.";
    document.getElementById("relationshipTotal").textContent = "Our first day is still ahead";
    ["relationshipYears", "relationshipMonths", "relationshipDays", "relationshipHours", "relationshipMinutes", "relationshipSeconds"].forEach(id => {
      document.getElementById(id).textContent = "0";
    });
    return;
  }

  let years = today.getFullYear() - relationshipStart.getFullYear();
  let yearAnchor = new Date(relationshipStart.getFullYear() + years, relationshipStart.getMonth(), relationshipStart.getDate());
  if (yearAnchor > today) {
    years--;
    yearAnchor = new Date(relationshipStart.getFullYear() + years, relationshipStart.getMonth(), relationshipStart.getDate());
  }
  let months = (today.getFullYear() - yearAnchor.getFullYear()) * 12 + today.getMonth() - yearAnchor.getMonth();
  let monthAnchor = new Date(yearAnchor.getFullYear(), yearAnchor.getMonth() + months, relationshipStart.getDate());
  if (monthAnchor > today) {
    months--;
    monthAnchor = new Date(yearAnchor.getFullYear(), yearAnchor.getMonth() + months, relationshipStart.getDate());
  }
  const calendarRemainder = Math.floor((getCalendarDay(today) - getCalendarDay(monthAnchor)) / 86400000);
  const elapsedToday = Math.max(0, now.getTime() - today.getTime());
  const hours = Math.floor(elapsedToday / 3600000);
  const minutes = Math.floor((elapsedToday % 3600000) / 60000);
  const seconds = Math.floor((elapsedToday % 60000) / 1000);
  document.getElementById("relationshipYears").textContent = String(years);
  document.getElementById("relationshipMonths").textContent = String(months);
  document.getElementById("relationshipDays").textContent = String(calendarRemainder);
  document.getElementById("relationshipHours").textContent = String(hours).padStart(2, "0");
  document.getElementById("relationshipMinutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("relationshipSeconds").textContent = String(seconds).padStart(2, "0");
  document.getElementById("relationshipTotal").textContent = `${totalDays} ${totalDays === 1 ? "day" : "days"} together`;
  document.getElementById("relationshipNote").textContent = "Calendar years, months, and days follow your local date. Hours, minutes, and seconds count from today's local midnight; the relationship's exact start time is unknown.";
}

function startRelationshipCounter() {
  if (relationshipInterval || !relationshipVisible || document.hidden) return;
  updateRelationshipCounter();
  relationshipInterval = window.setInterval(updateRelationshipCounter, 1000);
}
function stopRelationshipCounter() {
  if (!relationshipInterval) return;
  window.clearInterval(relationshipInterval);
  relationshipInterval = 0;
}
const relationshipObserver = new IntersectionObserver(entries => {
  relationshipVisible = entries.some(entry => entry.isIntersecting);
  if (relationshipVisible) startRelationshipCounter();
  else stopRelationshipCounter();
});
relationshipObserver.observe(relationshipSection);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopRelationshipCounter();
  else startRelationshipCounter();
});
window.addEventListener("pagehide", stopRelationshipCounter);

const hiddenNoteModal = document.getElementById("hiddenNoteModal");
const hiddenNoteMessage = document.getElementById("hiddenNoteMessage");
const hiddenNoteProgress = document.getElementById("hiddenNoteProgress");
let hiddenNoteReturnFocus = null;
let discoveredHiddenNotes = new Set();
const hiddenNotesKey = "fauziaBirthday.hiddenNotes.v1";
try {
  const savedNotes = JSON.parse(localStorage.getItem(hiddenNotesKey) || "[]");
  if (Array.isArray(savedNotes) && savedNotes.every(index => Number.isInteger(index) && index >= 0 && index < hiddenNotes.length)) {
    discoveredHiddenNotes = new Set(savedNotes);
  }
} catch (error) {
  console.warn("Hidden Notes progress could not be loaded.", error);
}
hiddenNoteProgress.textContent = `${discoveredHiddenNotes.size} / ${hiddenNotes.length} little notes found`;

document.addEventListener("click", event => {
  const trigger = event.target instanceof Element ? event.target.closest("[data-hidden-note]") : null;
  if (!trigger) return;
  const noteIndex = Number(trigger.getAttribute("data-hidden-note"));
  if (!Number.isInteger(noteIndex) || noteIndex < 0 || noteIndex >= hiddenNotes.length) return;
  hiddenNoteReturnFocus = trigger;
  hiddenNoteMessage.textContent = hiddenNotes[noteIndex];
  discoveredHiddenNotes.add(noteIndex);
  try {
    localStorage.setItem(hiddenNotesKey, JSON.stringify([...discoveredHiddenNotes]));
  } catch (error) {
    console.warn("Hidden Notes progress could not be saved; this note is still available.", error);
  }
  hiddenNoteProgress.textContent = `${discoveredHiddenNotes.size} / ${hiddenNotes.length} little notes found`;
  hiddenNoteModal.classList.add("open");
  hiddenNoteModal.setAttribute("aria-hidden", "false");
  hiddenNoteModal.querySelector(".modal-close").focus();
});

function closeHiddenNote() {
  hiddenNoteModal.classList.remove("open");
  hiddenNoteModal.setAttribute("aria-hidden", "true");
  hiddenNoteReturnFocus?.focus();
}
hiddenNoteModal.querySelectorAll('[data-close="hidden-note"]').forEach(button => button.addEventListener("click", closeHiddenNote));

const loveBookPrint = document.getElementById("loveBookPrint");
function appendBookPage(className, titleText, bodyText) {
  const page = document.createElement("section");
  const title = document.createElement("h2");
  page.className = `love-book-page ${className}`;
  title.textContent = titleText;
  page.append(title);
  if (bodyText) {
    const body = document.createElement("p");
    body.textContent = bodyText;
    page.append(body);
  }
  loveBookPrint.append(page);
  return page;
}

function buildLoveBook() {
  const cover = appendBookPage("love-book-cover", "Our Little Love Story", "A little world made with love · Fauzia · 13 December 2025");
  const coverHeart = document.createElement("span");
  coverHeart.className = "book-mark";
  coverHeart.textContent = "♡";
  cover.prepend(coverHeart);
  appendBookPage("love-book-intro", "For my love", "Somewhere between a simple meeting and little conversations, a new story quietly began. I am grateful our paths crossed. Every little day has become a part of our story.");
  const timelinePage = appendBookPage("love-book-timeline", "Our Little Timeline", "");
  [
    ["VISCO 2025", "Where It All Started", "Somewhere between a simple meeting and little conversations, a new story quietly began."],
    ["13 DECEMBER 2025", "The Beginning of Us", "A date that became a little part of our story, and a memory I want to keep close."],
    ["31 DECEMBER", "Your Special Day", "Today is a reminder of how grateful I am that our paths crossed. Happy Birthday, my love."]
  ].forEach(([date, titleText, text]) => {
    const entry = document.createElement("article");
    const dateNode = document.createElement("small");
    const heading = document.createElement("h3");
    const paragraph = document.createElement("p");
    dateNode.textContent = date;
    heading.textContent = titleText;
    paragraph.textContent = text;
    entry.append(dateNode, heading, paragraph);
    timelinePage.append(entry);
  });
  memories.forEach((memory, index) => {
    const page = appendBookPage("love-book-memory", `${String(index + 1).padStart(2, "0")} · ${memory.title}`, "");
    const image = document.createElement("img");
    const label = document.createElement("small");
    const caption = document.createElement("p");
    const story = document.createElement("p");
    image.src = memory.file;
    image.alt = `${memory.title}, scrapbook memory ${index + 1}`;
    image.addEventListener("error", () => {
      image.src = photoPlaceholder(index);
    }, { once: true });
    label.textContent = `${memory.label} · ${memory.date}`;
    caption.textContent = memory.caption;
    story.textContent = memory.story;
    page.append(image, label, caption, story);
  });
  appendBookPage("love-book-note", "A little reason", littleReasons[0]);
  appendBookPage("love-book-note", "A note from the Love Jar", loveJarMessages[0]);
  appendBookPage("love-book-letter", "A letter for you", letterText);
  appendBookPage("love-book-ending", "Happy Birthday, my love.", "Thank you for being part of my story. — Fauzia ♡");
}
buildLoveBook();

document.getElementById("printLoveBook").addEventListener("click", () => {
  document.getElementById("loveBookStatus").textContent = "Print dialog opened. Choose “Save as PDF” and use Our-Little-Love-Story.pdf as the file name.";
  document.title = "Our-Little-Love-Story";
  document.body.classList.add("printing-love-book");
  window.print();
});
window.addEventListener("afterprint", () => {
  document.body.classList.remove("printing-love-book");
  document.title = "For Dinda — Our Little Story ♡";
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
  if (openWhenModal.classList.contains("open")) closeOpenWhenLetter();
  if (hiddenNoteModal.classList.contains("open")) closeHiddenNote();
}

document.addEventListener("keydown", event => {
  if (event.key !== "Tab") return;
  const modal = [openWhenModal, hiddenNoteModal].find(item => item.classList.contains("open"));
  if (!modal) return;
  const focusable = [...modal.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter(element => element.getClientRects().length > 0);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

// Initial memory state
updateMemory();
if (sessionStorage.getItem("birthdayUnlocked") === "true") {
  openDashboard();
}
