/* eslint-disable react/prop-types */
import {useState} from 'react';
import {useToDo} from '../contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoItem = ({todo}) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMSG, setTodoMSG] = useState(todo.todo);
  const {updatedTodo, deleteTodo, toggleComplete} = useToDo();

  const editTodo = () => {
    updatedTodo(todo.id, {...todo, todo: todoMSG});
    setIsTodoEditable(false);
  };
  return (
    <div className="">
      <input
        type="checkbox"
        className=""
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <input
        type="text"
        className={`bg-transparent ml-5 outline-none rounded-md p-2 
        ${
          isTodoEditable ? "border-2 border-sky-400" : ""
      } 
      ${todo.completed ? "line-through" : ""}
      `}
        value={todoMSG}
        onChange={(e) => setTodoMSG(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="text-xs border-2 border-sky-500 py-2 rounded-lg bg-sky-500 text-black px-3 ml-3 hover:scale-110 transition-all"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? <FontAwesomeIcon icon={faFloppyDisk} /> : <FontAwesomeIcon icon={faPenToSquare} />}
      </button>
      <button className="text-xs border-2 border-sky-500 py-2 rounded-lg bg-sky-500 ml-3 text-black px-3 hover:scale-110 transition-all" onClick={() => deleteTodo(todo.id)}>
      <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default TodoItem;
