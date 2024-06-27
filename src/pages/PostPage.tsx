import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

interface FormData {
  image?: string;
  title?: string;
  category?: string;
  content?: any;
  _id?: string;
  createdAt?: any;
}

export const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState<FormData>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/api/post/getposts?slug=${postSlug}`
        );
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return true;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setError(false);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className=" flex flex-col max-w-4xl mx-auto min-h-screen p-3">
      <h1 className="text-4xl mt-10 font-bold max-w-2xl lg:text-4xl">
        {post && post.title}
      </h1>
      <Link to={`/search?category=${post && post.category}`}>
        <Button color="pink" pill size="xs" className="mt-5">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post?.title}
        className="mt-5 rounded-md max-h-[600px] w-full object-cover"
      />
      <div className="flex flex-row border-b p-2">
        <span className="flex-1">
          {post && new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span>
          {post && `${Math.ceil(post.content.length / 1000)} mins read`}
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
    </main>
  );
};
