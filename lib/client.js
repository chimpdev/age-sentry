const Discord = require('discord.js');

class Client {
  constructor(token) {
    this.token = token;
    this.client = this.createClient();
  }

  createClient() {
    const partials = [Discord.Partials.Message];
    const intents = [Discord.IntentsBitField.Flags.MessageContent, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.Guilds];

    return new Discord.Client({ 
      partials,
      intents,
      presence: { status: 'online' }
    });
  }

  start() {
    this.client.login(this.token).catch(error => {
      logger.error(`There was an while logging in\n${error}`);
      process.exit(1);
    }).then(() => {
      logger.info(`Logged in as ${this.client.user.tag}`);
    });

    this.listenEvents();
  }

  listenEvents() {
    this.client.on(Discord.Events.ClientReady, () => {
      logger.info(`${this.client.user.tag} is ready`);
    });

    this.client.on(Discord.Events.MessageCreate, async message => {
      if (!message.guild) return;
      if (message.author.bot) return;
      if (!message.content) return;

      const match = await this.checkForInterpretation(message);
      if (!match) return;

      const channel = message.author.dmChannel || await message.author.createDM().catch(() => null);
      if (!channel) return;

      this.sendInfoMessage(message, match, channel);
    });

    this.client.on(Discord.Events.MessageUpdate, async (oldMessage, newMessage) => {
      if (!newMessage.guild) return;
      if (newMessage.author.bot) return;
      if (!newMessage.content) return;

      const match = await this.checkForInterpretation(newMessage);
      if (!match) return;

      const channel = newMessage.author.dmChannel || await newMessage.author.createDM().catch(() => null);
      if (!channel) return;

      this.sendInfoMessage(newMessage, match, channel);
    });
  }

  sendInfoMessage(message, match, channel) {
    const components = [new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setLabel('Message')
          .setURL(message.url)
          .setStyle(Discord.ButtonStyle.Link),
        new Discord.ButtonBuilder()
          .setLabel('More Info by NTTS on YouTube')
          .setURL('https://www.youtube.com/watch?v=5CUBJgknoW0')
          .setStyle(Discord.ButtonStyle.Link)
      )];

    channel.send({ 
      content: this.generateInfoMessage(message.author.username, match),
      components 
    }).catch(error => {
      logger.error(`There was an error while sending message\n${error.stack}`);
    }).then(() => {
      logger.success(`Sent message to @${message.author.username}`);
    });
  }

  async checkForInterpretation(message) {
    const numberRegexp = /\b(?:1[0-2]|[1-9])\b|(?<=\D|^)(?:1[0-2]|[1-9])(?=\D|$)/;
    const underageRegexp = /underage|under age/i;
    const match = message.content.match(numberRegexp)?.[0] || message.content.match(underageRegexp)?.[0];

    if (!match) return false;
    else return match;
  }

  generateInfoMessage(username, match) {
    return `Hi ${username},

I noticed that you sent a message containing the ${match}.

This could be interpreted as your age, which is against Discord's Terms of Service.
You may want to edit or delete your message to avoid getting in trouble. Just be careful next time.
I have sent this message to you privately to avoid any misunderstandings that may lead to account trouble.
Please be careful when sending messages containing numbers or words that could be interpreted as your age.

If you don't want to receive these messages anymore, just block me. I won't be offended.

Thanks,
Age Sentry`;
  }
}

module.exports = Client;