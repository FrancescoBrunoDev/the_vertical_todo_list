import { ToDoSettings } from "@/stores/todo-store";
import { useToDoStore } from "@/provider/todo-store-provider";

export const FilterSelector = () => {
    const { updateSettings, getStatistics } = useToDoStore((state) => state);

    const filters = [{
        label: "All",
        value: "all",
        amount: getStatistics().total,
    }, {
        label: "Completed",
        value: "completed",
        amount: getStatistics().completed,
    }, {
        label: "Not Completed",
        value: "notCompleted",
        amount: getStatistics().notCompleted,
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