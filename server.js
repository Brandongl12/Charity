// Servidor básico Express para IA (puedes adaptar la ruta /api/ia)
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba para IA
app.post('/api/ia', async (req, res) => {
  // Aquí iría la lógica para conectar con OpenAI, Gemini, etc.
  // Por ahora responde fijo para pruebas
  const pregunta = req.body.pregunta;
  res.json({ respuesta: `Respuesta simulada para: ${pregunta}` });
});

app.get('/', (req, res) => {
  res.send('Servidor IA funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
