document.getElementById('imageUpload').addEventListener('change', function(event) {
    processImage(event.target.files[0]);
});

// handle paste 
document.addEventListener('paste', function(event) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (let item of items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
            const imageFile = item.getAsFile();
            processImage(imageFile);
        }
    }
});

// handle drag n drop
const dropArea = document.getElementById('dropArea');

dropArea.addEventListener('dragover', function(event) {
    event.preventDefault();
    dropArea.style.border = "2px dashed cyan";
});

dropArea.addEventListener('dragleave', function() {
    dropArea.style.border = "2px dashed gray";
});

dropArea.addEventListener('drop', function(event) {
    event.preventDefault();
    dropArea.style.border = "2px dashed gray";

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processImage(files[0]);
    }
});

// OCR function
function processImage(imageFile) {
    if (!imageFile) return;
    
    document.getElementById('outputText').value = "Processing... Please wait.";

    Tesseract.recognize(
        imageFile,
        'eng',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        document.getElementById('outputText').value = text || "No text detected.";
    }).catch(error => {
        console.error('OCR Error:', error);
        alert("Failed to extract text. Try another image.");
    });
}
