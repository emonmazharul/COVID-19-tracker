require('./db/connection')
const express = require('express');
const cors = require('cors')
const session = require('express-session');
const Store = require('connect-mongo')(session);
const userRouter = require('./router/apiRouter');
const clientRouter = require('./router/clientRouter');
const app = express();

app.use(cors({origin:true,credentials:true}));
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(express.static('./client/dist'))
app.use(session({
		name:process.env.SESSION_NAME,
		secret:process.env.SESSION_SECRET,
		resave:false,
		saveUninitialized:false,
		cookie:{
			maxAge:1000*60*60*(24*30),
		},
		store: new Store({
			url:process.env.MONGODB_URL,
		})
	})
)

app.use(userRouter);
app.use(clientRouter);

module.exports = app;