import Button from "@/components/Button";
import Separator from "@/components/Separator";
import Image from "next/image";
import image from "../../public/default.png";
import Dropzone from "./Dropzone";

const PostModal = () => {
  return (
    <div className="text-base mt-5">
      <p className="text-center">
        Hello <span className="text-primary">Shohan</span>! Share your research!
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
      />

      <Separator className={"my-2"} />

      <Dropzone className="p-16 border-2 rounded-lg border-dashed border-primary/30" />

      <Button className={"mt-5 lg:w-1/2"}>Post</Button>
    </div>
  );
};

export default PostModal;
