"use client";

import { useToDoStore } from "@/provider/todo-store-provider";
import { TodoItem } from "@/components/todoItem";
import { ToDoList } from "@/components/todoList";
import { FilterSelector } from "@/components/filterSelector";
import { Header } from "@/components/header";

export const Main = () => {
  const { todos, settings } = useToDoStore((state) => state);

  const groupedTodos = Object.groupBy(todos, (todo) =>
    todo.completed ? "completed" : "notCompleted",
  );
  const fiteredTodos =
    settings.filter === "all" ? todos : groupedTodos[settings.filter] || [];

  return (
    <div className="container flex w-full flex-col items-center gap-4">
      <div className="sticky top-0 z-50 bg-background">
        <Header />
        <FilterSelector />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="z-20">
          <NewTodo />
        </div>
        <ToDoList todos={fiteredTodos} />
      </div>
    </div>
  );
};

const NewTodo = () => {
  const todo = {
    id: undefined,
    text: {
      title: "",
      content: "",
    },
    completed: false,
    createdAt: undefined,
    dueDate: new Date(),
    updatedAt: undefined,
    isOverdue: false,
  };
  return <TodoItem {...todo} />;
};
