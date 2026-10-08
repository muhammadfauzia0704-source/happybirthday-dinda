const frame = document.getElementById("qrCode");
const status = document.getElementById("qrStatus");
const download = document.getElementById("downloadQr");
const birthdayUrl = "https://muhammadfauzia0704-source.github.io/happybirthday-dinda/";

if (typeof QRCode !== "function") {
  status.textContent = "The QR image could not be prepared. Open the birthday website using the link below.";
} else {
  new QRCode(frame, {
    text: birthdayUrl,
    width: 272,
    height: 272,
    colorDark: "#190e14",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  const canvas = frame.querySelector("canvas");
  if (!canvas) {
    status.textContent = "The QR image could not be prepared. Open the birthday website using the link below.";
  } else {
    status.textContent = "A little story, made just for you.";
    canvas.setAttribute("aria-hidden", "true");
    download.disabled = false;
    download.addEventListener("click", event => {
      event.preventDefault();
      canvas.toBlob(blob => {
        if (!blob) {
          status.textContent = "The QR image could not be downloaded. You can still scan it above.";
          return;
        }
        const url = URL.createObjectURL(blob);
        const file = document.createElement("a");
        file.href = url;
        file.download = "dinda-birthday-qr.png";
        document.body.appendChild(file);
        file.click();
        file.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, "image/png");
    });
  }
}
