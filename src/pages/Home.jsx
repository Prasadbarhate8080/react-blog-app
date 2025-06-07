import React, { useEffect, useState } from "react";
import { Query } from "appwrite";
import { Link } from "react-router-dom";
import appwriteService from "../appWrite/config";
import { Container, PostCard } from "../components";
import {v4 as uuid} from "uuid"
import "./Home.css";

function Home() {
  const [skip, setSkip] = useState(0)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [totalDocuments, setTotalDocuments] = useState(0)

  useEffect(() => {
    setLoading(true)
    appwriteService.getPosts(
      [
        Query.equal("status", "active"),
        Query.limit(6),
        Query.offset(skip)
      ]
    ).then((posts) => {
      if (posts) {
        setTotalDocuments(posts.total)
        setPosts(posts.documents);
      }
    }).catch((error) => {
      alert(error)
    })
    .finally(function () {
     setLoading(false)
    })
  }, [skip]);

  useEffect(() => {
    const offSet = new Set();
    if(totalDocuments > 3)
    {
      while(offSet.size < 3)
      {
        let n = Math.floor(Math.random() * totalDocuments)
        // console.log(n,totalDocuments)
        if(offSet.has(n))  continue;
        offSet.add(n);
      }
      // console.log(offSet)
    }

    if(offSet.size == 3 ){
      for(let i of offSet){
        appwriteService.getPosts(
        [
          Query.equal("status", "active"),
          Query.limit(1),
          Query.offset(i)
        ])
        .then((post) => {
          if(post)
          {
            setFeaturedPosts((prev) => { 
              if(prev.length == 3)
                return [...prev]
              else
                return [...prev, post.documents[0]]
            }
          )
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }, [totalDocuments])

  if(loading)
  {
    return (
      <Container>
        <section className="relative bg-gradient-to-r from-blue-100 to-blue-200 text-center py-12 px-4 sm:px-8 lg:px-16">
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

            <div className="hidden md:block absolute inset-0 opacity-10 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="50%" cy="50%" r="40%" fill="#ffffff" />
              </svg>
            </div>
          </section>

          <div className="mt-8 text-[32px] font-semibold text-[#495057] mx-[14px]">
            <span>Trending Topics</span>
          </div>
        <div className="p-2 w-full mt-2 min-h-50 md:min-h-[847px]  flex bg-[#f7f7f7] justify-center items-center">
          <div className="h-20  w-20 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
        </div>
        <div className="flex justify-center gap-5 mt-10">
            <button
              onClick={() => {if(skip >= 6) setSkip(prev => prev - 6)}}
              type="button" className=" text-white rounded-l-md border-r border-gray-100 py-2 bg-gray-800 hover:bg-gray-900 hover:text-white px-3">
              <div className="flex flex-row align-middle">
                <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                </svg>
                <p className="ml-2">Prev</p>
              </div>
            </button>
            <button
              onClick={() => {setSkip(prev => prev + 6)}}
              type="button" className=" text-white rounded-r-md py-2 border-l border-gray-200 bg-gray-800 hover:bg-gray-900 hover:text-white px-3">
              <div className="flex flex-row align-middle">
                <span className="mr-2">Next</span>
                <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </button>
          </div>
        <Container>
        <div>
          <h1 className="mt-5 text-[32px] font-semibold text-[#495057] mx-[14px] text-left">
            Featured Posts
          </h1>
          <div className="mt-8 p-4 mx-[14px] gap-6 justify-between items-center bg-[#f7f7f7] flex flex-wrap">
            {
              featuredPosts.length > 0 ? (
                featuredPosts.map((post) => (
                  <PostCard key={uuid()} {...post} fileId={post?.featuredimage} />
                ))
              ) : 
              (
                <div></div>
              )
            }
          </div>
        </div>
      </Container>
    </Container>
    )
  }
  if (posts.length === 0) {
    return (
      <div className="w-full  text-center">
        <Container>
          <section className="relative bg-gradient-to-r from-blue-100 to-blue-200 text-center py-12 px-4 sm:px-8 lg:px-16">
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
                <circle cx="50%" cy="20%" r="40%" fill="#ffffff" />
              </svg>
            </div>
          </section>

          <h1 className="mt-5 text-[32px] font-semibold text-[#495057] mx-[14px] text-left">
            Trending Topics
          </h1>
          <div className="flex  flex-wrap">
            <div className="p-2 w-full mt-2 min-h-50 md:min-h-[847px]  flex bg-[#f7f7f7] justify-center items-center">
              <h1 className="text-2xl font-bold mt-10">{skip ? "No More posts found" : "No Posts Found"}</h1>
            </div>
          </div>
          {skip > 0 && <div className="flex justify-center gap-5 mt-10">
            <button
              onClick={() => {if(skip >= 6) setSkip(prev => prev - 6)}}
              type="button" className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2  hover:bg-gray-900 hover:text-white px-3">
              <div className="flex flex-row align-middle">
                <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                </svg>
                <p className="ml-2">Prev</p>
              </div>
            </button>
            <button
              onClick={() => {setSkip(prev => prev + 6)}}
              type="button" className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-gray-900 hover:text-white px-3">
              <div className="flex flex-row align-middle">
                <span className="mr-2">Next</span>
                <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </button>
          </div>}
        </Container>
        <Container>
        <div>
          <h1 className="mt-5 text-[32px] font-semibold text-[#495057] mx-[14px] text-left">
            Featured Posts
          </h1>
          <div className="mt-8 p-4 mx-[14px] gap-6 justify-between items-center  bg-[#f7f7f7] flex flex-wrap">
            {featuredPosts.length > 0 ? (
              featuredPosts.map((post) => (
                <PostCard key={post?.$id} {...post} fileId={post?.featuredimage} />
              ))
          ) : 
          (
            <div></div>
          )
          }
          </div>
        </div>
      </Container>
        
      </div>
    );
  } 
  return (
    <div className="w-full ">
      <Container>
        <section className="relative bg-gradient-to-r from-blue-100 to-blue-200 text-center py-12 px-4 sm:px-8 lg:px-16">
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

          <div className="hidden md:block absolute inset-0 opacity-10 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="50%" cy="50%" r="40%" fill="#ffffff" />
            </svg>
          </div>
        </section>

        <div className="mt-8 text-[32px] font-semibold text-[#495057] mx-[14px]">
          <span>Trending Topics</span>
        </div>
        <div className="grid min-h-50 md:min-h-[847px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mt-8 p-4 mx-[14px]  bg-[#f7f7f7]">
          {posts.map((post) => (
            <div key={post.$id} className="h-full w-full flex justify-center ">
              <PostCard {...post} fileId={post?.featuredimage} />
            </div>
          ))}
        </div>
          <div className="flex justify-center gap-5 mt-10">
            <button
              onClick={() => {if(skip >= 6) setSkip(prev => prev - 6)}}
              type="button" className=" text-white rounded-l-md border-r border-gray-100 py-2 bg-gray-800 hover:bg-gray-900 hover:text-white px-3">
              <div className="flex flex-row align-middle">
                <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                </svg>
                <p className="ml-2">Prev</p>
              </div>
            </button>
            <button
              onClick={() => {if(posts.length != 0) setSkip(prev => prev + 6)}}
              type="button" className=" text-white rounded-r-md py-2 border-l border-gray-200 bg-gray-800 hover:bg-gray-900 hover:text-white px-3">
              <div className="flex flex-row align-middle">
                <span className="mr-2">Next</span>
                <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </button>
          </div>
      </Container>
      <Container>
        <div>
          <h1 className="mt-5 text-[32px] font-semibold text-[#495057] mx-[14px] text-left">
            Featured Posts
          </h1>
          <div className="mt-8 p-4 mx-[14px] gap-6 justify-between items-center  bg-[#f7f7f7] flex flex-wrap">
            {featuredPosts.length > 0 ? (
              featuredPosts.map((post) => (
                <PostCard key={uuid()} {...post} fileId={post?.featuredimage} />
              ))
          ) : 
          (
            <div></div>
          )
          }
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
