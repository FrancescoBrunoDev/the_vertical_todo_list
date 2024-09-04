import { useToDoStore } from '@/provider/todo-store-provider';
import { TodoItem } from '@/components/todoItem';
import type { ToDoItem } from '@/stores/todo-store';

type ToDoListProps = {
    todos: ToDoItem[]
}

export const ToDoList: React.FC<ToDoListProps> = ({ todos }) => {
    console.log(todos);
    return (<ul className='flex gap-2 flex-wrap'>
        {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
        ))}
    </ul>)
}
