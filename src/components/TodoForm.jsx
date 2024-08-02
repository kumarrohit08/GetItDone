import {useState} from 'react';
import {useToDo} from '../contexts';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const TodoForm = () => {
  const [todo, setTodo] = useState('');
  const {addTodo} = useToDo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({todo, completed: false});
    setTodo('');
  };
  return (
    <form className="flex" onSubmit={add}>
      <input
        type="text"
        className="w-full text-white rounded-l-lg px-3 py-2 border-2 border-sky-500 outline-none bg-transparent text-xl "
        placeholder="Write todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="text-3xl border-2 border-sky-500 p-2 rounded-e-lg bg-sky-500 text-black px-4 hover:text-[2rem] transition-all "
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default TodoForm;
