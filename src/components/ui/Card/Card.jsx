import { cn } from "@/utils/helpers";
function Card({ className, children }) {
  return <article className={cn("glass-panel rounded-xl p-5", className)}>{children}</article>;
}
export {
  Card
};
