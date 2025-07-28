import { useQuery, gql } from "@apollo/client";

export const GetStats = () => {
   const GET_STATS = gql`
  query GetStats {
    users {
      id
    }
    events {
      id
    }
    locations {
      id
    }
  }
`;

const { loading, error, data } = useQuery(GET_STATS);

 if(loading) return 1
 if(error) return 0

 return data

}
