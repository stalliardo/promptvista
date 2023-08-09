"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { Post } from "@types";

const MyProfile = () => {

    const {data: session} = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
          } catch (error) {
            throw new Error("Error getting posts")
          }
        }
    
        if(session?.user.id){
            fetchPosts();
        }
      }, [session?.user])

    const handleEdit = (post: Post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post: Post) => {
        const confirmation = confirm("Are you sure want to delete this prompt?");

        if(confirmation){
           await fetch(`/api/prompt/${post._id?.toString()}`, {
            method: "DELETE"
           });

           const filteredPosts = posts.filter((p) => p._id !== post._id);

           setPosts(filteredPosts);

           router.push("/");
        }
    }

  return (
    <Profile 
        name="My"
        desc="Welcome to your personalized profile page. Edit and delete your prompts here."
        data={posts} // posts array
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile