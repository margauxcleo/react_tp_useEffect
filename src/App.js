// import { useState, useEffect } from 'react';

// function App() {

//   const [values, setValues] = useState("");
//   const [datas, setDatas] = userState([]);

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
//       getPosts();
//       ssetDatas(posts);
//     }

//   const handleOnClickComments = (event) => {
//       event.preventDefault();
//       getComments();
//       setValues(comments);
//   }

//   useEffect(() => {
//     getUsers().then(users) => {
//      setDatas(users);
//    };
//   }, [values]);
  
//   useEffect(() => {
//     getPosts().then((posts) => {
        // setDatas(posts);
//      });
//   }, [values]);

//   useEffect(() => {
//     getComments().then((comments) => {
      //   setDatas(comments);
      // });
//   }, [values]);

//   return (
//     <>
//       <button onClick={handleOnClickUsers}>Users</button>
//       <button onClick={handleOnClickPosts}>Posts</button>
//       <button onClick={handleOnClickComments}>Comments</button>
//       <ul>
//         {datas.map((data) => {
//           return (
//             <li>
//               <p>{JSON.stringify(data)}</p>
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// }

// export default App;

// CORRECTION 

// on importe useState et UseEffect
import { useState, useEffect } from "react";
function App() {
  // on définit la ressource de l'url, établis à posts à l'initialisation (sinon msg erreur si vide)
  const [ressource, setRessource] = useState("posts");
  // on définit la data récupérer ici, pour la transformer en array, qui pourra être modifié avec map()
  const [data, setData] = useState([]);
  // on fait une requete asyncrhone pour l'appel ajax
  // on utilise la fonction JS (de base) fetch, qui facilite la création de la requête
  // la fonction getInfos prend en paramètre le path de l'url 
  // on a trois path différents ici, et cela permet de créer une fonction unique pour les 3 requêtes (posts, comments, users)
  const getInfos = async (path) => {
    const response = await fetch(
      // on précise donc ici le path qui complètera l'appel à l'API
      `https://jsonplaceholder.typicode.com/${path}`
    );
    // la "response" de cet appel sera stocké dans la const result et mis au format json avec la méthode json()
    const result = await response.json();
    // on précise que l'on return bien result, pour pouvoir l'utiliser ultérieurement
    return result;
  };

  // création de la fonction handleClick, qui prendra deux paramètres
  // event => toujours en paramètre dans une fonction évènementielle
  // path, car celui-ci sera donc modifié au click sur le bouton correspond
  // et sera définit à ressource avec la fonction du useState setRessource
  const handleClick = (event, path) => {
    event.preventDefault();
    setRessource(path);
  };

  // on utilise le useEffect ici pour que la requête ne soit faite qu'au changement de la ressource
  // cela permet que par exemple, meme si on clique pls fois sur le bouton post, la ressource n'aura pas changé,
  // donc la requête ne sera pas refaite 
  useEffect(() => {
    console.log(ressource);
    // on appelle ici la fonction getInfos qui fait l'appel AJAX
    // étant donné qu'il s'agit d'une fonction asyncrone, on établit des then() car les fonctions async sont des promesses 
    // on précise que si on obtient bien le result (donc la response.json()), on appellera la fonction setData et on lui attribue result
    // grâce au useState, la response.json sera donc stockée dans un array et correspondra à la valeur de data
    getInfos(ressource).then((result) => {
      console.log(result);
      setData(result);
    });
    // indiquer ressource ici signifie que le useEffect s'effectura à chaque fois que ressource sera modifié
  }, [ressource]);

  // dans le return
  // a chaque onClick, on attribut bien deux paramètres. 
  // event car c'est une fonction évènementielle
  // et la path qui correspond à chaque bouton 
  // on reverra le resultat de la requete on faisant un map sur data (qui est donc un array comprenant response.json())
  // on précise que pour chaque élément, on veut qu'une li soit créée
  // on utilise JSON.stringify sur chaque element car sinon cela créerait un msg d'erreur. 
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

// on n'oublie pas d'exporter le composant 
export default App;
