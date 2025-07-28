export const User = {
  messages: (parent, _, { database }) =>
    database.messages.filter((message) => message.userId === parent.id),
};
