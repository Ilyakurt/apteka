const express = require('express');
const app = express();

const PORT = 8080;

const router = require('./DatabaseActions.js')

// app.use("/api", router);
app.use(router)
app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
