import { useEffect, useState } from "react";
import TodoList from "./todoList";
import { v4 as uuidv4 } from 'uuid';
import NewTodoInput from "./NewTodoInput";


export default function Todos() {

    const [todos, setTodos] = useState([]);

    const addNewTodoHandler = (newTodoTitle) => {

        setTodos(
            [
                ...todos,
                {
                    id: uuidv4(),
                    title: newTodoTitle,
                    status: false
                }
            ]
        )

    };

    const deleteTodoHandler = (todo) => {

        let newTodos = todos.filter((todoItem) => {
            return todoItem.id !== todo.id;
        })
        setTodos(newTodos);
    };


    const toggleTodoStatusHandler = (todo) => {

        let changeTodo = todos.map((todoItem) => {

            if (todoItem.id == todo.id) {

                todoItem.status = !todoItem.status;

            }
            return todoItem;

        })

        setTodos(changeTodo);
    }


    const editTodoTitleHandler = (todo, newTitle) => {

        let newTodo = todos.map((todoItem) => {

            if (todoItem.id == todo.id) {

                todoItem.title = newTitle;

            }
            return todoItem;

        })

        setTodos(newTodo);
    }

    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem('todos_list')) ?? [])

    }, [])

    useEffect(() => {
        localStorage.setItem('todos_list', JSON.stringify(todos));
        console.log(localStorage.getItem('todos_list'));

    }, [todos])


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