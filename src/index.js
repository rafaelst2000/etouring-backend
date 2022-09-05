const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const dotenv = require('dotenv')
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use((req, res) => {
  res.status(404).send({ message: 'Nothing to be seen here.' });
})
app.listen(3333)

/* NOT FOUND */