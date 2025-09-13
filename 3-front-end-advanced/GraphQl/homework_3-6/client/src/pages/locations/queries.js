import { useQuery, gql } from "@apollo/client";

export const GetLocations = () => {
   const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      desc
      lat
      lng
    }
  }
`;

const { loading, error, data } = useQuery(GET_LOCATIONS);

 if(loading) return 1
 if(error) return 0

 return data

}
