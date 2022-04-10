import React from "react";
import Post from "./Post";
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
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default Posts;
