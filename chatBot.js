var WebSocket = require('ws');
var chatBot = new WebSocket('http://localhost:3001');

class ChatMessage {
  constructor({
      message: m,
      user: u = "GeneBot",
      timestamp: t = (new Date()).getTime()
  }) {
      this.message = m;
      this.user = u;
      this.timestamp = t;
  }
  serialize() {
      return {
          user: this.user,
          message: this.message,
          timestamp: this.timestamp
      };
  }
}

function sendBotMessage(message) {
  let botMessage = new ChatMessage({
    message
  });
  chatBot.send(JSON.stringify(botMessage.serialize()));
}

var rocketIsReady = false;

var helloMessage = function (){
    chatBot.on('open', function open() {
      sendBotMessage('Hello friend, let\'s talk');
  });
};

var checkMessageForChatBot = function (data, clientSocket) {
  data = JSON.parse(data);
    if (data.message === 'Gene, send Mask to cosmos'){
      sendBotMessage('Okay, wait when rocket ready to start');
      let firstInterval = setInterval(() => {
          sendBotMessage('Rocket ready to start');
          rocketIsReady = true;
          clearInterval(firstInterval); 
        }, 3000);
      let secondInterval = setInterval(() => {
          sendBotMessage('You must write "/start" to start');
          clearInterval(secondInterval);
        }, 4000);
    }
    if (data.message === '/start' && rocketIsReady){
        let intervalCounter = 1;
        let startInterval = setInterval(() => {
            if (intervalCounter == 6){
                sendBotMessage('Goooo! We sent Mask to cosmos');
                clearInterval(startInterval);
            } else{
              sendBotMessage(intervalCounter.toString());
            };
            intervalCounter++ 
          }, 1000);
    }
}

module.exports = { helloMessage, checkMessageForChatBot }