import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { options } from "../types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const PostCreate = () => {
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
          <FileInput accept="image/*" />
          <Button type="button" gradientMonochrome="pink" size="sm" outline>
            Upload image
          </Button>
        </div>
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
