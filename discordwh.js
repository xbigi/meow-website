const axios = require('axios');

const webhookURL = 'https://discord.com/api/webhooks/1301669336645107766/M0h6pl-ryWMhPRe5q7VWosIkqRUili80fcu3DRTMaGEfIZhp2SN1d3nNd8fwBe8p2RyE';

const ipAddress = req.ip; // Get the client's IP address

const message = {
  content: `New IP Address: ${ipAddress}`
};

axios.post(webhookURL, message)
  .then(response => {
    console.log('Message sent successfully');
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });