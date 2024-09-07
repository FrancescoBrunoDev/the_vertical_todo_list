import Link from "next/link";
import { cn } from "@/lib/utils";
import { display } from "@/app/fonts";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 text-center text-primary">
      <h1 className={cn("text-6xl font-bold", display.className)}>404</h1>
      <h2 className={cn("text-4xl font-bold text-text", display.className)}>
        Uh-oh! You’ve found a missing page!
      </h2>
      <p className="text-text">Anyway, you shouldn’t have gotten here.</p>
      <div className="flex flex-col items-center gap-2 pt-2">
        <p className="text-text">Let’s get you back to safety!</p>
        <Button className="w-fit bg-text text-background transition-colors hover:bg-text/80">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
