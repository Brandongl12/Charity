const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

// Use global fetch if available (Node 18+); otherwise, lazy-load node-fetch (v3 ESM)
const fetchFn = (...args) => (typeof fetch !== 'undefined'
  ? fetch(...args)
  : import('node-fetch').then(({ default: f }) => f(...args)));

// HTTPS Function: /api/ia (via hosting rewrite)
// Requires secret: GEMINI_API_KEY (set via `firebase functions:secrets:set GEMINI_API_KEY`)
exports.ia = functions
  .runWith({ secrets: ['GEMINI_API_KEY'] })
  .https.onRequest((req, res) => {
    // Enable CORS
    cors(req, res, async () => {
      if (req.method !== 'POST') {
        return res.status(405).json({ respuesta: 'Método no permitido. Usa POST.' });
      }
      try {
        const { pregunta } = req.body || {};
        if (!pregunta || typeof pregunta !== 'string') {
          return res.status(400).json({ respuesta: 'Falta el campo "pregunta".' });
        }

        const apiKey = process.env.GEMINI_API_KEY || '';
        if (!apiKey) {
          return res.status(500).json({ respuesta: 'Falta la API key de Gemini en el servidor.' });
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const response = await fetchFn(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { parts: [{ text: pregunta }] }
            ]
          })
        });

        const data = await response.json();
        const respuesta = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta de la IA.';
        return res.json({ respuesta });
      } catch (error) {
        return res.status(500).json({ respuesta: 'Error al consultar la IA.' });
      }
    });
  });

