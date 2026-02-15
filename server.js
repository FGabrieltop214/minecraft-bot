'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const port = 3000;

// Discord Bot Configuration
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

bot.once('ready', () => {
  console.log('Bot is online!');
});

// API Endpoints
app.use(bodyParser.json());

app.post('/api/message', (req, res) => {
  const { content } = req.body;
  if (content) {
    // Send message to Discord channel
    // Channel ID should be specified accordingly
    const channel = bot.channels.cache.get('YOUR_CHANNEL_ID');
    if (channel) {
      channel.send(content);
      return res.status(200).send('Message sent!');
    } else {
      return res.status(404).send('Channel not found.');
    }
  }
  res.status(400).send('No message content provided.');
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});

// Log into Discord Bot
bot.login('YOUR_BOT_TOKEN');