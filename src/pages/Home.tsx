import { useEffect, useState } from "react";
import { CreatePost } from "../components/CreatePost";
import { HomeCompo } from "../components/HomeCompo";
import { Alert, Spinner } from "flowbite-react";
import { PostCard } from "../components/PostCard";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export interface FormData {
  image?: string;
  title?: string;
  category?: string;
  content?: any;
  _id?: string;
  createdAt?: any;
  slug?: any;
}
export const Home = () => {
  const [post, setPost] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [morePost, setMorePost] = useState<FormData[]>([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${API_BASE_URL}/api/post/getposts`);
      const data = await res.json();
      setMorePost(data.posts);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/post/getpostcomment`);
        const data = await res.json();
        if (!res.ok) {
          setError("Something went wrong.");
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data);
          setLoading(false);
        }
      } catch (error) {
        setError("Something went wrong");
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  const handleShowMore = async () => {
    const startIndex = morePost.length;
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/post/getposts?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setMorePost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {}
  };
  return (
    <div className="relative  container mx-auto">
      {error && (
        <Alert className="m-3.5 " color="failure">
          {error}
        </Alert>
      )}
      <div className="max-w-6xl mx-auto flex">
        {post ? (
          <HomeCompo post={post} />
        ) : (
          <Alert className="mt-3.5" color="failure">
            Something went wrong
          </Alert>
        )}
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7  ">
        {morePost && morePost.length > 0 && (
          <div>
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold text-center mt-20"
            >
              Recent Posts
            </motion.h2>
            <div className="flex flex-wrap gap-8 justify-center mt-10">
              {morePost.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-pink-500 self-center text-sm py-7 hover:underline "
        >
          Show more
        </button>
      )}
      <CreatePost />
    </div>
  );
};
