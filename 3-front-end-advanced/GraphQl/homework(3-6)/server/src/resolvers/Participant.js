import { data } from "../data.js";

export const Participant = {
  user: (parent) => data.users.find((user) => user.id == parent.user_id),
  event: (parent) => data.events.find((event) => event.id == parent.event_id),
};

export default Participant;
