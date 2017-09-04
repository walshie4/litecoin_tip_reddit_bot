const litecoin = require('node-litecoin');

const ltc = new litecoin({
  host: 'localhost',
  port: 8832,
  username: process.env.LTC_USER,
  pass: process.env.LTC_PASS,
});


