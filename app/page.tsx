"use client";

import { useMemo } from "react";
import { useToDoStore } from "@/provider/todo-store-provider";
import { TodoItem } from "@/components/todoItem/todoItem";
import { ToDoList } from "@/components/todoList";
import { FilterSelector } from "@/components/filterSelector";
import { addDays } from "date-fns";

export default function Home() {
  const { todos, settings } = useToDoStore((state) => state);

  const groupedTodos = useMemo(() => {
    return todos.reduce((acc: { [key: string]: any[] }, todo) => {
      const key = todo.completed ? "completed" : "notCompleted";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(todo);
      return acc;
    }, {});
  }, [todos]);

  const fiteredTodos =
    settings.filter === "all" ? todos : groupedTodos[settings.filter] || [];

  return (
    <>
      <div className="fixed bottom-2 z-50 md:bottom-auto md:top-40">
        <FilterSelector />
      </div>
      <div className="flex flex-col items-center gap-8 pt-36 md:pt-60">
        <div className="z-20">
          <NewTodo />
        </div>
        <ToDoList todos={fiteredTodos} />
      </div>
    </>
  );
}

const NewTodo = () => {
  const todo = {
    id: undefined,
    text: {
      title: "",
      content: "",
    },
    completed: false,
    createdAt: undefined,
    dueDate: addDays(new Date(), 3),
    updatedAt: undefined,
    isOverdue: false,
  };
  return <TodoItem {...todo} />;
};
