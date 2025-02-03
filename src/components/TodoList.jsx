import TodoListItems from "./TodoListItems";


export default function TodoList({ todos, deleteTodoHandler, toggleTodoStatusHandler, editTodoTitleHandler }) {


    return (

        <ul className="list-reset">
            {
                todos.map((todo, index) => <TodoListItems key={index} todo={todo} deleteTodoHandler={deleteTodoHandler} toggleTodoStatusHandler={toggleTodoStatusHandler} editTodoTitleHandler={editTodoTitleHandler} />)
            }
        </ul>


    )

}