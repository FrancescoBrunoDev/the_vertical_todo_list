import { TodoItem } from "@/components/todoItem";
import type { ToDoItem } from "@/stores/todo-store";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd-next";
import { useToDoStore } from "@/provider/todo-store-provider";
import confetti from "canvas-confetti";
import { ActionDraggableAreas } from "@/components/actionDraggableAreas";

type ToDoListProps = {
  todos: ToDoItem[];
};

export const ToDoList: React.FC<ToDoListProps> = ({ todos }) => {
  const { setTodos, removeTodo, toggleTodo, setIsOverdue } = useToDoStore(
    (state) => state,
  );

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
      const end = Date.now() + 1 * 300; // 3 seconds
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      toggleTodo(result.draggableId);
      setIsOverdue(result.draggableId);
      const completeState = todos.find(
        (todo) => todo.id === result.draggableId,
      )?.completed;

      if (!completeState) frame();
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <ActionDraggableAreas />
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
