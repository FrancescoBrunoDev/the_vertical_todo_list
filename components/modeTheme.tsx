"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useToDoStore } from "@/provider/todo-store-provider";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"; // Assicurati che il percorso sia corretto

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { updateSettings } = useToDoStore((state) => state);
  const { setTheme } = useTheme();

  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    setTheme(theme);
    updateSettings({ theme });
  };

  const themes = ["light", "dark", "system"];

  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="bg-text hover:bg-text/80 hover:text-background dark:border-2 dark:border-primary dark:bg-background"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-background transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-primary transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-2 bg-background">
          {themes.map((theme) => (
            <DropdownMenuItem
              key={theme}
              className="bg-transparent focus:bg-primary"
              onClick={() =>
                handleThemeChange(theme as "light" | "dark" | "system")
              }
            >
              {theme}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
