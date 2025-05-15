import axios from "axios";

const getData = async (userId) => {
  const user = await axios(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  const post = await axios(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );

  return {
    users: user.data,
    posts: post.data,
  };
};

export default getData;
