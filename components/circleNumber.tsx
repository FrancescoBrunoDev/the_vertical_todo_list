import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CircleNumberProps {
  number: number;
  className?: string;
}

export const CircleNumber = ({ number, className }: CircleNumberProps) => {
  return (
    <motion.div
      className={cn(
        "hidden h-6 w-6 items-center justify-center rounded-full bg-card md:flex",
        className,
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [1.2, 0.9, 1], opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      key={number}
    >
      <span className="text-xs">{number}</span>
    </motion.div>
  );
};
