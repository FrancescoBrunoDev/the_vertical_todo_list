import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  isOverdue: boolean;
};

export type ToDoSettings = {
  filter: "all" | "notCompleted" | "completed";
};

export type ToDoState = {
  todos: ToDoItem[];
  settings: ToDoSettings;
};

export type ToDoActions = {
  addTodo: (title: string, content: string) => void;
  removeTodo: (id: number) => void;
  updateTodo: (
    id: number,
    title?: string,
    content?: string,
    dueDate?: Date,
    updatedAt?: Date
  ) => void;
  toggleTodo: (id: number) => void;
  updateSettings: (settings: ToDoSettings) => void;
  setDueDate: (id: number, dueDate: Date) => void;
  getStatistics: () => {
    total: number;
    completed: number;
    notCompleted: number;
  };
  setTodos: (todos: ToDoItem[]) => void;
};

export type ToDoStore = ToDoActions & ToDoState;

export const initToDoStore = (): ToDoState => {
  return { todos: [], settings: { filter: "all" } };
};

export const defaultInitState: ToDoState = {
  todos: [],
  settings: { filter: "all" },
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
            isOverdue: false,
          };
          set((state) => ({ todos: [...state.todos, newTodo] }));
          return newTodo.id;
        },
        setTodos: (todos: ToDoItem[]) => {
          set({ todos });
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
          updatedAt?: Date
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
                    isOverdue:
                      !todo.completed && new Date() > (dueDate || todo.dueDate),
                  }
                : todo
            ),
          })),
        toggleTodo: (id: number) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          })),
        updateSettings: (settings: ToDoSettings) =>
          set((state) => ({
            settings: { ...state.settings, ...settings },
          })),
        setDueDate: (id: number, dueDate: Date) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id
                ? { ...todo, dueDate, isOverdue: new Date() > dueDate }
                : todo
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
      }
    )
  );
};
