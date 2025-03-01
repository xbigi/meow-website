function generateQR() {
    const qrText = document.getElementById('qrText').value;
    const qrContainer = document.getElementById('qrCode');
    const downloadBtn = document.getElementById('downloadQR');

    // Clear old QR code
    qrContainer.innerHTML = "";

    if (!qrText.trim()) {
        alert("Please enter text or a URL.");
        return;
    }

    // Generate QR Code
    const qr = new QRCode(qrContainer, {
        text: qrText,
        width: 256,
        height: 256
    });

    // Show download button after QR is generated
    setTimeout(() => {
        const qrCanvas = qrContainer.querySelector("canvas");
        if (qrCanvas) {
            downloadBtn.style.display = "block";
            downloadBtn.onclick = () => {
                const link = document.createElement("a");
                link.href = qrCanvas.toDataURL("image/png");
                link.download = "qr_code.png";
                link.click();
            };
        }
    }, 500);
}
