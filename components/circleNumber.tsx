import { cn } from "@/lib/utils";

interface CircleNumberProps {
  number: number;
  className?: string;
}

export const CircleNumber = ({ number, className }: CircleNumberProps) => {
  return (
    <div
      className={cn(
        "hidden h-6 w-6 items-center justify-center rounded-full bg-card md:flex",
        className,
      )}
    >
      <span className="text-xs">{number}</span>
    </div>
  );
};
