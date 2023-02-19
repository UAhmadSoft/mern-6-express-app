const mongoose = require('mongoose');

const url = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<DB_NAME>', process.env.DB_NAME);

console.log('url', url);

module.exports = async () => {
  // mongoose.connect(url, (err, data) => {
  //   if (err) throw err;

  //   console.log('data', data);
  // });
  // mongoose
  //   .connect(url)
  //   .then((data) => {
  //     console.log('data', data);
  //   })
  //   .catch((err) => {
  //     console.log('err', err);
  //   });
  try {
    const data = await mongoose.connect(url);
    console.log('DB Connected');
  } catch (error) {
    console.log('error', error);
  }
};
