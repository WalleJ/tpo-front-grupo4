import { cn } from "@/utils/helpers";
function Button({ variant = "primary", className, children, ...props }) {
  const variants = {
    primary: "bg-primary text-on-primary hover:opacity-90",
    secondary: "border border-outline-variant/60 bg-surface-container-lowest text-on-surface hover:bg-surface-container",
    danger: "bg-error text-on-error hover:opacity-90"
  };
  return <button
    className={cn("px-4 py-2 rounded-lg transition-colors text-xs font-semibold", variants[variant], className)}
    {...props}
  >{children}</button>;
}
export {
  Button
};
