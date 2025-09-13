import { data } from "../data.js";

export const User = {
  events: (parent) => data.events.filter((event) => event.user_id == parent.id),
};

export default User;
