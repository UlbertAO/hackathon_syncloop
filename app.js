const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const axios = require('axios');

// Load environment variables from .env file
dotenv.config({path:".env"})
const port = process.env.PORT || 5000;

// create express server
const app = express();

app.use(express.static(path.join(__dirname,"Public")));

app.use(express.json());
// console.log(__dirname);

app.get('/', (req, res) => {
    res.sendFile(path.resolve('pages/index.html'));
  });

app.post('/api/updateTitle',async (req,res)=>{
    try {
        const { playlistId, token } = req.body;
        yt_api_key = process.env.YT_API_KEY
        if(!yt_api_key){
            throw new Error("You Tube API key not found")
        }

        if (!playlistId || !token) {
            return res.status(400).json({ error: 'Both playlistId and access_token are required.' });
        }

        const apiUrl = process.env.SYNCLOOP_URL;
        const syncloop_token = process.env.SYNCLOOP_TOKEN;
        if(!apiUrl || !syncloop_token){
            throw new Error("SyncLoop URL or token required")
        }
        const bodyData = {
            playlistId:playlistId,
            token:token,
            ytAPIkey:yt_api_key
        }
        const headers = {
            'Authorization': `Bearer ${syncloop_token}`,
            'Content-Type': 'application/json', 
        };

        axios.post(apiUrl, bodyData,{headers})
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while making the PUT request.' });
        });

    } catch (error) {
        console.error('Error making PUT request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})
// start express server
app.listen(port,()=>{
    console.log(`App is running on http://localhost:${port}`);
    console.log('Press CTRL-C to stop.');
})