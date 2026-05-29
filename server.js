const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const webhookUrl = 'https://discordapp.com/api/webhooks/1507755873458716863/eua_4h-KX-3h9Wz0BmrBfRTXgKmIyWQN0T8rNuoL4v51uAkCOvSVH6KqmbLNFTg12JsY';

app.post('/send-to-discord', async (req, res) => {
    try {
        const { text } = req.body;
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: text,
            }),
        });

        if (response.ok) {
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false, error: 'Failed to send to Discord' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
