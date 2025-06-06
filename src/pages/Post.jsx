import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appWrite/config";
import {  Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
        
    }, [slug, navigate]);

    const isAuthor = post && userData ? post.userid === userData.$id : false;
    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative flex-col  rounded-xl p-2">
                    <div className="w-full mb-6">
                        <h1 className="text-2xl w-[90%] mx-auto font-bold">{post.title}</h1>
                    </div>
                    <img
                        src={`https://cloud.appwrite.io/v1/storage/buckets/67b821b1000c19002551/files/${post.featuredimage}/view?project=67b81dba003710becd69`}
                        alt={post.title}
                        width={600}
                        className="rounded-xl mx-auto"
                    />

                    {isAuthor && (
                        <div className="absolute flex  right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 " value="Edit" className="mr-3  text-white"/>  
                            </Link>
                                <Button bgColor="bg-red-500" value="Delete" className="text-white" onClick={deletePost} />
                        </div>
                    )}
                </div>
                
                <div className="browser-css mt-8 w-[90%] mx-auto prose prose-lg max-w-none">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}