import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Autoriser les requêtes CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://bilalbennasr.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Répondre aux pré-requêtes OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Vérifier que la méthode est POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages,
      temperature: 0,
      stream: false
    });

    res.status(200).json({ reply: completion.choices[0].message.content });

  } catch (error) {
    console.error('Erreur OpenAI:', error);
    res.status(500).json({ error: 'Erreur du serveur' });
  }
}