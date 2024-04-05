import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FcAddImage } from "react-icons/fc";
import { GoX } from "react-icons/go";

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files?.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    formData.append("upload_preset", "friendsbook");

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    const data = await fetch(URL, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-3">
          <FcAddImage className="w-10 h-10" />
          {isDragActive ? (
            <p className="text-primary font-semibold capitalize">
              Drop the files here...
            </p>
          ) : (
            <p className="font-normal capitalize">
              Drag & drop files here, or click to select files
            </p>
          )}
        </div>
      </div>

      {(files.length > 0 || rejected.length > 0) && (
        <section className="mt-5">
          <div className="flex justify-between items-center">
            <p className="title text-xl font-semibold text-primary">Preview</p>
            <button
              type="button"
              onClick={removeAll}
              className="text-xs uppercase tracking-wider font-normal text-red border border-red rounded-md px-3 hover:bg-secondary-400 hover:bg-red hover:text-white transition-colors py-1.5"
            >
              Remove all images
            </button>
          </div>

          <h3 className="title text-lg font-normal mt-4 border-b border-gray-light pb-1">
            Accepted Images
          </h3>
          <ul className="mt-6 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-10">
            {files.map((file) => (
              <li
                key={file.name}
                className="relative h-32 rounded-lg shadow-lg"
              >
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={60}
                  height={32}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  className="h-full w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="w-5 h-5 border bg-white border-primary bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-2 hover:bg-primary transition-colors"
                  onClick={() => removeFile(file.name)}
                >
                  <GoX className="w-5 h-5 fill-primary hover:fill-white transition-colors" />
                </button>
                <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                  {file.name}
                </p>
              </li>
            ))}
          </ul>

          {rejected.length > 0 && (
            <>
              <h3 className="title text-lg font-normal mt-10 border-b border-gray-light pb-1 text-red">
                Rejected Images
              </h3>
              <ul className="mt-6 flex flex-col">
                {rejected.map(({ file, errors }) => (
                  <li
                    key={file.name}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="mt-2 text-neutral-500 text-sm font-medium">
                        {file.name}
                      </p>
                      <ul className="text-[12px] text-red-400">
                        {errors.map((error) => (
                          <li key={error.code}>{error.message}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      className="text-xs uppercase tracking-wider font-normal text-red border border-red rounded-md px-3 hover:bg-secondary-400 hover:bg-red hover:text-white transition-colors py-1.5"
                      onClick={() => removeRejected(file.name)}
                    >
                      remove
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}
    </form>
  );
};

export default Dropzone;
