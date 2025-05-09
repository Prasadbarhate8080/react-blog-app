import React, {useEffect, useState} from 'react'
import appwriteService from "../appWrite/config"
import {Container, PostCard} from '../components'
import "./Home.css"

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    if (posts.length === 0) {
        return (
            <div className="w-full   text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full bg-gray-300">
                            <h1 className="text-2xl font-bold  hover:text-gray-500">
                                No posts found
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full  '>
            <Container>
            <section class="hero-section">
            <div class="hero-container">
                <h1 class="hero-title">Share Your Stories, Discover New Ideas</h1>
                <p class="hero-subtitle">
                Share ideas, explore trends, and connect with readers.
                </p>
                <button class="hero-cta">Add Your Blog</button>
            </div>

            </section>
                <div className='mt-5 text-[32px] font-semibold text-[#495057] mx-[14px]'><span>Trending Topics</span></div>
                <div className='flex justify-start flex-wrap gap-8 mt-7 mx-[14px]  bg-[#f7f7f7]'>
                    {posts.map((post) => (
                        <div key={post.$id} className=''>
                            <PostCard {...post} fileId={post.featuredimage}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home