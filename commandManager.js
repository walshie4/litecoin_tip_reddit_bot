function isBotCommand(msg) {
  return /\+LTC tip/i.test(msg);
}

function isAddressCommand(msg) {
  return /\+address/i.test(msg);
}

function isTipCommand(msg) {
  return /\+tip/i.test(msg);
}

function isWithdrawCommand(msg) {
  return /\+withdraw/i.test(msg);
}

function isBalanceCommand(msg) {
  return /\+balance/i.test(msg);
}

module.exports = {
  isBotCommand,
  isAddressCommand,
  isTipCommand,
  isWithdrawCommand,
  isBalanceCommand,
};
