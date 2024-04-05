import { cn } from "@/lib/utils";

const Separator = ({ varticale, className }) => {
  return (
    <div
      className={cn(
        `bg-gray-light ${!varticale ? "w-full h-[1px]" : "h-full w-[2px]"}`,
        className
      )}
    />
  );
};

export default Separator;
