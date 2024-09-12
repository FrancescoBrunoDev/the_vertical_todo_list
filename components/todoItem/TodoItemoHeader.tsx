import { GripHorizontal } from "lucide-react";
import { CircleNumber } from "@/components/circleNumber";

type TodoItemHeaderProps = {
    id?: number;
    index?: number;
};

export const TodoItemHeader: React.FC<TodoItemHeaderProps> = ({ id, index }) => {
    if (!id) return null;

    return (
        <>
            <div className="absolute left-0 right-0 top-0 w-full opacity-0 transition-opacity group-hover:opacity-100 md:items-center">
                <GripHorizontal className="h-6 w-full" />
            </div>
            <div className="absolute -left-7">
                <CircleNumber number={(index || 0) + 1} />
            </div>
        </>
    );
};