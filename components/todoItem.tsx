import { useState, useEffect, useRef, use } from "react";
import { useToDoStore } from "@/provider/todo-store-provider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DueDateSetter } from "@/components/dueDateSetter";
import { ToDoItem } from "@/stores/todo-store";
import { Textarea } from "@/components/ui/textarea";
import { PPR } from "@/app/fonts";
import { Label } from "@/components/ui/label";
import { Info, GripHorizontal, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const TodoItem: React.FC<ToDoItem> = ({
  id,
  text,
  completed,
  createdAt,
  dueDate,
  updatedAt,
  isOverdue,
}) => {
  const { addTodo, setDueDate, updateTodo, setIsOverdue } = useToDoStore(
    (state) => state,
  );

  const [newTodoTitle, setNewTodoTitle] = useState<string>(
    text ? text.title : "",
  );
  const [newTodoContent, setNewTodoContent] = useState<string>(
    text ? text.content : "",
  );
  const [newDueDate, setnewDueDateState] = useState<Date>(
    dueDate ? dueDate : new Date(),
  );
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight(titleTextareaRef.current);
    adjustTextareaHeight(contentTextareaRef.current);
  }, [newTodoTitle, newTodoContent]);

  const handleNewTodo = () => {
    if (newTodoTitle.trim() && newTodoContent.trim()) {
      const id = addTodo(newTodoTitle, newTodoContent);
      if (newDueDate && id !== undefined) {
        setDueDate(id, newDueDate);
      }
      setNewTodoTitle("");
      setNewTodoContent("");
    }
  };

  const handleUpdate = () => {
    if (!id) return;
    const updatedAt = new Date();
    updateTodo(id, newTodoTitle, newTodoContent, newDueDate, updatedAt);
    setIsOverdue(id);
  };

  const dateLastChange = (updatedAt?: Date, createdAt?: Date) => {
    if (updatedAt)
      return `last updated ${new Date(updatedAt).toLocaleString()}`;
    if (createdAt) return `created ${new Date(createdAt).toLocaleString()}`;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      handleUpdate();
    }
  }, [newTodoTitle, newTodoContent, newDueDate, completed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`relative w-52 border-none bg-primary shadow-md transition-all hover:scale-105 ${id && "group hover:pt-5"} hover:drop-shadow-xl md:w-72`}
      >
        {id && (
          <div className="absolute left-0 right-0 top-0 w-full opacity-0 transition-opacity group-hover:opacity-100 md:items-center">
            <GripHorizontal className="h-6 w-full" />
          </div>
        )}

        <div
          className={`${isOverdue && "bg-secondary"} ${completed && "bg-primary"} flex flex-col gap-2 rounded-xl bg-card p-3`}
        >
          <CardHeader className="space-y-0 p-0 pb-2">
            <CardTitle>
              <Textarea
                ref={titleTextareaRef}
                className={`${PPR.className} focus-visible:ring-none min-h-0 w-full max-w-full resize-none border-none p-0 text-xl font-bold tracking-wider shadow-none focus:outline-none focus:ring-0`}
                placeholder="Todo Title"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                rows={1}
              />
            </CardTitle>
          </CardHeader>
          {!completed && (
            <>
              <CardContent className="p-0">
                <Textarea
                  ref={contentTextareaRef}
                  className="focus-visible:ring-none min-h-0 w-full max-w-full resize-none border-none p-0 text-sm font-normal shadow-none focus:outline-none focus:ring-0"
                  placeholder="write your todo"
                  value={newTodoContent}
                  onChange={(e) => setNewTodoContent(e.target.value)}
                  rows={1}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-2 p-0">
                <div className="w-full">
                  <Label className="text-text/80 text-xs">Due Date</Label>
                  <DueDateSetter
                    dueDate={newDueDate}
                    setnewDueDateState={setnewDueDateState}
                  />
                </div>
                {!id && (
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [5, 0],
                    }}
                  >
                    <Button
                      disabled={!newTodoTitle.trim() || !newTodoContent.trim()}
                      className="text-background"
                      type="submit"
                      onClick={handleNewTodo}
                    >
                      <Plus />
                    </Button>
                  </motion.div>
                )}
                {id && (
                  <div className="justify-centerpt-2 flex items-center gap-1">
                    <Info className="h-3 w-fit" />
                    <span className="text-[0.7rem]">
                      {dateLastChange(updatedAt, createdAt)}
                    </span>
                  </div>
                )}
              </CardFooter>
            </>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
