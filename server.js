// Loading env variables into process.env
require('dotenv').config();
const { HTTPS_PORT = 3001, HTTP_PORT = 3000, LS_PORT } = process.env;

// Importing key and certificate
const fs = require('fs');
const key = fs.readFileSync('./https setup/lsc/localhost.decrypted.key');
const cert = fs.readFileSync('./https setup/lsc/localhost.crt');

// Creating an express app
const express = require('express');
const app = express();

// Creating an https server using key, cert and express app
const https = require('https');
const server = https.createServer({ key, cert }, app);

// HTTPS server listening on PORT 3001 and Express App (http) listening on PORT 3000
server.listen(HTTPS_PORT, () =>
  console.log(`HTTPS listening on PORT ${HTTPS_PORT}...`)
);
app.listen(HTTP_PORT, () =>
  console.log(`HTTP listening on PORT ${HTTP_PORT}...`)
);

// Implementing CORS middleware
const cors = require('cors');
app.use(
  cors({
    origin: `http://localhost:${LS_PORT}`,
    credentials: true
  })
);

// Implementing express-session middleware
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(
  session({
    secret: 'ayush',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/users', 
      ttl: 14 * 24 * 60 * 60,
      autoRemove: 'native',
      touchAfter: 24 * 3600
    }),
    cookie: { sameSite: 'none', secure: true }
  })
);

// Implementing JSON parsing middleware
app.use(express.json());

// Implementing logged_in status handler
app.get('/api/check_logged', (req, res, next) => {
  if (!req.session.user_id) return res.json({ logged_in: false });
  res.json({ ...req.session.user_data, logged_in: true });
});

// Importing auth route (login and signup) before authenticator
app.use('/api/auth', require('./routes/auth_routes'));

// Implementing authenticator
app.use(async (req, res, next) => {
  if (req.session.user_id) return next();
  res.status(401).json({ message: 'Login required' });
});

// Importing account routes
app.use('/api/account', require('./routes/account_routes'));

// Importing car routes
app.use('/api/cars', require('./routes/car_routes'));

// Global error handler at the bottom (all errors should reach here)
app.use((err, req, res, next) => {
  const { stack, sqlMessage, sql, code } = err;
  const f = n => (n == 0 ? `\u001b[0m` : `\u001b[38;5;${n}m`);
  const red = f(203), yll = f(226), cyn = f(33), grn = f(48), esc = f(0); // prettier-ignore
  console.log(`
    ${red + stack + esc}
    ${grn + `> SQL Msg : ` + sqlMessage + esc}
    ${cyn + `> SQL Qry : ` + sql + esc}
    ${yll + `> Err Cod : ` + code + esc}
    `);
  res.status(500).json({ message: 'Something went really wrong' });
});
