const litecoin = require('node-litecoin');

const MIN_CONFIRMATIONS = 6;
const LOCK_TIMEOUT = 3;

const ltc = new litecoin({
  host: 'localhost',
  port: 8832,
  username: process.env.LTC_USER,
  pass: process.env.LTC_PASS,
});

function getAddressForUser(user) {
  return ltc.getNewAddress(user);
}

function getBalanceForAddress(address) {
  return ltc.getReceivedByAddress(address);
}

function sendCoinsFromTo(sendToAddress, sendFromAddress, sendFromUser, amount) {
  const memo = `Sending ${amount} from ${sendFromUser} ${sendFromAddress} to ${sendToAddress}`;
  return ltc.sendFrom(sendFromUser, sendToAddress, amount, MIN_CONFIRMATIONS, memo);
}

function lockWallet() {
  return ltc.walletLock();
}

function unlockWallet() {
  const pass = process.env.LOCK_PASSPHRASE;
  return ltc.walletPassPhrase(pass, LOCK_TIMEOUT);
}



module.exports = {
  getAddressForUser,
  getBalanceForAddress,
  sendCoinsFromTo,
  lockWallet,
  unlockWallet,
};
