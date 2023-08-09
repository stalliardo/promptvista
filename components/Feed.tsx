"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { Post } from "@types";

interface PromptCardListProps {
  data: any[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data.map((post) => <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>)
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchText(e.target.value);

    const t = setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);
  }

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    setSearchedResults(filterPrompts(tag));
  }

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (post) =>
        regex.test(post?.creator?.username as string) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");

        const data = await response.json();

        setPosts(data);
      } catch (error) {
        throw new Error("Error getting posts")
      }
    }

    fetchPosts();
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {
        searchText ? (
          <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
        ) : (
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        )
      }
    </section>
  )
}

export default Feed