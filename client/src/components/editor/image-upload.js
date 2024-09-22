import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";

const onUpload = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Url = reader.result;
      resolve(base64Url);
    };

    reader.onerror = (error) => {
      toast.error("Error reading file.");
      reject(error);
    };

    reader.readAsDataURL(file);

    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: "Uploading image...",
      success: "Image uploaded successfully.",
      error: "Error uploading image.",
    });
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});

export const handleImageUpload = async (file, editor, pos) => {
  try {
    const base64Url = await onUpload(file);
    editor.chain().focus().setImage({ src: base64Url }).run();
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};
