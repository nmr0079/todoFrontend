import { useEffect} from "react"
import { UseTodoContext } from "../hooks/UseTodoContext"


//components
import TodoItemsDetails from "../components/TodoItemsDetails"
import TodolistForm from "../components/TodolistForm"

const Home = () => {
    const {todolist, dispatch} = UseTodoContext()
    // const [todoitems, setTodoitems] = useState(null)
    //useEffect hook fires a function when the component is rendered, and it should be fired only once
useEffect(() => {
    const fetchTodoItems = async () => {
        const response = await fetch('https://todomern-backend-6jd2.onrender.com/api/todolist')
        const json = await response.json() //should have array of objects (todoitems)

        if (response.ok) {
            // setTodoitems(json)
            dispatch({type: 'SET_TODO', payload: json})
        }
    }

    fetchTodoItems()
}, [dispatch]) //the second argument is the dependency array, with it being empty, it will only fire the function once
    return (
     <div className="home">
       <div className="todoitems">
        {todolist && todolist.map((todoItem) => (
            <TodoItemsDetails key={todoItem._id} todoItem={todoItem}/>

        ))}

       </div>
       <TodolistForm />
     </div>
    )
}

export default Home
