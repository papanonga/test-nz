const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

app.use(express.json())
app.use(require('./src/routes/routes'))

app.listen(port, () => {
    console.log(`listen on port ${port}`)
})
