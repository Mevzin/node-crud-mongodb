require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const personRoutes = require("./routes/personRoutes");

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json());


app.get('/', (req, res) => {

  res.json({ message: 'Oi Express!'});

})

app.use('/person', personRoutes);

const DB_USER = process.env.DB_USER_NAME; 
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASS);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.rwbzk.mongodb.net/bancoDaApi?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(3000);

  })
  .catch(err => console.log(err))