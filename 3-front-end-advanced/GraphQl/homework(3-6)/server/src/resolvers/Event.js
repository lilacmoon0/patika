import { data } from "../data.js";

export const Event = {
  user: (parent) => {
    return data.users.find((user) => user.id == parent.user_id);
  },

  location: (parent) =>
    data.locations.find((location) => location.id == parent.location_id),
  participants: (parent) =>
    data.participants.filter(
      (participant) => participant.event_id == parent.id
    ),
};

export default Event;
