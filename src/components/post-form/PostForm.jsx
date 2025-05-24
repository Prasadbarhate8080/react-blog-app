import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../../components/index";
import appwriteService from "../../appWrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",  
            content: post?.content || "",
            status: post?.status || "active",
            description: post?.description || ""
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
 
    const submit = async (data) => {
        console.log("inside  submit")
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
           
            if (file) {
                appwriteService.deleteFile(post.featuredimage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredimage = fileId || "";  
                const dbPost = await appwriteService.createPost({ ...data, userid: userData.$id });
                
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 focus:ring focus:ring-blue-700 focus:ring-offset-1"
                    {...register("title", { required: true })}
                />
                 <Input
                    label="Desciption :"
                    placeholder="Description"
                    className="mb-4 focus:ring focus:ring-blue-700 focus:ring-offset-1"
                    {...register("description", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 focus:ring focus:ring-blue-700 focus:ring-offset-1"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 focus:ring focus:ring-blue-700 focus:ring-offset-1"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                     <div className='w-100 h-40 mb-4 flex justify-center items-center'>
                     <img 
                         src={`https://cloud.appwrite.io/v1/storage/buckets/67b821b1000c19002551/files/${post.featuredimage}/view?project=67b81dba003710becd69`} 
                         alt={post.title} 
                         className='object-contain h-full w-full max-h-full max-w-full' 
                     />
                 </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 "
                    {...register("status", { required: true })}
                />
                <Button  type="submit" bgColor={post ? "bg-green-500" : undefined} value= {post ? "Update" : "Submit"}  className="w-full"/>
                   
                
            </div>
        </form>
    );
}