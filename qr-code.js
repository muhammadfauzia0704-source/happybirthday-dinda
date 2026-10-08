const frame = document.getElementById("qrCode");
const status = document.getElementById("qrStatus");
const download = document.getElementById("downloadQr");
const birthdayUrl = "https://muhammadfauzia0704-source.github.io/happybirthday-dinda/";

if (typeof QRCode !== "function") {
  status.textContent = "The QR image could not be prepared. Open the birthday website using the link below.";
} else {
  const sourceFrame = document.createElement("div");
  const qrSize = 640;
  new QRCode(sourceFrame, {
    text: birthdayUrl,
    width: qrSize,
    height: qrSize,
    colorDark: "#190e14",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M
  });

  const sourceCanvas = sourceFrame.querySelector("canvas");
  if (!sourceCanvas) {
    status.textContent = "The QR image could not be prepared. Open the birthday website using the link below.";
  } else {
    const quietZone = 64;
    const canvas = document.createElement("canvas");
    canvas.width = qrSize + quietZone * 2;
    canvas.height = qrSize + quietZone * 2;
    const context = canvas.getContext("2d");
    if (!context) {
      status.textContent = "The QR image could not be prepared. Open the birthday website using the link below.";
    } else {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = false;
      context.drawImage(sourceCanvas, quietZone, quietZone, qrSize, qrSize);
      canvas.setAttribute("aria-hidden", "true");
      frame.replaceChildren(canvas);
      status.textContent = "QR ready — scan it with your phone camera.";
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
}
