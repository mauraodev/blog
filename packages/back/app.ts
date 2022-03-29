import feathers from '@feathersjs/feathers';

interface Message {
  id?: number;
  text: string;
}

class MessageService {
  messages: Message[] = [];

  async find() {
    return this.messages;
  }

  async create (data: Pick<Message, 'text'>) {
    // The new message is the data text with a unique identifier added
    // using the messages length since it changes whenever we add one
    const message: Message = {
      id: this.messages.length,
      text: data.text
    }

    // Add new message to the list
    this.messages.push(message);

    return message;
  }
}

const app = feathers();

app.use('messages', new MessageService());

app.service('messages').on('created', (message: Message) => {
  console.log('A new message has been created', message);
});

// A function that creates messages and then logs
// all existing messages on the service
const main = async () => {
  // Create a new message on our message service
  await app.service('messages').create({
    text: 'Hello Feathers'
  });

  // And another one
  await app.service('messages').create({
    text: 'Hello again'
  });
  
  // Find all existing messages
  const messages = await app.service('messages').find();

  console.log('All messages', messages);
};

main();