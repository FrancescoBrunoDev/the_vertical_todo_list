"use client";

import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, isBefore, startOfToday } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DueDateSetterProps = {
  dueDate: Date | undefined;
  setnewDueDateState: (dueDate: Date) => void;
};

export const DueDateSetter: React.FC<DueDateSetterProps> = ({
  dueDate,
  setnewDueDateState,
}) => {
  const [date, setDate] = useState<Date>(dueDate ? dueDate : new Date());

  // you shouldn't be allowed to set a date in the past
  const isDateDisabled = (date: Date) => {
    return isBefore(date, startOfToday());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "hover w-full justify-start border-none bg-black text-left font-normal text-background hover:bg-black/80",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          classNames={{
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "h-8 w-8 p-0 font-normal aria-selected:opacity-100 aria-selected:text-white aria-selected:rounded hover:bg-primary hover:text-black",
            ),
            day_today: "bg-primary/50 text-background",
            nav_button: cn(
              buttonVariants({ variant: "default" }),
              "h-7 w-7 bg-primary/50 text-background transition-all p-0 hover:opacity-100 shadow-none hover:bg-primary hover:text-background hover:scale-105 hover:shadow",
            ),
          }}
          mode="single"
          selected={date}
          onSelect={(e) => {
            if (e && !isDateDisabled(e)) {
              setnewDueDateState(e);
              setDate(e);
            }
          }}
          initialFocus
          disabled={isDateDisabled}
        />
      </PopoverContent>
    </Popover>
  );
};
