import { useState, useEffect, useRef, use } from "react";
import { useToDoStore } from "@/provider/todo-store-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DueDateSetter } from "@/components/dueDateSetter";
import { ToDoItem } from "@/stores/todo-store";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PPR } from "@/app/fonts";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

export const TodoItem: React.FC<ToDoItem> = ({
  id,
  text,
  completed,
  createdAt,
  dueDate,
  updatedAt,
  isOverdue,
}) => {
  const { addTodo, setDueDate, removeTodo, updateTodo, toggleTodo } =
    useToDoStore((state) => state);
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
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
    <Card
      className={`relative max-w-80 border-2 border-transparent ${isOverdue ? "border-secondary bg-secondary/10" : "bg-primary/10"} ${completed && "border-2 border-green-200"}`}
    >
      {isOverdue && (
        <span className="absolute left-0 right-0 top-0 rounded-t-lg bg-secondary text-center text-sm text-background">
          Overdue
        </span>
      )}
      <CardHeader>
        <CardDescription className="text-text/80 text-xs">
          {dateLastChange(updatedAt, createdAt)}
        </CardDescription>
        <CardTitle>
          <Textarea
            ref={textareaRef}
            className={`${PPR.className} focus-visible:ring-none min-h-0 w-full max-w-full resize-none border-none p-0 text-xl font-bold tracking-wider shadow-none focus:outline-none focus:ring-0`}
            placeholder="Todo Title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
        </CardTitle>
      </CardHeader>
      {!completed && (
        <>
          <CardContent>
            <Textarea
              ref={textareaRef}
              className="focus-visible:ring-none min-h-0 w-full max-w-full resize-none border-none p-0 text-sm font-normal shadow-none focus:outline-none focus:ring-0"
              placeholder="write your todo"
              value={newTodoContent}
              onChange={(e) => setNewTodoContent(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="w-full">
              <Label className="text-text/80 text-xs">Due Date</Label>
              <DueDateSetter
                dueDate={newDueDate}
                setnewDueDateState={setnewDueDateState}
              />
            </div>
            <div className="bg- flex justify-end gap-2">
              {!id && (
                <Button
                  className="text-background"
                  type="submit"
                  onClick={handleNewTodo}
                >
                  add the todo
                </Button>
              )}
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
