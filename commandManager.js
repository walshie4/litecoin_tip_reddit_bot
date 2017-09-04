function isBotCommand(msg) {
  return /\+LTC tip/i.test(msg);
}

function isRegisterCommand(msg) {
  return /\+register/i.test(msg);
}

function isTipCommand(msg) {
  return /\+tip/i.test(msg);
}

function isWithdrawCommand(msg) {
  return /\+withdraw/i.test(msg);
}

module.exports = {
  isBotCommand,
  isRegisterCommand,
  isTipCommand,
  isWithdrawCommand,
};
