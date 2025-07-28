import { useQuery, gql } from "@apollo/client";

export const GetEvents = () => {
   const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      desc
      date
      from
      to
      location_id
      user_id
      user {
        username
      }
      location {
        name
      }
    }
  }
`;

const { loading, error, data } = useQuery(GET_EVENTS);

 if(loading) return 1
 if(error) return 0

 return data

}
