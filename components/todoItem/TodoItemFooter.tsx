import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Info, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { DueDateSetter } from "@/components/dueDateSetter";

type TodoItemFooterProps = {
    id?: number;
    edited: { title: string; content: string; dueDate: Date };
    setEditedTodo: React.Dispatch<React.SetStateAction<{ title: string; content: string; dueDate: Date }>>;
    handleAddTodo: () => void;
    updatedAt?: Date;
    createdAt?: Date;
    dateLastChange: (updatedAt?: Date, createdAt?: Date) => string;
};

export const TodoItemFooter: React.FC<TodoItemFooterProps> = ({
    id,
    edited,
    setEditedTodo,
    handleAddTodo,
    updatedAt,
    createdAt,
    dateLastChange,
}) => {
    return (
        <CardFooter className="flex flex-col gap-2 p-0">
            <div className="w-full">
                <Label className="text-xs">Due Date</Label>
                <DueDateSetter
                    dueDate={edited.dueDate}
                    setnewDueDateState={(newDueDate: Date) =>
                        setEditedTodo((prev) => ({
                            ...prev,
                            dueDate: newDueDate,
                        }))
                    }
                />
            </div>

            {!id ? (
                <motion.div
                    initial={{ scale: 1, rotate: 0 }}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: {
                            duration: 0.5,
                        },
                    }}
                >
                    <Button
                        disabled={!edited.title.trim() || !edited.content.trim()}
                        className="text-background"
                        type="submit"
                        onClick={handleAddTodo}
                    >
                        <Plus />
                    </Button>
                </motion.div>
            ) : (
                <div className="flex items-center justify-center gap-1 pt-2">
                    <Info className="h-3 w-fit" />
                    <span className="text-[0.7rem]">
                        {dateLastChange(updatedAt, createdAt)}
                    </span>
                </div>
            )}
        </CardFooter>
    );
};