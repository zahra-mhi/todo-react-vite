import { useState } from "react";
import TodoList from "./todoList";
import { v4 as uuidv4 } from 'uuid';


export default function Todos() {

    const [todos, setTodos] = useState(
        [
            {
                id: uuidv4(),
                title: 'Tailwind CSS To DO App List 1',
                status: false
            },
            {
                id: uuidv4(),
                title: 'Tailwind CSS To DO App List 2',
                status: true
            }

        ]
    );

    const [newTodo, setNewTodo] = useState()

    const onInputNewTodoChangeHandler = (event) => {
        setNewTodo(event.target.value)
    };

    const addNewTodoHandler = (event) => {

        if (event.key == 'Enter' && event.target.value != '') {

            setTodos([
                ...todos,
                {
                    title: newTodo,
                    status: false
                }
            ]
            ),

                setNewTodo('');

        }
    };

    const deleteTodoHandler = (todo) => {

        const newTodos = todos.filter((todoItem) => {
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


    return (

        <div className="flex items-center justify-center h-screen">
            <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                <div className="flex items-center mb-6">
                    <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
                </div>
                <div className="relative">
                    <input type="text" placeholder="What needs to be done today?"
                        onChange={onInputNewTodoChangeHandler}
                        onKeyDown={addNewTodoHandler}
                        value={newTodo}
                        className="w-full px-2 py-3 border rounded outline-none border-grey-600" />
                </div>
                <TodoList todos={todos} deleteTodoHandler={deleteTodoHandler} toggleTodoStatusHandler={toggleTodoStatusHandler} editTodoTitleHandler={editTodoTitleHandler} />
            </div>
        </div>


    )

}