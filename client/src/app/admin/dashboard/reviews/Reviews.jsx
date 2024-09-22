"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  DotsThree,
  PencilSimpleLine,
  Quotes,
  Trash,
} from "@phosphor-icons/react";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import reviews from "../../../../data/reviews.json";

const ReviewsPage = () => {
  const [open, setOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    date: null,
    review: "",
    avatar: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (selectedDate) => {
    setNewReview((prev) => ({
      ...prev,
      date: selectedDate,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const avatarUrl = URL.createObjectURL(file);
      setNewReview((prev) => ({ ...prev, avatar: avatarUrl }));
    }
  };

  const handleSubmit = () => {
    console.log("New review added: ", newReview);
    setOpen(false);
  };

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="grid place-content-center gap-2 bg-neutral-50 text-green-600 border-2 border-dashed border-green-600 hover:bg-green-600/10 w-full h-full">
              <Quotes className="h-10 text-center w-full" />
              <h5>New Review</h5>
            </Button>
          </DialogTrigger>
          <DialogContent
            aria-describedby="review-description"
            onEscapeKeyDown={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogTitle asChild>
              <h4>Add New Review</h4>
            </DialogTitle>

            <div className="space-y-2">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  placeholder="Your name"
                  value={newReview.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label>Date</Label>
                <br />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start px-2.5 border-neutral-400",
                        !newReview.date && "text-neutral-400 font-normal"
                      )}
                    >
                      {newReview.date
                        ? format(newReview.date, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newReview.date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Review</Label>
                <Textarea
                  name="review"
                  placeholder="Write your review"
                  className="min-h-40"
                  value={newReview.review}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label>Avatar</Label>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="flex pt-2.5"
                />
                {newReview.avatar && (
                  <div className="mt-2">
                    <Image
                      src={newReview.avatar}
                      alt="Avatar preview"
                      className="rounded-full object-cover border"
                      width={80}
                      height={80}
                    />
                  </div>
                )}
              </div>
            </div>

            <Button className="mt-4" onClick={handleSubmit}>
              Add Review
            </Button>
          </DialogContent>
        </Dialog>

        {reviews.map(({ name, date, review, avatar }, index) => (
          <div
            key={index}
            className="relative bg-neutral-50 w-full h-[200px] p-5 rounded-xl border"
          >
            <div className="absolute top-3 right-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                  >
                    <DotsThree className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2 text-neutral-500">
                    <PencilSimpleLine className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-600 focus:bg-red-50">
                    <Trash className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-4">
              <Image
                src={avatar}
                alt={`${name}'s avatar`}
                className="w-16 h-16 rounded-full object-cover"
                width={64}
                height={64}
              />
              <div>
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-sm text-neutral-500">{date}</p>
              </div>
            </div>

            <p className="mt-3 text-neutral-500">{`"${review}"`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
