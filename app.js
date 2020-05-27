require('./db/db');
const express = require('express');
const cors = require('cors')
const apiRouter = require('./router/apiRouter');

const app = express();
app.use(cors({origin:true}) );
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(apiRouter);

module.exports = app;