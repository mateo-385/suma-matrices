import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Ruta para sumar matrices
app.post('/sumar-matrices', (req, res) => {
  const { matriz1, matriz2 } = req.body

  // Validar que ambas matrices tengan las mismas dimensiones
  if (
    matriz1.length !== matriz2.length ||
    matriz1[0].length !== matriz2[0].length
  ) {
    return res
      .status(400)
      .json({ error: 'Las matrices deben tener las mismas dimensiones' })
  }

  const resultado = matriz1.map((fila, i) =>
    fila.map((valor, j) => valor + matriz2[i][j])
  )

  res.json({ resultado })
})

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`)
})
