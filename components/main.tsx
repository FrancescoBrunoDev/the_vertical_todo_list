'use client';

import { useState } from 'react';
import { useToDoStore } from "@/provider/todo-store-provider";
import { TodoItem } from '@/components/todoItem';
import { ToDoList } from '@/components/todoList';
import { FilterSelector } from '@/components/filterSelector';

export const Main = () => {
    const { todos, settings } = useToDoStore((state) => state);

    const groupedTodos = Object.groupBy(todos, (todo) => todo.completed ? "completed" : "notCompleted")
    const fiteredTodos = settings.filter === "all" ? todos : groupedTodos[settings.filter] || [];

    return (
        <div className='flex flex-col gap-4 items-center'>
            <NewTodo />
            <FilterSelector />
            <ToDoList todos={fiteredTodos} />
        </div>
    )
}

const NewTodo = () => {
    const todo = {
        id: undefined,
        text: {
            title: "",
            content: ""
        }, completed: false,
        createdAt: undefined,
        dueDate: new Date(),
        updatedAt: undefined,
        isOverdue: false
    }
    return (
        <div className="">
            <TodoItem {...todo} />
        </div>
    )
}