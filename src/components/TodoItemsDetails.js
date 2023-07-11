// import { UseTodoContext } from "../hooks/UseTodoContext"

// //date-fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// const TodoItemsDetails = ({todoItem}) => {

//     const { dispatch } = UseTodoContext()

//     const handleClick = async () => {
//         const response = await fetch('/api/todolist/'+todoItem._id, {
//             method: 'DELETE'
//         })

//         const json = await response.json()

//         if(response.ok){
//             dispatch({type: 'DELETE_TODO', payload: json})
//         }
//     }

//     return (
//         <div className="todoItems-details">
//             <h4>{todoItem.title}</h4>
//             <p><strong>Description : </strong>{todoItem.description}</p>
//             <p><strong>Created At : </strong>{formatDistanceToNow(new Date(todoItem.createdAt), {addSuffix: true})}</p>
//             <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
//         </div>
//     )
// }

// export default TodoItemsDetails
// import { useState } from "react";
// import { UseTodoContext } from "../hooks/UseTodoContext";
// import formatDistanceToNow from "date-fns/formatDistanceToNow";

// const TodoItemsDetails = ({ todoItem }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [title, setTitle] = useState(todoItem.title);
//   const [description, setDescription] = useState(todoItem.description);
//   const { dispatch } = UseTodoContext();

//   const handleDeleteClick = async () => {
//     const response = await fetch("/api/todolist/" + todoItem._id, {
//       method: "DELETE",
//     });

//     const json = await response.json();

//     if (response.ok) {
//       dispatch({ type: "DELETE_TODO", payload: json });
//     }
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     const response = await fetch("/api/todolist/" + todoItem._id, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title, description }),
//     });

//     const json = await response.json();

//     if (response.ok) {
//       dispatch({ type: "EDIT_TODO", payload: json });
//       setIsEditing(false);
//     }
//   };

//   return (
//     <div className="todoItems-details">
//       {isEditing ? (
//         <>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <button onClick={handleSaveClick}>Save</button>
//         </>
//       ) : (
//         <>
//           <h4>{todoItem.title}</h4>
//           <p>
//             <strong>Description : </strong>
//             {todoItem.description}
//           </p>
//           <p>
//             <strong>Created At : </strong>
//             {formatDistanceToNow(new Date(todoItem.createdAt), {
//               addSuffix: true,
//             })}
//           </p>
//           <span
//           className="material-symbols-outlined"
//           onClick={handleEditClick}
//         >
//           edit
//         </span>
//           <span
//             className="material-symbols-outlined"
//             onClick={handleDeleteClick}
//           >
//             delete
//           </span>
//         </>
         
//       )}
//     </div>
//   );
// };

// export default TodoItemsDetails;
import { useState } from "react";
import { UseTodoContext } from "../hooks/UseTodoContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TodoItemsDetails = ({ todoItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todoItem.title);
  const [description, setDescription] = useState(todoItem.description);
  const [done, setDone] = useState(todoItem.done);
  const { dispatch } = UseTodoContext();

  const handleDeleteClick = async () => {
    const response = await fetch("https://todomern-backend-6jd2.onrender.com/api/todolist/" + todoItem._id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const response = await fetch("https://todomern-backend-6jd2.onrender.com/api/todolist/" + todoItem._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description , done}),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "EDIT_TODO", payload: json });
      setIsEditing(false);
    }
  };

  const toggleTodo = async () => {
    setDone(!done)
    const response = await fetch("https://todomern-backend-6jd2.onrender.com/api/todolist/" + todoItem._id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, done}),
  });

  const json = await response.json();

  if (response.ok) {
    dispatch({ type: "MARK_TODO", payload: json });
  }
  }

  return (
    <div className="todoItems-details">
      <h4 onClick={() => toggleTodo()}
      style={{
        textDecoration: done ? 'line-through' : '' ,
        cursor: 'pointer' 
      }}
      >
        {isEditing ? (
          <input
            type="text"
            placeholder="Enter the new title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          todoItem.title
        )}
      </h4>
      <p>
        <strong>Description: </strong>
        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          todoItem.description
        )}
      </p>
      <p>
        <strong>Created : </strong>
        {formatDistanceToNow(new Date(todoItem.createdAt), {
          addSuffix: true,
        })}
      </p>
      <div>
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <>
            <span
              className="material-symbols-outlined"
              onClick={handleEditClick}
            >
              edit
            </span>
            <span
              className="material-symbols-outlined"
              onClick={handleDeleteClick}
            >
              delete
            </span>
          </>
        )}
        </div>
    </div>
  );
};

export default TodoItemsDetails;
