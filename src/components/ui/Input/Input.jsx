import { forwardRef } from "react";
import { cn } from "@/utils/helpers";
const Input = forwardRef(function Input2({ label, className, id, ...props }, ref) {
  return <label className="flex flex-col gap-1">{label ? <span className="font-label-caps text-label-caps text-on-surface-variant text-xs">{label}</span> : null}<input
    ref={ref}
    id={id}
    className={cn(
      "bg-surface-container-lowest border border-outline-variant/50 px-4 py-3 rounded-xl font-body-md focus:outline-none w-full",
      className
    )}
    {...props}
  /></label>;
});
export {
  Input
};
