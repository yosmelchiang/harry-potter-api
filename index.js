const app = require('./app.js')
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`HTTP server is listening at http://localhost:${PORT}`)
})