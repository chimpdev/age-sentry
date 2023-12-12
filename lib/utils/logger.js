const { gray, green, red, blue, bold } = require('colorette');

class Logger {
  constructor() {
    global.logger = this;
  }

  log(message, icon, color, fileName) {
    if (typeof message === 'object') message = JSON.stringify(message, null, 2);

    const formattedMessage = (message) => {
      return `${bold(gray(new Date().toLocaleString()))} → ${message}`;
    };
    
    console.log(`${color(icon)}  ${gray(`(${fileName})`)} ${formattedMessage(message)}`);
  }

  send(message) {
    const stackTrace = new Error().stack;
    const lines = stackTrace.split('\n');
    const filePath = lines[2].split('at ')[1].trim();
    if (!filePath.match(/(?<=\\)(.*?)(?=:)/g)) return this.log(message, '', gray, 'Unknown');

    const fileName = filePath.match(/(?<=\\)(.*?)(?=:)/g)[0].split('\\').slice(-2).join('/');

    this.log(message, '', gray, fileName);
  }

  success(message) {
    const stackTrace = new Error().stack;
    const lines = stackTrace.split('\n');
    const filePath = lines[2].split('at ')[1].trim();
    if (!filePath.match(/(?<=\\)(.*?)(?=:)/g)) return this.log(message, '', gray, 'Unknown');

    const fileName = filePath.match(/(?<=\\)(.*?)(?=:)/g)[0].split('\\').slice(-2).join('/');

    this.log(message, '✔', green, fileName);
  }

  error(message) {
    const stackTrace = new Error().stack;
    const lines = stackTrace.split('\n');
    const filePath = lines[2].split('at ')[1].trim();
    if (!filePath.match(/(?<=\\)(.*?)(?=:)/g)) return this.log(message, '', gray, 'Unknown');

    const fileName = filePath.match(/(?<=\\)(.*?)(?=:)/g)[0].split('\\').slice(-2).join('/');

    this.log(message, '✖', red, fileName);
  }

  info(message) {
    const stackTrace = new Error().stack;
    const lines = stackTrace.split('\n');
    const filePath = lines[2].split('at ')[1].trim();
    if (!filePath.match(/(?<=\\)(.*?)(?=:)/g)) return this.log(message, '', gray, 'Unknown');

    const fileName = filePath.match(/(?<=\\)(.*?)(?=:)/g)[0].split('\\').slice(-2).join('/');

    this.log(message, 'ⓘ', blue, fileName);
  }
}

module.exports = Logger;