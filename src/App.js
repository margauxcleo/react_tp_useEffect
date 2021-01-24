// import { useState, useEffect } from 'react';

// function App() {

//   const [values, setValues] = useState("");
//   const [data, setData] = userState([]);

//   const getUsers = async () => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const users = await response.json();
//     return users;
//   };

//   const getPosts = async () => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const posts = await response.json();
//     return posts;
//   };

//   const getComments = async () => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/comments");
//     const comments = await response.json();
//     return comments;
//   };

//   const handleOnClickUsers = (event) => {
//     event.preventDefault();
//     setValues(users);
//   }

//   const handleOnClickPosts = (event) => {
//       event.preventDefault();
//       setValues(""); 
//       setValues(posts);
//     }

//   const handleOnClickComments = (event) => {
//       event.preventDefault();
//       setValues(""); 
//       setValues(comments);
//   }

//   useEffect(() => {
//     getUsers();
//   }, []);
  
//   useEffect(() => {
//     getPosts();
//   }, []);

//   useEffect(() => {
//     getComments();
//   }, []);

//   return (
//     <>
//       <button onClick={handleOnClickUsers}>Users</button>
//       <button onClick={handleOnClickPosts}>Posts</button>
//       <button onClick={handleOnClickComments}>Comments</button>
//       <ul>
//         {values.map((value) => {
//           return (
//             <li key={value}>
//               <p>{JSON.stringify(value)}</p>
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// }

// export default App;

// CORRECTION 

import { useState, useEffect } from "react";
function App() {
  const [ressource, setRessource] = useState("posts");
  const [data, setData] = useState([]);
  const getInfos = async (chaussette) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${chaussette}`
    );
    const result = await response.json();
    return result;
  };
  const handleClick = (event, chaussette) => {
    event.preventDefault();
    setRessource(chaussette);
  };
  useEffect(() => {
    console.log(ressource);
    getInfos(ressource).then((result) => {
      console.log(result);
      setData(result);
    });
  }, [ressource]);
  return (
    <>
      <div>
        <button onClick={(event) => handleClick(event, "users")}>USERS</button>
        <button onClick={(event) => handleClick(event, "comments")}>
          COMMENTS
        </button>
        <button onClick={(event) => handleClick(event, "posts")}>POSTS</button>
      </div>
      <div>
        <ul>
          {data.map((element) => (
            <li>{JSON.stringify(element)}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default App;
