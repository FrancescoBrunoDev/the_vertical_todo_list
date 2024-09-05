import { useState, useEffect } from "react";
import { ToDoSettings } from "@/stores/todo-store";
import { useToDoStore } from "@/provider/todo-store-provider";
import { Button } from "@/components/ui/button";

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
      label: "Not completed",
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
    <div className="flex gap-2 rounded-xl bg-primary/30 p-2 shadow-lg">
      {filters.map((filter) => (
        <Button
          className={`${filter.value === settings.filter ? "bg-primary" : "bg-trasparent shadow-none"} text-background`}
          key={filter.value}
          onClick={() =>
            updateSettings({ filter: filter.value as ToDoSettings["filter"] })
          }
        >
          {filter.label} ({filter.amount})
        </Button>
      ))}
    </div>
  );
};
