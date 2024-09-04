"use client"

import { useState } from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


type DueDateSetterProps = {
    dueDate: Date | undefined,
    setnewDueDateState: (dueDate: Date) => void,
}

export const DueDateSetter: React.FC<DueDateSetterProps> = ({ dueDate, setnewDueDateState, }) => {
    const [date, setDate] = useState<Date | undefined>(dueDate ? dueDate : new Date())

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
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
    )
}