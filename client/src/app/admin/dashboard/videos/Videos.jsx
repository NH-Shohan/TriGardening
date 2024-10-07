"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteVideo,
  getAllVideos,
  postVideo,
  updateVideo,
} from "@/lib/apiService";
import {
  DotsThree,
  MonitorArrowUp,
  PencilSimpleLine,
  Trash,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const VideosPage = () => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("");
  const [embedCode, setEmbedCode] = useState("");
  const [videos, setVideos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const extractSrc = (code) => {
    const srcMatch = code.match(/src="([^"]+)"/);
    return srcMatch ? srcMatch[1] : "";
  };

  const handleEmbedCodeChange = (e) => {
    const code = e.target.value;
    setEmbedCode(code);
    const extractedSrc = extractSrc(code);
    setSource(extractedSrc);
  };

  const handlePost = async () => {
    if (!source) {
      toast.error("Please provide a valid YouTube embed code.");
      return;
    }

    const videoData = { src: source };

    try {
      const response = isEditing
        ? await updateVideo(editId, videoData)
        : await postVideo(videoData);

      toast.success(
        isEditing ? "Video updated successfully!" : "Video posted successfully!"
      );
      setOpen(false);
      setEmbedCode("");
      setSource("");
      setIsEditing(false);
      setEditId(null);
      fetchVideos();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (video) => {
    setIsEditing(true);
    setEditId(video.id);
    setEmbedCode(`<iframe src="${video.src}"></iframe>`);
    setSource(video.src);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteVideo(id);
      toast.success("Video deleted successfully!");
      fetchVideos();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchVideos = async () => {
    try {
      const data = await getAllVideos();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="grid place-content-center gap-2 bg-neutral-50 text-green-600 border-2 border-dashed border-green-600 hover:bg-green-600/10 w-full h-full aspect-video">
              <MonitorArrowUp
                weight="light"
                className="h-10 text-center w-full"
              />
              <h5>{isEditing ? "Edit Video" : "New Video"}</h5>
            </Button>
          </DialogTrigger>

          <DialogContent
            aria-describedby="video-description"
            onEscapeKeyDown={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle asChild>
                <h4>YouTube Embed Code</h4>
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className="space-y-1">
              <Label>Embed Code</Label>
              <Textarea
                placeholder="Paste your code here"
                className="h-[150px] rounded-xl"
                value={embedCode}
                onChange={handleEmbedCodeChange}
              />
            </div>

            <Separator />

            <h5>Preview</h5>
            {source ? (
              <iframe
                className="rounded-xl aspect-video w-full border overflow-hidden"
                src={source}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="animate-pulse rounded-xl bg-neutral-400 aspect-video w-full h-full relative flex justify-center items-center">
                <p className="absolute text-neutral-950 text-2xl">
                  No valid video link provided
                </p>
              </div>
            )}

            <Button onClick={handlePost}>
              {isEditing ? "Update Video" : "Post Video"}
            </Button>
          </DialogContent>
        </Dialog>

        {videos.map((video, index) => (
          <div key={video.id} className="relative">
            <div className="absolute top-4 right-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full bg-neutral-50"
                  >
                    <DotsThree className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="gap-2 text-neutral-500"
                    onClick={() => handleEdit(video)}
                  >
                    <PencilSimpleLine className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-2 text-red-500 focus:text-red-600 focus:bg-red-50"
                    onClick={() => handleDelete(video.id)}
                  >
                    <Trash className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <iframe
              className="rounded-xl aspect-video w-full border overflow-hidden"
              src={video.src}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default VideosPage;
