import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index.js";
import appwriteService from "../appWrite/config.js";
import { Query } from "appwrite";
import { useSelector } from "react-redux";

function YourPosts() {
  const userid = useSelector((state) => state.auth.userData?.$id);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([Query.equal("userid", userid)]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  if (posts.length == 0) {
    return (
      <div className="flex flex-wrap">
        <div className="p-2 w-full mt-2 min-h-40 flex bg-[#f7f7f7] justify-center items-center">
          <h1 className="text-2xl font-bold mt-10">No posts found</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="grid min-h-50 md:min-h-[40px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mt-8 p-4 mx-[14px]  bg-[#f7f7f7]">
            {posts.map((post) => (
              <div key={post.$id} className="h-full w-full flex justify-center ">
                <PostCard {...post} fileId={post.featuredimage} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default YourPosts;
