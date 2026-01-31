const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Your webhook mappings (add more as needed)
const webhooks = {
    'wh_yourcode123': 'https://discord.com/api/webhooks/1467155325441540110/Yy0KQpAlWrznQgoW5-hYTXvIWQldFjF4tsyF2mWgRuq40khtVH4r3lR0BMZ3zOQxMZII'
};

// Send webhook endpoint
app.post('/send', async (req, res) => {
    try {
        const { webhookId, data } = req.body;
        
        // Get real webhook URL
        const realWebhook = webhooks[webhookId];
        
        if (!realWebhook) {
            return res.status(404).json({ error: 'Webhook not found' });
        }
        
        // Send to Discord
        await axios.post(realWebhook, data);
        res.json({ success: true, message: 'Webhook sent!' });
        
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to send webhook' });
    }
});

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'Server is running!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
