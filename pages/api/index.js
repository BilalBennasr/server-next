// api/index.js
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());

// Exemple de route pour le chat
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY, // définit ta clé via les variables d'environnement sur Vercel
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: userMessage,
      max_tokens: 150,
    });
    
    res.json({ response: completion.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la génération de la réponse' });
  }
});

// Export de l'application en fonction serverless
module.exports = serverless(app);
