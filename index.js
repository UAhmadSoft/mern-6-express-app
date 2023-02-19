const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;

const userRouter = require('./routers/userRouter');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/api', bodyParser.json());

app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
