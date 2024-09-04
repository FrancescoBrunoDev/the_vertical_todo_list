import { useState } from 'react';
import { TodoItem } from '@/components/todoItem';
import type { ToDoItem } from '@/stores/todo-store';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd-next';
import { useToDoStore } from '@/provider/todo-store-provider';

type ToDoListProps = {
    todos: ToDoItem[]
}

export const ToDoList: React.FC<ToDoListProps> = ({ todos }) => {
    const { setTodos } = useToDoStore((state) => state);

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;

        const newItems = Array.from(todos);
        const [reorderedItem] = newItems.splice(result.source.index, 1);

        newItems.splice(result.destination.index, 0, reorderedItem);

        setTodos(newItems);
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
                {(provided: any) => (
                    <ul className='flex gap-2 flex-col' {...provided.droppableProps} ref={provided.innerRef}>
                        {todos.map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                {(provided: any) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <TodoItem {...todo} />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>)
}
