import { createContext, useReducer } from "react";

export const TodoContext = createContext()

export const TodoReducer = (state,action) => {  //state is the previous state
    switch (action.type) {
        case 'SET_TODO': 
            return {
                todolist: action.payload
            }

        case 'CREATE_TODO':
            return {
                todolist: [action.payload, ...state.todolist]  //adding the new todoitem with the rest of the list
            }

        case 'DELETE_TODO':
            return {
                todolist: state.todolist.filter((w) => w._id !== action.payload._id)
            }
        case 'EDIT_TODO':
            return {
                    todolist: state.todolist.map((todo) =>
                        (todo._id === action.payload._id) ? action.payload : todo
                    )
            }
        case 'MARK_TODO':
            return {
                todolist: state.todolist.map((todo) => 
                    (todo._id === action.payload._id) ? action.payload : todo
                )
            }
            
        default:
            return state

    }
}

export const TodoContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(TodoReducer, {
        todolist: null
    })//second argument with initial value
    return (
        <TodoContext.Provider value={{...state, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}