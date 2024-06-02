import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_LOCATIONS = gql`
  query {
    getAllVideos {
      id
      videoUrl
      createdAt
      updatedAt
      likes
      dislikes
      comments {
        id
        content
        nickname
      }
    }
  }
`;

function App() {
  const [count, setCount] = useState(0);

  // const { loading, error, data } = useQuery(GET_LOCATIONS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;

  // console.log(data);

  return (
    <div className="border w-12 b-12 border-b-2 border-b-red-500">안녕</div>
  );
}

export default App;
