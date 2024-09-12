import { Textarea } from "@/components/ui/textarea";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { display } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
};

type TodoItemContentProps = {
    edited: { title: string; content: string; dueDate: Date };
    setEditedTodo: React.Dispatch<React.SetStateAction<{ title: string; content: string; dueDate: Date }>>;
};

export const TodoItemContent: React.FC<TodoItemContentProps> = ({ edited, setEditedTodo }) => {
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (titleRef.current) autoResize(titleRef.current);
        if (contentRef.current) autoResize(contentRef.current);
    }, [edited.title, edited.content]);

    return (
        <>
            <CardHeader className="space-y-0 p-0 pb-2">
                <CardTitle>
                    <Textarea
                        ref={titleRef}
                        className={cn(
                            display.className,
                            "focus-visible:ring-none min-h-0 w-full max-w-full resize-none border-none p-0 text-xl font-bold uppercase tracking-wider shadow-none placeholder:text-text/30 focus:outline-none focus:ring-0 dark:placeholder:text-text/80",
                        )}
                        placeholder="Todo Title"
                        value={edited.title}
                        onChange={(e) => {
                            setEditedTodo((prev) => ({ ...prev, title: e.target.value }));
                            autoResize(e.target);
                        }}
                        rows={1}
                    />
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Textarea
                    ref={contentRef}
                    className="focus-visible:ring-none min-h-0 w-full max-w-full resize-none border-none p-0 text-sm font-normal shadow-none placeholder:text-text/30 focus:outline-none focus:ring-0 dark:placeholder:text-text/80"
                    placeholder="Write your todo"
                    value={edited.content}
                    onChange={(e) => {
                        setEditedTodo((prev) => ({
                            ...prev,
                            content: e.target.value,
                        }));
                        autoResize(e.target);
                    }}
                    rows={1}
                />
            </CardContent>
        </>
    );
};