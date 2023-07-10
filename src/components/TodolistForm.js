import { useState } from "react"
import { UseTodoContext } from "../hooks/UseTodoContext"
const TodolistForm = () => {
    const { dispatch } = UseTodoContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [done, setDone] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDone(false)

        const todoItem  = {title, description, done}

        const response = await fetch('/api/todolist', {
            method: 'POST',
            body : JSON.stringify(todoItem),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setDescription('')
            setDone(false)
            setError(null)
            setEmptyFields([])
            console.log('new todo item added', json)
            dispatch({type: 'CREATE_TODO', payload: json})
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add Todo Item</h3>

            <label>Title : </label>
            <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Description : </label>
            <input 
            type="text" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes('description') ? 'error' : ''}
            />

            <button>Add</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TodolistForm