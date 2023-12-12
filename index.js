require('dotenv').config();

const Logger = require('./lib/utils/logger');
new Logger();

const Client = require('./lib/client');
new Client(process.env.BOT_TOKEN).start();