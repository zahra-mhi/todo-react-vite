import { useState } from "react";

export default function NewTodoInput({ addTodo }) {

    const [newTodo, setNewTodo] = useState('');

    const onInputNewTodoChangeHandler = (event) => {
        setNewTodo(event.target.value)
    };

    const addNewTodoHandler = (event) => {

        if (event.key == 'Enter' && event.target.value != '') {

            addTodo(newTodo);
            setNewTodo('');

        };
    }

    return (
        <div className="relative">
            <input type="text" placeholder="What needs to be done today?"
                onChange={onInputNewTodoChangeHandler}
                onKeyDown={addNewTodoHandler}
                value={newTodo}
                className="w-full px-2 py-3 border rounded outline-none border-grey-600" />
        </div>
    )
}