import { Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

type DroppableAreaProps = {
  isDragging: boolean;
};

// Configuration for droppable areas
const droppableAreas = [
  {
    title: "drag here to delete",
    id: "delete",
    additionalClasses:
      "border-secondary bg-secondary/10 text-secondary left-0 opacity-40",
  },
  {
    title: "drag here to mark as done",
    id: "completed",
    additionalClasses:
      "border-primary bg-primary/10 text-primary right-0 opacity-70",
  },
];

export const ActionDraggableAreas: React.FC<DroppableAreaProps> = ({
  isDragging,
}) => (
  <div
    className={`fixed inset-0 bottom-16 top-64 flex items-center justify-center md:bottom-10`}
  >
    <div className="container relative h-full">
      {droppableAreas.map(({ title, id, additionalClasses }) => (
        <Droppable key={id} droppableId={id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "absolute top-0 flex h-full w-2/12 items-center justify-center rounded-xl border-2 border-dashed transition-all lg:w-1/4",
                additionalClasses,
                isDragging && "opacity-100 hover:scale-105",
              )}
            >
              <span
                className={cn({ "rotate-180": id === "delete" })}
                style={{ writingMode: "vertical-rl" }}
              >
                {title}
              </span>
              <span className="hidden">{provided.placeholder}</span>
            </div>
          )}
        </Droppable>
      ))}
    </div>
  </div>
);
