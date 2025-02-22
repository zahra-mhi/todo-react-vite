import { useEffect, useReducer, useState } from "react";
import TodoList from "./todoList";
import { v4 as uuidv4 } from 'uuid';
import NewTodoInput from "./NewTodoInput";
import { toast } from "react-toastify";
import todoReducer from "../reducers/todoReducer";


export default function Todos() {

    // const [todos, setTodos] = useState([]);

    const [todos, todoDispatcher] = useReducer(todoReducer, [])

    const addNewTodoHandler = async (newTodoTitle) => {

        try {

            let res = await fetch('https://67b30741bc0165def8cf9bd0.mockapi.io/todos', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    title: newTodoTitle,
                    status: false
                })
            })

            let todoData = await res.json();

            todoDispatcher({
                type: 'add',
                todoData

            })
            toast.success('todo created !')

        } catch (error) {
            console.error('Fetch error:', error);
        }

    };

    const deleteTodoHandler = async (todo) => {

        let res = await fetch(`https://67b30741bc0165def8cf9bd0.mockapi.io/todos/${todo.id}`, {
            method: 'DELETE'
        })

        if (res.ok) {
            todoDispatcher({
                type: 'delete',
                id: todo.id
            })
            toast.success('todo deleted successfully !')

        } else {
            let message = await res.json();
            toast.error(message);
        }

    };


    const toggleTodoStatusHandler = async (todo) => {

        const res = await fetch(`https://67b30741bc0165def8cf9bd0.mockapi.io/todos/${todo.id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ status: !todo.status })
        })

        if (res.ok) {

            todoDispatcher({
                type: 'toggle-status',
                id: todo.id
            })

        } else {
            let message = await res.json();
            toast.error(message);
        }

    }


    const editTodoTitleHandler = async (todo, newTitle) => {

        const res = await fetch(`https://67b30741bc0165def8cf9bd0.mockapi.io/todos/${todo.id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        })

        if (res.ok) {
            todoDispatcher({
                type: 'edit-title',
                id: todo.id,
                newTitle
            })

        } else {
            let message = await res.json();
            toast.error(message);
        }

    }

    const getTodosFromApi = async () => {

        try {

            let res = await fetch('https://67b30741bc0165def8cf9bd0.mockapi.io/todos')
            let todos = await res.json();

            if (res.ok) {
                todoDispatcher(
                    {
                        type: 'initial-todos',
                        todos
                    }
                )
            }

            //show eror

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {

        getTodosFromApi();

    }, [])

    return (

        <div className="flex items-center justify-center h-screen">
            <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                <div className="flex items-center mb-6">
                    <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
                </div>
                <NewTodoInput addTodo={addNewTodoHandler} />
                <TodoList todos={todos} deleteTodoHandler={deleteTodoHandler} toggleTodoStatusHandler={toggleTodoStatusHandler} editTodoTitleHandler={editTodoTitleHandler} />
            </div>
        </div>

    )

}