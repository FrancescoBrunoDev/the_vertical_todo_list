import { useState } from "react";
import { TodoItem } from "@/components/todoItem";
import type { ToDoItem } from "@/stores/todo-store";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd-next";
import { useToDoStore } from "@/provider/todo-store-provider";

type ToDoListProps = {
  todos: ToDoItem[];
};

export const ToDoList: React.FC<ToDoListProps> = ({ todos }) => {
  const { setTodos, removeTodo, toggleTodo } = useToDoStore((state) => state);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;

    // handle reordering of the list
    if (sourceId === "todos" && destinationId === "todos") {
      const newItems = Array.from(todos);
      const [reorderedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedItem);

      setTodos(newItems);
    }

    //handle moving itmes in different zones
    if (destinationId === "delete") {
      removeTodo(result.draggableId);
    } else if (destinationId === "completed") {
      toggleTodo(result.draggableId);
    }
  };

  // TODO it works only on the top section of the draggable area.

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
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
                complete
              </div>
            )}
          </Droppable>
        </div>
      </div>
      <Droppable droppableId="todos">
        {(provided: any) => (
          <ul
            className="z-20 flex w-full flex-col items-center gap-4 pb-8"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided: any) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem {...todo} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
