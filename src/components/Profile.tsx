import {
  UploadTaskSnapshot,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import app from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string>("");
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [imageProgress, setImageProgress] = useState<string>("");
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [formData, setformData] = useState({});

  const storage = getStorage(app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    if (!imageFile) {
      console.error("No image file to upload.");
      return;
    }

    const storageRef = ref(storage, `${new Date().getTime()}${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    const progressListener = (snapshot: UploadTaskSnapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageProgress(progress.toFixed(0));
    };

    const errorListener = (error: any) => {
      setImageUploadError("File upload failed. Please try again.");
      console.error("File upload error:", error);
    };

    const completeListener = () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setformData({ ...formData, profilePicture: downloadUrl });
        })
        .catch((error) => {
          setImageUploadError("Error retrieving download URL.");
          console.error("Download URL error:", error);
        });
    };

    const unsubscribe = uploadTask.on(
      "state_changed",
      progressListener,
      errorListener,
      completeListener
    );

    return unsubscribe;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleChange = (e: any) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }

    try {
      dispatch(updateStart());
      const response = await fetch(
        `${API_BASE_URL}/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div
          className="w-32 h-32 self-center relative"
          onClick={() => filePickerRef.current?.click()}
        >
          {imageProgress && (
            <CircularProgressbar
              className="z-50"
              value={parseFloat(imageProgress)}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    parseFloat(imageProgress) / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="User"
            className="rounded-full w-full h-full border-8 border-[lightgray] cursor-pointer drop-shadow-xl"
          />
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {isEditing && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={filePickerRef}
              hidden
            />
          </>
        )}
        <div>
          <Label className="text-sm font-semibold">Username:</Label>
          <TextInput
            type="text"
            id="username"
            placeholder="username"
            disabled={!isEditing}
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label className="text-sm font-semibold">Email:</Label>
          <TextInput
            type="email"
            id="email"
            placeholder="email"
            disabled={!isEditing}
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
        </div>
        <div
          className={
            isEditing ? "visible flex flex-col lg:flex-row gap-2 " : "collapse"
          }
        >
          <div className="flex-1">
            <Label className="text-sm font-semibold">Change Password:</Label>
            <TextInput
              type="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
            />
          </div>
        </div>
        {isEditing && (
          <Button
            type="submit"
            className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm text-center"
          >
            Update
          </Button>
        )}
      </form>
      <div>
        {!isEditing && (
          <>
            <span className="text-red-600 float-left cursor-pointer hover:text-red-500">
              Delete Account
            </span>
            <span
              className="text-green-600 float-right cursor-pointer hover:text-green-500"
              onClick={handleUpdate}
            >
              Update Profile
            </span>
          </>
        )}
      </div>
    </div>
  );
};
