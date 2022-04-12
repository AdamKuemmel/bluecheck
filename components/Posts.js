import React from "react";
import Post from "./Post";
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase";
import { collection, orderBy, query } from "firebase/firestore";

const posts = [
  {
    id: "123",
    username: "atom_eater",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "IM AM FRONT_END GURU and im tryna get rich or die tryin",
  },
  {
    id: "123",
    username: "atom_eater",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "IM AM FRONT_END GURU and im tryna get rich or die tryin",
  },
  {
    id: "123",
    username: "atom_eater",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "IM AM FRONT_END GURU and im tryna get rich or die tryin",
  },
];

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),

    [db]
  );

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
