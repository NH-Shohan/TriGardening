"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef(
  ({ className, Icon, type, message, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className="relative flex items-center w-full">
        {Icon && (
          <Icon
            className={cn(
              "absolute left-2 transition-colors",
              isFocused ? "fill-green-500" : "fill-neutral-400"
            )}
            size={24}
            weight="light"
          />
        )}
        <input
          type={type}
          className={cn(
            `flex h-11 w-full rounded-xl border border-neutral-400 bg-transparent px-2 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500 disabled:cursor-not-allowed disabled:opacity-50 ${
              Icon && "pl-9"
            }`,
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {message && <p className="text-xs text-neutral-500">{message}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
