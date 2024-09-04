import { useState, useEffect } from 'react';
import { useToDoStore } from "@/provider/todo-store-provider";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DueDateSetter } from "@/components/dueDateSetter";
import { ToDoItem } from '@/stores/todo-store';
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export const TodoItem: React.FC<ToDoItem> = ({ id, text, completed, createdAt, dueDate, updatedAt }) => {
    const { addTodo, setDueDate, removeTodo, updateTodo, toggleTodo } = useToDoStore((state) => state);
    const [newTodoTitle, setNewTodoTitle] = useState<string>(text ? text.title : "");
    const [newTodoContent, setNewTodoContent] = useState<string>(text ? text.content : "");
    const [newDueDate, setnewDueDateState] = useState<Date>(dueDate ? dueDate : new Date());
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id) {
            handleNewTodo()
        } else {
            handleUpdate();
        }
    }

    const handleNewTodo = () => {
        if (newTodoTitle.trim() && newTodoContent.trim()) {
            const id = addTodo(newTodoTitle, newTodoContent);
            if (newDueDate && id !== undefined) {
                setDueDate(id, newDueDate);
            }
            setNewTodoTitle("");
            setNewTodoContent("");
        }
    }

    const handleUpdate = () => {
        if (!id) return;
        const updatedAt = new Date();
        updateTodo(id, newTodoTitle, newTodoContent, newDueDate, updatedAt);
    }

    const dateLastChange = (updatedAt?: Date, createdAt?: Date) => {
        if (updatedAt) return `last updated ${new Date(updatedAt).toLocaleString()}`;
        if (createdAt) return `created ${new Date(createdAt).toLocaleString()}`;
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            handleUpdate();
        }
    }, [newTodoTitle, newTodoContent, newDueDate]);

    return (
        <form onSubmit={handleSumit}>
            <Card>
                <CardHeader>
                    <CardTitle><input className='w-full h-fit' type="text" placeholder="Todo Title" value={newTodoTitle} onChange={(e) => setNewTodoTitle(e.target.value)} /></CardTitle>
                    <CardDescription>{dateLastChange(updatedAt, createdAt)}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p><Textarea className='w-full' placeholder="write your todo" value={newTodoContent} onChange={(e) => setNewTodoContent(e.target.value)} /></p>
                </CardContent>
                <CardFooter className='flex flex-col gap-2'>
                    <DueDateSetter dueDate={newDueDate} setnewDueDateState={setnewDueDateState} />
                    <div className='flex justify-end gap-2'>
                        {!id && <Button type="submit">add the todo</Button>}
                        {id && <Button onClick={() => void removeTodo(id)} variant={"destructive"}>delete the todo</Button>}
                        {id && (
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" checked={completed} onCheckedChange={() => void toggleTodo(id)} />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Done
                                </label>
                            </div>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </form >)
}