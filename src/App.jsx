import {useEffect, useState} from 'react';
import {TodoProvider} from './contexts';
import {TodoForm, TodoItem} from './components'
function App() {
  const [todos, setTodos] = useState([]);

  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev,])
  }
  const updatedTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(id===prevTodo.id?todo:prevTodo)))
  }
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>id!==todo.id));
  }
  const toggleComplete=(id)=>{
    
    setTodos((prev)=> 
    prev.map((prevTodo)=>
    (prevTodo.id===id)?{...prevTodo,completed:!(prevTodo.completed)}:prevTodo))
    console.log(todos)
  }


  useEffect(() => {
    const todos=JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length>0){
      setTodos(todos)
    }
  }, [])
  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])
  
  
  return (
    <TodoProvider value={{todos,addTodo,deleteTodo,updatedTodo,toggleComplete}}>
      <div className="bg-gray-800 text-white min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 flex flex-col  text-center">
          <h1 className="text-4xl font-bold text-center mb-8 mt-2 text-sky-400">ToDo List</h1>
          <div className="mb-20"><TodoForm /> </div>
          <div className="w-[70%] mx-auto bg-sky-900 h-[0.5px] mb-10"></div>
          <div className="flex flex-wrap gap-y-3 ">
            {
            todos.map((todo)=>(
              <div className="w-full border-b-[0.5px] pb-3 border-b-sky-400" key={todo.id}>
                <TodoItem todo={todo} />
              </div>)
              )
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
