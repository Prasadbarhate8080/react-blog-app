import React, { useEffect, useState } from "react";
import { Query } from "appwrite";
import appwriteService from "../appWrite/config";
import { Container, PostCard } from "../components";
import "./Home.css";

function Home() {
  const [skip, setSkip] = useState(0)
  console.log(skip)
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts(
      [
        Query.equal("status", "active"),
        Query.limit(6),
        Query.offset(skip)
      ]
    ).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, [skip]);
  if (posts.length === 0) {
    return (
      <div className="w-full min-h-60  text-center">
        <Container>
          <section className="bg-gradient-to-r from-blue-100 to-blue-200 text-center py-12 px-4 sm:px-8 lg:px-16">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#222222] leading-tight">
                Share Your Stories, Discover New Ideas
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#555555]">
                Share ideas, explore trends, and connect with readers.
              </p>
              <a href="/add-post" className="bg-blue-600 text-white py-3 px-8 rounded-md font-semibold transition duration-300 hover:bg-blue-700">
                Add Your Blog
              </a>
            </div>

            {/* Background Illustration for better UI */}
            <div className="hidden md:block absolute inset-0 opacity-10 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="50%" cy="50%" r="40%" fill="#ffffff" />
              </svg>
            </div>
          </section>

          <h1 className="mt-5 text-[32px] font-semibold text-[#495057] mx-[14px] text-left">
            Trending Topics
          </h1>
          <div className="flex flex-wrap">
            <div className="p-2 w-full mt-2 min-h-40 flex bg-[#f7f7f7] justify-center items-center">
              <h1 className="text-2xl font-bold mt-10">No posts found</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full  ">
      <Container>
        <section className="bg-gradient-to-r from-blue-100 to-blue-200 text-center py-12 px-4 sm:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#222222] leading-tight">
              Share Your Stories, Discover New Ideas
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#555555]">
              Share ideas, explore trends, and connect with readers.
            </p>
            <a href="/add-post"  className="bg-blue-600 text-white py-3 px-8 rounded-md font-semibold transition duration-300 hover:bg-blue-700">
              Add Your Blog
            </a>
          </div>

          {/* Background Illustration for better UI */}
          <div className="hidden md:block absolute inset-0 opacity-10 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="50%" cy="50%" r="40%" fill="#ffffff" />
            </svg>
          </div>
        </section>

        <div className="mt-8 text-[32px] font-semibold text-[#495057] mx-[14px]">
          <span>Trending Topics</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center mt-8 p-4 mx-[14px]  bg-[#f7f7f7]">
          {posts.map((post) => (
            <div key={post.$id} className="">
              <PostCard {...post} fileId={post.featuredimage} />
            </div>
          ))}
        </div>
          <div className="flex justify-center gap-5 mt-2">
            <button onClick={() => {setSkip(prev => prev - 6)}} className="px-3 py-1 rounded-md active:bg-gray-200 border-2  text-md">Prev</button>
            <button onClick={() => {setSkip(prev => prev + 6)}} className="px-3 py-1 rounded-md active:bg-gray-200 border-2  text-md">Next</button>
          </div>
      </Container>
    </div>
  );
}

export default Home;
