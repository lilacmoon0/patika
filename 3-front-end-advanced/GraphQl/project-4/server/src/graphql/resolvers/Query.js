export const Query = {
  users: (_, __, { database }) => database.users,
  user: (_, args, { database }) =>
    database.users.find((user) => user.id === args.id),
  messages: (_, __, { database }) => database.messages,
  message: (_, args, { database }) =>
    database.messages.find((message) => message.id === args.id),
};
