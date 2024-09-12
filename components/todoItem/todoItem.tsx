import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TodoItemHeader } from "@/components/todoItem/TodoItemoHeader";
import { TodoItemContent } from "@/components/todoItem/TodoItemContent";
import { TodoItemFooter } from "@/components/todoItem/TodoItemFooter";
import { useTodoItemLogic } from "@/hooks/useTodoItemLogic";
import { ToDoItem } from "@/stores/todo-store";

type TodoItemProps = ToDoItem & {
  index?: number;
  isDragging?: boolean;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  createdAt,
  dueDate,
  updatedAt,
  index,
  isDragging,
}) => {
  const {
    edited,
    setEditedTodo,
    handleAddTodo,
    isOverdue,
    dateLastChange,
  } = useTodoItemLogic({ id, text, completed, createdAt, dueDate, updatedAt });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      whileHover={isDragging ? { scale: 1.05, x: [0, -2, 2, -2, 2, 0] } : {}}
    >
      <Card
        className={cn(
          "relative w-52 border-none bg-primary shadow-md transition-all hover:scale-105 hover:drop-shadow-xl md:w-72",
          { "group hover:pt-6": id, "dark:bg-secondary": isOverdue },
        )}
      >
        <TodoItemHeader id={id} index={index} />
        <div
          className={cn(
            "flex flex-col gap-2 rounded-xl bg-card p-3 dark:border-2 dark:border-card dark:bg-background",
            {
              "bg-secondary dark:border-secondary": isOverdue,
              "bg-primary dark:border-2 dark:border-primary dark:bg-background": completed,
            },
          )}
        >
          <TodoItemContent
            edited={edited}
            setEditedTodo={setEditedTodo}
          />
          {!completed && (
            <TodoItemFooter
              id={id}
              edited={edited}
              setEditedTodo={setEditedTodo}
              handleAddTodo={handleAddTodo}
              updatedAt={updatedAt}
              createdAt={createdAt}
              dateLastChange={dateLastChange}
            />
          )}
        </div>
      </Card>
    </motion.div>
  );
};
