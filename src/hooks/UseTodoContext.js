import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";

export const UseTodoContext = () => {
    const context = useContext(TodoContext)

    if(!context){
        throw Error('UseTodoContext must be used inside an TodoContextProvider')
    }
    return context
}