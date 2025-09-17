// Add this function to send SMS via Twilio
function sendSMSToOwner(message) {
    // This would connect to your server which would then use Twilio API
    // For security, you should never put API keys in frontend code
    
    fetch('send_sms.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            message: message,
            customerInfo: {
                name: document.getElementById('name').value || 'Unknown',
                phone: document.getElementById('phone').value || 'Unknown'
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            addMessage("I've sent a message to Chris to call you ASAP!", 'bot');
        } else {
            addMessage("I couldn't send a message right now. Please call (516) 725-0672 directly.", 'bot');
        }
    })
    .catch(error => {
        addMessage("Please call (516) 725-0672 directly to speak with someone.", 'bot');
    });
}

// Update the sendMessage function to handle SMS requests
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Check if user wants to contact directly
    if (message.toLowerCase().includes('call me') || 
        message.toLowerCase().includes('contact me') ||
        message.toLowerCase() === 'yes') {
        
        addMessage("I'm sending a message to Chris to call you right away. Please ensure your phone is available.", 'bot');
        sendSMSToOwner("Customer requested call back from chat. Name: " + 
                      (document.getElementById('name').value || 'Not provided') + 
                      ", Phone: " + (document.getElementById('phone').value || 'Not provided'));
        return;
    }
    
    // ... rest of your existing code
}
