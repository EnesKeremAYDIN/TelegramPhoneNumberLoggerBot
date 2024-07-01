const TelegramBot = require('node-telegram-bot-api');

const token = "";
const bot = new TelegramBot(token, { polling: true });

console.log('Bot started.');

bot.onText(/^\/start/, function (msg, match) {
    var option = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "My phone number",
                request_contact: true
            }]]
        }
    };
    bot.sendMessage(msg.chat.id, `Hi! Send me your phone number.`, option).then(() => {
        bot.once('contact', (msg) => {
            const phoneNumber = msg.contact.phone_number;
            const username = msg.from.username;
            const firstname = msg.from.first_name;
            const lastname = msg.from.last_name;

            console.log(`User: ${firstname} ${lastname} (${username}), Phone Number: ${phoneNumber}`);

            bot.sendMessage(msg.chat.id, `Thanks.`, {
                reply_markup: {
                    remove_keyboard: true
                }
            });
        });
    });
});
