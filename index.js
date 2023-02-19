require('dotenv').config({
  path: './config.env',
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const dbConnect = require('./utils/DBConnect');

const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/api', bodyParser.json());

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

dbConnect();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
