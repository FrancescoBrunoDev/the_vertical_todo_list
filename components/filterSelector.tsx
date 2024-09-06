import { useState, useEffect } from "react";
import { ToDoSettings } from "@/stores/todo-store";
import { useToDoStore } from "@/provider/todo-store-provider";
import { Button } from "@/components/ui/button";
import { CircleNumber } from "@/components/circleNumber";
import { cn } from "@/lib/utils";

export const FilterSelector = () => {
  const { updateSettings, getStatistics, todos, settings } = useToDoStore(
    (state) => state,
  );
  const [statistics, setStatistics] = useState({
    total: 0,
    completed: 0,
    notCompleted: 0,
  });

  useEffect(() => {
    setStatistics(getStatistics());
  }, [todos]);

  const filters = [
    {
      label: "Underway",
      value: "notCompleted",
      amount: statistics.notCompleted,
    },
    {
      label: "Done",
      value: "completed",
      amount: statistics.completed,
    },
    {
      label: "All",
      value: "all",
      amount: statistics.total,
    },
  ];

  return (
    <div className="flex gap-2 rounded-xl bg-primary p-2 shadow-lg transition-transform hover:scale-105">
      {filters.map((filter) => (
        <Button
          className={cn(
            "flex gap-1 bg-background/50 text-black/70 transition-all hover:scale-105 hover:bg-background",
            filter.value === settings.filter
              ? "bg-background text-black/90"
              : "shadow-none",
          )}
          key={filter.value}
          onClick={() =>
            updateSettings({ filter: filter.value as ToDoSettings["filter"] })
          }
        >
          {filter.label}{" "}
          <CircleNumber
            number={filter.amount}
            className="border-2 border-primary bg-transparent"
          />
        </Button>
      ))}
    </div>
  );
};
