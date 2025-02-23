import { useContext } from "react";
import TodoListItems from "./TodoListItems";
import { TodosContext } from "../contexts/TodosContext";

export default function TodoList() {

    const { todos } = useContext(TodosContext)

    return (

        <ul className="list-reset">
            {
                todos.map((todo, index) => <TodoListItems key={index} todo={todo} />)
            }
        </ul>

    )

}