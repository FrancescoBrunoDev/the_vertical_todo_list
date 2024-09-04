"use client";

import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  // TODO if I reload the page the Overdue functionality doesn't work: If I change the state of completed I'll stop working until I'll not change the date again.
  // TODO Improve the UI colors
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
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
              "h-8 w-8 p-0 font-normal aria-selected:opacity-100 aria-selected:text-white aria-selected:rounded",
            ),
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary focus:bg-primary focus:text-primary rounded",
            day_today: "bg-primary/50 text-background",
          }}
          mode="single"
          selected={date}
          onSelect={(e) => {
            if (e) {
              setnewDueDateState(e);
              setDate(e);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
