import { Button, Textarea } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

interface UserData {
  profilePicture: string;
  username: string;
  createdAt: Date;
}

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const Comment = ({ comment, onLike, onEdit }: any) => {
  const [user, setUser] = useState<UserData | null>(null);
  const { currentUser } = useSelector((state: any) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/user/${comment.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [comment.userId]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handlesave = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/comment/editComment/${comment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            content: editedContent,
          }),
        }
      );
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user === null ? (
        <div>Loading user...</div>
      ) : (
        <div className="flex border-b border-gray-2aa00  p-3 ">
          <div className="flex-shrink-0 mr-3 ">
            <img
              className="h-10 w-10 rounded-full"
              src={user.profilePicture}
              alt={user.username}
            />
          </div>
          <div className="w-full">
            <div className="flex flex-1 flex-row items-center">
              <span className="font-bold mr-1 text-xm truncate">
                {user ? `@${user.username}` : "anonymous user"}
              </span>
              <span className="text-gray-500 text-xm">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            {isEditing ? (
              <>
                <Textarea
                  className="mb-2"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className="flex flex-row gap-3 justify-end text-sm">
                  <Button
                    type="button"
                    size="sm"
                    gradientDuoTone="purpleToPink"
                    onClick={handlesave}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    type="button"
                    outline
                    gradientDuoTone="purpleToPink"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancle
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className=" text-gray-500 mb-2">{comment.content}</p>
                <div className="flex flex-row gap-1 items-center pt-2 text-sm border-t border-gray-200 dark:border-gray-700 max-w-fit">
                  <button
                    type="button"
                    onClick={() => onLike(comment._id)}
                    className={`text-gray-400 hover:text-pink-500 ${
                      currentUser &&
                      comment.likes.includes(currentUser.userId) &&
                      "!text-pink-500"
                    }`}
                  >
                    <FaThumbsUp className="text-sm " />
                  </button>
                  <p className="text-gray-400">
                    {comment.numberOfLikes > 0 &&
                      comment.numberOfLikes +
                        " " +
                        (comment.numberOfLikes === 1 ? "like" : "likes")}
                  </p>
                  {currentUser && currentUser.userId === comment.userId && (
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-pink-500 "
                    >
                      Edit
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
