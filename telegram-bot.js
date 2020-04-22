import TelegramBot from 'node-telegram-bot-api';
const token = '1147541859:AAEdivgSKW97qWA_v-Vn38eXwESf1qnt7x4';
const bot = new TelegramBot(token, {polling: true});
const notes = [];
bot.onText(/Wrtieln (.+) в (.+)/, (msg, match) => {
    const userId = msg.from.id;
    const text = match[1];
    const time = match[2];
    notes.push({ 'uid': userId, 'time': time, 'text': text });

    bot.sendMessage(userId, 'Fail :)');
});

setInterval(() => {
    for (let i = 0; i < notes.length; i++) {
    const curDate = `${new Date().getHours()}:${new Date().getMinutes()}`;
    if (notes[i]['time'] === curDate) {
      bot.sendMessage(notes[i]['uid'], `Have to: ${notes[i]['text']} now.`);
      notes.splice(i, 1);
    }
  }
}, 1000);
