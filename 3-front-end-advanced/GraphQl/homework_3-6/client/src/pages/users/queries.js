import { useQuery, gql } from "@apollo/client";

export const GetUsers = () => {
   const GET_USERS = gql`
  query GetUsers {
    users {
      username
      email
      id
    }
  }
`;

const { loading, error, data } = useQuery(GET_USERS);

 if(loading) return 1
 if(error) return 0

 return data

}
