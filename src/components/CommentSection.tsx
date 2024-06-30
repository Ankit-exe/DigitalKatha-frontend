import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Comment } from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {
  postId: string;
};

interface CommentData {
  _id: string;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const CommentSection = ({ postId }: Props) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [comment, setComment] = useState("");
  const [commetError, setcommentError] = useState("");
  const [comments, setComments] = useState<CommentData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentTODelete] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser.userId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit comment");
      }

      const data = await res.json();
      setcommentError("");
      setComments([data, ...comments]);
      setComment("");
    } catch (error: any) {
      setcommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/comment/getPostComments/${postId}`
        );
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId: any) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(
        `${API_BASE_URL}/api/comment/likeComment/${commentId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setComments((comments) =>
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      } else {
        throw new Error("Failed to like comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (comment: any, editedContent: any) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId: any) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(
        `${API_BASE_URL}/api/comment/deleteComment/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <img
            className="h-7 w-7 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-pink-500 font-semibold ml-1 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="">
          You must be signed in to comment.
          <Link to={`/sign-in`} className="ml-1 text-pink-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-gray-200 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment..."
            rows={3}
            maxLength={200}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="gray-500 text-sm">
              {200 - comment.length} characters remaining
            </p>
            <Button
              type="submit"
              className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-3xl text-sm px-1 text-center shadow-md shadow-pink-400"
            >
              Submit
            </Button>
          </div>
          {commetError && (
            <Alert color="failure" className="mt-5">
              {commetError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-md">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId: any) => {
                setShowModal(true);
                setCommentTODelete(commentId);
              }}
            />
          ))}
        </>
      )}
      
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center ">
            <HiOutlineExclamationCircle className="h-14 w-14 text-red-500 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Delete comment
            </h3>
            <span className="text-sm text-gray-500 font-medium">
              Deleting your comment will remove all of your information form our
              database. This cannot be undone.
            </span>
            <div className="flex justify-center gap-4 mt-5">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
