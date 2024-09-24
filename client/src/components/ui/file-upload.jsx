"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash } from "@phosphor-icons/react";
import { IconUpload } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({ onChange }) => {
  const [file, setFile] = useState(null); // Change to single file object
  const fileInputRef = useRef(null);

  const handleFileChange = (newFiles) => {
    if (file) {
      toast.warning("Please upload only one image.");
      return;
    }

    const acceptedFile = newFiles.find((file) =>
      ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    );

    if (acceptedFile) {
      const fileObject = {
        name: acceptedFile.name,
        url: URL.createObjectURL(acceptedFile),
      };

      setFile(fileObject);
      onChange && onChange(fileObject); // Pass the single file object
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      toast.error("Rejected files", error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-xl cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept=".png, .jpeg, .jpg"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload
          </p>

          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {file && (
              <motion.div
                key={"file-upload"}
                layoutId={"file-upload"}
                className={cn(
                  "relative overflow-hidden z-40 bg-neutral-50 dark:bg-neutral-900 flex flex-col items-start justify-start md:h-auto p-4 mt-4 w-full mx-auto rounded-xl border"
                )}
              >
                <div className="flex justify-between w-full items-center gap-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={file.url}
                      alt={file.name}
                      className="object-cover rounded-md"
                      width={60}
                      height={0}
                    />

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                  </div>
                  <Button
                    variant="destructive"
                    className="bg-red-100 text-red-500 hover:text-neutral-50 flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                  >
                    <Trash className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {!file && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-xl shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center text-center"
                  >
                    Drop it <br />
                    I'll catch it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
