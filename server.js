const express = require('express');
const routes = require('./routes');

const app = express();

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
})