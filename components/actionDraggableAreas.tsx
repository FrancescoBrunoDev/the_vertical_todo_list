import { Droppable } from "react-beautiful-dnd-next";

export const ActionDraggableAreas = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="container relative h-full">
        <Droppable droppableId="delete">
          {(provided: any) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="absolute bottom-1/4 left-2 top-1/4 flex w-2/12 rotate-180 items-center justify-center rounded-xl border-2 border-dashed border-secondary bg-secondary/10 text-secondary lg:bottom-2 lg:top-1/4 lg:w-1/3"
              style={{
                writingMode: "vertical-rl",
              }}
            >
              drag here to delete
            </div>
          )}
        </Droppable>
        <Droppable droppableId="completed">
          {(provided: any) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="absolute bottom-1/4 right-2 top-1/4 flex w-2/12 items-center justify-center rounded-xl border-2 border-dashed border-primary bg-primary/10 text-primary lg:bottom-2 lg:top-1/4 lg:w-1/3"
              style={{
                writingMode: "vertical-rl",
              }}
            >
              drag here to complete
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};
