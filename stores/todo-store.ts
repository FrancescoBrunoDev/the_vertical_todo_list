import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { isAfter, add, sub } from "date-fns";

export type ToDoItem = {
  id?: number;
  text: {
    title: string;
    content: string;
  };
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  dueDate: Date;
};

export type ToDoSettings = {
  filter: "all" | "notCompleted" | "completed";
  theme: "light" | "dark" | "system";
};

export type ToDoState = {
  todos: ToDoItem[];
  settings: ToDoSettings;
};

export type ToDoActions = {
  addTodo: (title: string, content: string) => number | undefined;
  removeTodo: (id: number) => void;
  updateTodo: (
    id: number,
    title?: string,
    content?: string,
    dueDate?: Date,
    updatedAt?: Date,
  ) => void;
  toggleTodo: (id: number) => void;
  updateSettings: (settings: Partial<ToDoSettings>) => void;
  setDueDate: (id: number, dueDate: Date) => void;
  getStatistics: () => {
    total: number;
    completed: number;
    notCompleted: number;
  };
  setTodos: (todos: ToDoItem[]) => void;
  getTodo: (id: number) => ToDoItem | undefined;
};

export type ToDoStore = ToDoActions & ToDoState;

export const initToDoStore = (): ToDoState => {
  return {
    todos: [
      {
        id: 1,
        text: {
          title: "Welcome to The Vertical Todo List!",
          content:
            "I'm your default todo item, hanging out here patiently. Feel free to drag and drop me—just don’t leave me here too long! Don’t worry, you’ve got a week before I start feeling neglected!",
        },
        completed: false,
        dueDate: add(new Date(), { weeks: 1 }),
      },
      {
        id: 2,
        text: {
          title: "Uh-oh, This ToDo is Overdue!",
          content:
            "This task has been waiting... and waiting... It's starting to wonder if you'll ever finish it. You can drag it to the top of the list, but it'll still know it's overdue!",
        },
        completed: false,
        dueDate: sub(new Date(), { days: 1 }),
      },
      {
        id: 3,
        text: {
          title: "Completed, But Not Forgotten!",
          content:
            "You crossed me off, but don’t get too comfortable. One quick drag and I’m back in action, but be warned—I’m overdue and I know it!",
        },
        completed: true,
        dueDate: sub(new Date(), { weeks: 3 }),
      },
    ],
    settings: { filter: "notCompleted", theme: "system" },
  };
};

export const defaultInitState: ToDoState = {
  todos: [],
  settings: { filter: "all", theme: "system" },
};

export const createToDoStore = (initState: ToDoState = defaultInitState) => {
  return createStore<ToDoStore>()(
    persist(
      (set, get) => ({
        ...initState,
        addTodo: (title: string, content: string) => {
          const newTodo: ToDoItem = {
            id: Date.now(),
            text: {
              title,
              content,
            },
            completed: false,
            createdAt: new Date(),
            dueDate: new Date(),
          };
          set((state) => ({ todos: [...state.todos, newTodo] }));
          return newTodo.id;
        },
        setTodos: (todos: ToDoItem[]) => {
          set({ todos });
        },
        getTodo: (id: number) => {
          return get().todos.find((todo) => todo.id === id);
        },
        removeTodo: (id: number) => {
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
          }));
        },
        updateTodo: (
          id: number,
          title?: string,
          content?: string,
          dueDate?: Date,
          updatedAt?: Date,
        ) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id
                ? {
                    ...todo,
                    text: {
                      title: title || todo.text.title,
                      content: content || todo.text.content,
                    },
                    dueDate: dueDate || todo.dueDate,
                    updatedAt: updatedAt,
                  }
                : todo,
            ),
          })),
        toggleTodo: (id: number) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id
                ? {
                    ...todo,
                    completed: !todo.completed,
                  }
                : todo,
            ),
          })),
        updateSettings: (settings: Partial<ToDoSettings>) =>
          set((state) => ({
            ...state,
            settings: { ...state.settings, ...settings },
          })),
        setDueDate: (id: number, dueDate: Date) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id
                ? { ...todo, dueDate, isOverdue: isAfter(new Date(), dueDate) }
                : todo,
            ),
          })),
        getStatistics: () => {
          const state = get();
          const total = state.todos.length;
          const completed = state.todos.filter((todo) => todo.completed).length;
          const notCompleted = total - completed;

          return { total, completed, notCompleted };
        },
      }),
      {
        name: "todo-store",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
