const TelegramAPI = require('node-telegram-bot-api')
const {gameOptions,againOptions} = require('./options')
const token = '1810221919:AAEAwJ-_VeLKqcEf6kI7yyhdskujHq3MuoU';

const bot  = new TelegramAPI(token, {polling: true})


const chats = []


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "Я загадаю число от 0 до 9")
    const randomNumber = Math.floor((Math.random() * 10));
    chats[chatId] = randomNumber;
    return bot.sendMessage(chatId, "Отгадай", gameOptions)
}

const start = () =>{
    bot.setMyCommands([
        {
            command : "/start" ,
            description: "Start bot"
        },
        {
            command : "/info" ,
            description: "Info about user"
        },
        {
            command : "/game" ,
            description: "Game "
        },
        
    ])
    
    bot.on('message' , async (msg) => {
        const message = msg.text;
        const username = msg.chat.username;
        const chatId = msg.chat.id;
        if(message === "/start"){
            return bot.sendMessage(chatId , `Hi`)
        }
        if(message === "/info"){
            await bot.sendMessage(chatId , `You ${username}`)
            return bot.sendSticker(chatId,"https://tlgrm.eu/_/stickers/b16/009/b160099f-2bc1-4a57-9f9e-88f75d5b80bb/1.webp")
        }
        if( message === "/game"){
            startGame(chatId);

        }
        
        return bot.sendMessage(chatId , 'Ну шо ты вводишь не команды.Нажми кнопку возле стикеров,там команды')
       
    
    
    })
    bot.on('callback_query', async (msg) => {
        const chatId = msg.message.chat.id;
        const data  = msg.data;
        if( data === "/again"){
            startGame(chatId);

        }
        if(data == chats[chatId]){
          return await  bot.sendMessage(chatId , `Поздравляю ,ты отгадал цифру ${chats[chatId]}`, againOptions);
        }
        else{
            return await  bot.sendMessage(chatId , `К сожалению,ты проиграл.Бот загадал ${chats[chatId]}`,againOptions);
        }
    })
  
}
start()

