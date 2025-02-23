import { useContext, useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import { toast } from "react-toastify";
import { TodosContext } from "../contexts/TodosContext";



export default function TodoListItems({ todo }) {

    const [editMode, setEditMode] = useState(false);

    const editTodoHandler = (event) => {

        if (event.key == 'Enter') {

            editTodoTitleHandler(todo, event.target.value)
            setEditMode(false);

        }

    }

    const { todoDispatcher } = useContext(TodosContext)

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


    return (

        <li className="relative flex items-center justify-between px-2 py-6 border-b">
            {

                editMode

                    ?

                    <div className="w-full flex items-center">
                        <input type="text" onKeyDown={editTodoHandler} className="w-full px-8 py-2 border border-gray-200 rounded" defaultValue={todo?.title} />

                        <DeleteIcon className="ml-2" onClick={() => setEditMode(false)} />

                    </div>

                    :

                    (

                        <div>

                            <div>
                                <input type="checkbox" checked={todo?.status} onChange={() => toggleTodoStatusHandler(todo)} className="" />
                                <p className={`inline-block mt-1 ml-2 text-gray-600 ${todo?.status ? 'line-through' :
                                    ''} `}>{todo?.title}</p>
                            </div>
                            <button type="button" className="absolute right-0 flex items-center space-x-1">

                                <EditIcon onClick={() => setEditMode(true)} />
                                <DeleteIcon onClick={() => deleteTodoHandler(todo)} />

                            </button>

                        </div>


                    )

            }

        </li>

    )

}