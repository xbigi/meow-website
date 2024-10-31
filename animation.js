const typingText = "Under Development";
const typingElement = document.getElementById('typing');

let typingIndex = 0;
let typingInterval = 150; // Adjust typing speed in milliseconds
let isDeleting = false;

function typeWriter() {
  if (!isDeleting && typingIndex < typingText.length) {
    typingElement.textContent += typingText.charAt(typingIndex);
    typingIndex++;
    setTimeout(typeWriter, typingInterval);
  } else if (isDeleting && typingIndex > 0) {
    typingElement.textContent = typingText.substring(0, typingIndex - 1);
    typingIndex--;
    setTimeout(typeWriter, typingInterval);
  } else {
    isDeleting = !isDeleting;
    setTimeout(typeWriter, typingInterval);
  }
}

typeWriter();



