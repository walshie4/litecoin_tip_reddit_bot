require('dotenv').config();
const Snoostorm = require('snoostorm');
const Snoowrap = require('snoowrap');
const { version } = require('./package');
const { isBotCommand } = require('./commandManager');

// Setup clients and run

const wrapper = new Snoowrap({
  userAgent: `reddit-bot:node:litecoin-tipping:${version}`,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS,
});

const client = new Snoostorm(wrapper);

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
  }
}
