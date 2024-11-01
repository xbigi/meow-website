const introText = "Welcome to your fav corner of the web."; // Your new intro text
const introElement = document.getElementById("intro-text");
let index = 0;

function typeWriter() {
  introElement.textContent = ""; // Clear the text before typing
  index = 0; // Reset index

  function typeNextCharacter() {
    if (index < introText.length) {
      introElement.textContent += introText.charAt(index);
      index++;
      setTimeout(typeNextCharacter, 100); // Adjust speed of typing here
    } else {
      startBlinking(); // Start blinking after typing is complete
    }
  }

  typeNextCharacter(); // Start typing the first character
}

function startBlinking() {
  introElement.style.borderRight = "3px solid #ffffff"; // Show the cursor
  setInterval(() => {
    introElement.style.borderRight = introElement.style.borderRight === "3px solid transparent" ? "3px solid #ffffff" : "3px solid transparent";
  }, 500); // Adjust blink speed here
}

// Start the typewriter effect on page load
window.onload = typeWriter;
function toggleDropdown() {
    const dropdown = document.querySelector('.links-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }
  