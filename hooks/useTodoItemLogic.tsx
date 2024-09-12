import { useState, useEffect } from "react";
import { useToDoStore } from "@/provider/todo-store-provider";
import { isAfter } from "date-fns";
import { ToDoItem } from "@/stores/todo-store";

type UseTodoItemLogicProps = Partial<ToDoItem>;

export const useTodoItemLogic = ({
    id,
    text,
    completed,
    createdAt,
    dueDate,
    updatedAt,
}: UseTodoItemLogicProps) => {
    const { addTodo, setDueDate, updateTodo } = useToDoStore((state) => state);

    const [edited, setEditedTodo] = useState({
        title: text?.title || "",
        content: text?.content || "",
        dueDate: dueDate || new Date(),
    });

    useEffect(() => {
        if (id) {
            const updatedAt = new Date();
            updateTodo(id, edited.title, edited.content, edited.dueDate, updatedAt);
        }
    }, [edited, completed, id, updateTodo]);

    const handleAddTodo = () => {
        if (edited.title && edited.content) {
            const newId = addTodo(edited.title, edited.content);
            if (edited.dueDate && newId) {
                setDueDate(newId, edited.dueDate);
            }
            setEditedTodo({ title: "", content: "", dueDate: new Date() });
        }
    };

    const dateLastChange = (updatedAt?: Date, createdAt?: Date) => {
        const date = updatedAt || createdAt;
        return date ? date.toLocaleString() : "";
    };

    const isOverdue = !id || completed ? false : isAfter(new Date(), edited.dueDate);

    return {
        edited,
        setEditedTodo,
        handleAddTodo,
        isOverdue,
        dateLastChange,
    };
};