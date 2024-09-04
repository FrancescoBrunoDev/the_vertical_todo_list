import { useState, useEffect } from 'react';
import { ToDoSettings } from "@/stores/todo-store";
import { useToDoStore } from "@/provider/todo-store-provider";

export const FilterSelector = () => {
    const { updateSettings, getStatistics, todos } = useToDoStore((state) => state);
    const [statistics, setStatistics] = useState({ total: 0, completed: 0, notCompleted: 0 });

    useEffect(() => {
        setStatistics(getStatistics());
    }, [todos]);

    const filters = [{
        label: "All",
        value: "all",
        amount: statistics.total,
    }, {
        label: "Completed",
        value: "completed",
        amount: statistics.completed,
    }, {
        label: "Not Completed",
        value: "notCompleted",
        amount: statistics.notCompleted,
    }]

    return (
        <>
            {filters.map((filter) => (
                <button key={filter.value} onClick={() => updateSettings({ filter: filter.value as ToDoSettings["filter"] })}>
                    {filter.label} ({filter.amount})
                </button>
            ))}
        </>
    )
}