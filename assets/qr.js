function generateQR() {
    const qrText = document.getElementById('qrText').value;
    const qrContainer = document.getElementById('qrCode');
    const downloadBtn = document.getElementById('downloadQR');

    // clear old qr code
    qrContainer.innerHTML = "";

    if (!qrText.trim()) {
        alert("Please enter text or a URL.");
        return;
    }

    // gen qr code
    const qr = new QRCode(qrContainer, {
        text: qrText,
        width: 256,
        height: 256
    });

    // show download btn
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
