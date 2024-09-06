"use client";

import { useToDoStore } from "@/provider/todo-store-provider";
import { TodoItem } from "@/components/todoItem";
import { ToDoList } from "@/components/todoList";
import { FilterSelector } from "@/components/filterSelector";

export const Main = () => {
  const { todos, settings } = useToDoStore((state) => state);

  // I wanted to use Object.groupBy, but it don't build on my server
  const groupedTodos = todos.reduce((acc: { [key: string]: any[] }, todo) => {
    const key = todo.completed ? "completed" : "notCompleted";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(todo);
    return acc;
  }, {});

  const fiteredTodos =
    settings.filter === "all" ? todos : groupedTodos[settings.filter] || [];

  return (
    <div className="container mt-52 flex w-full flex-col items-center gap-36 md:mt-[17rem]">
      <div className="fixed bottom-2 z-50 md:bottom-auto md:top-48">
        <FilterSelector />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="z-20 border-b-2">
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
