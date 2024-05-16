const express = require('express');
const app = express();
const app_routes = require('./routes')
var cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();


app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use('/', app_routes);
const{startDatabase} = require('./db')

app.listen(3000, () => {
    startDatabase();
    console.log('Port 3000');
});

module.exports = app;