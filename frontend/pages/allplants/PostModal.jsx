import Button from "@/components/Button";
import Separator from "@/components/Separator";
import Image from "next/image";
import { useState } from "react";
import image from "../../public/default.png";
import Dropzone from "./Dropzone";

const PostModal = () => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePostClick = () => {};

  return (
    <div className="text-base mt-5 w-[40vw]">
      <p className="text-center">
        Hello <span className="text-primary capitalize">Shohan</span>! share
        your information!
      </p>

      <Separator className={"my-2"} />

      <div className="flex items-center gap-3">
        <Image src={image} alt="Image" className="size-10 rounded-full" />
        <p className="text-lg">Nahim Hossain Shohan</p>
      </div>

      <textarea
        name="text"
        id="text"
        rows="10"
        placeholder="Your text here"
        className="border border-gray-light rounded-lg mt-3 outline-none p-2 text-sm w-full"
        value={text}
        onChange={handleTextChange}
      />

      <Separator className={"my-2 mb-3"} />

      <Dropzone className="p-16 border-2 rounded-lg border-dashed border-primary/30" />

      <Button className={"mt-5 lg:w-1/2"} outline onClick={handlePostClick}>
        Post
      </Button>
    </div>
  );
};

export default PostModal;
