import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { options } from "../types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import app from "../firebase";

interface FormData {
  imageUrl?: string;
}

export const PostCreate = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUplaodProgress] = useState<string | null>(
    null
  );
  const [imageUploadError, setImageUplaodError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  console.log(formData);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUplaodError("Please select an image");
        return;
      }
      setImageUplaodError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUplaodProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUplaodError("Image upload failed");
          setImageUplaodProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUplaodError(null);
            setImageUplaodProgress(null);
            setFormData({ ...formData, imageUrl: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUplaodError("Image upload failed");
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  return (
    <div className="container p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            {options.map((option) => (
              <option key={option.id} value={option.option}>
                {option.option}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput accept="image/*" onChange={handleImage} />
          <Button
            type="button"
            gradientMonochrome="pink"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress != null ? true : false}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={parseInt(imageUploadProgress)}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData?.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
        />
        <Button
          type="submit"
          gradientMonochrome="pink"
          className="font-semibold tracking-wide"
        >
          Create Post
        </Button>
      </form>
    </div>
  );
};
