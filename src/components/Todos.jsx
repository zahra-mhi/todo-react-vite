import { useEffect, useReducer, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import NewTodoInput from "./NewTodoInput";
import { toast } from "react-toastify";
import todoReducer from "../reducers/todoReducer";
import { TodosContext } from "../contexts/TodosContext";

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

                <TodosContext.Provider value={{ todos, todoDispatcher }}>
                    <TodoList />
                </TodosContext.Provider>
            </div>
        </div>

    )

}