export const Mutation = {
  createUser: (_, args, { database, pubsub }) => {
    const newUser = {
      id: database.users.length + 1,
      username: args.username,
    };

    for (let i = 1; i <= database.users.length + 1; i++) {
      if (!database.users.find((user) => user.id === i)) {
        newUser.id = i;
        break;
      }
    }

    database.users.push(newUser);

    pubsub.publish("userAdded", { userAdded: newUser });

    return newUser;
  },
  createMessage: (_, args, { database, pubsub }) => {
    const newMessage = {
      id: database.messages.length + 1,
      ...args.input,
    };

    for (let i = 1; i <= database.messages.length + 1; i++) {
      if (!database.messages.find((message) => message.id === i)) {
        newMessage.id = i;
        break;
      }
    }

    database.messages.push(newMessage);

    pubsub.publish("messageAdded", { messageAdded: newMessage });

    return newMessage;
  },
};
