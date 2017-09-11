require('dotenv').config();
const Snoostorm = require('snoostorm');
const Snoowrap = require('snoowrap');
const { version } = require('./package');
const {
  isBotCommand,
  isBalanceCommand,
  isAddressCommand,
  isTipCommand,
  isWithdrawCommand,
} = require('./commandManager');
const {
  getAddressForUser,
  getBalanceForAddress,
  sendCoinsFromTo,
  lockWallet,
  unlockWallet,
} = require('./wallet');

// Setup clients and run

const reddit = new Snoowrap({
  userAgent: `reddit-bot:node:litecoin-tipping:${version}`,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS,
});

const client = new Snoostorm(reddit);

const streamOpts = {
  subreddit: 'litecoin',
  results: 10,
  pollTime: 2000,
};

var commentStream = client.CommentStream(streamOpts);

commentStream.on('comment', onComment);


// Event handlers
function onComment(comment) {
  console.log(comment);
  const { body, linkUrl, author } = comment;
  if (isBotCommand(body)) {
    console.log('command found! ', body);
    if (isTipCommand(body)) {
      const balance = getBalanceForAddress();
    }
  }
}

function onPrivateMessage(msg) {
  console.log(msg);
  const { body } = msg;
  let user, address;
  if (isAddressCommand(msg)) {
    getAddressForUser(user);
  } else if (isWithdrawCommand) {
    unlockWallet();
    sendCoinsFromTo();
  } else if (isBalanceCommand) {
    const balance = getBalanceForAddress(address);
  } else {
    console.log(`Unknown command found in PM with body: ${body}`);
    // TODO Send back unknown command message
  }
}


// Reddit API interactions
function processUnreadMessages() {
  return Promise.map(reddit.getUnreadMessages(), onPrivateMessage);
}
