import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import { Context } from "../store/appContext.js";

export const ToDoList = () => {
  const { actions, store } = useContext(Context);
  const [todos, setTodos] = useState(store.todosList);

  const taskAdd = (todos) => {
    setTodos(actions.addTodo(0, todos));
  };

  const taskDelete = (todos) => {
    setTodos(actions.removeTodo(todos));
  };

  return (
    <Context.Provider value={{ todos, taskAdd, taskDelete }}>
      <ToDoForm />
    </Context.Provider>
  );
};

const ToDoForm = () => {
    const props = useContext(Context);
    const [input, setInput] = useState("");
    const { actions, store } = useContext(Context);
  
    const inputRef = useRef(null);
    useEffect(() => {
      inputRef.current.focus();
    });
  
    const handleChange = (e) => {
      setInput(e.target.value);
    };
  
    const handleSubmit = (e) => {
      if (e.key === "Enter") {
        props.taskAdd(input);
        setInput("");
      }
    };
  
    function deleteTodo(e) {
      e.preventDefault();
      props.taskDelete(e.target.outerText);
    }
  
    const todosMap = props.todos.map((item, index) => {
      return (
        <div>
        <div key={index} className="todo-text" id="listitem" onClick={(e) => deleteTodo(e)}>
        {item}
        </div>
        </div>
      );
    });
  
    return (
      <div>
        <div className="todo-container">
          <div>
            <h1><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-brightness-alt-high" viewBox="0 0 16 16">
					<path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zm-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707l1.414 1.414zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4zm0 1a3 3 0 0 1 2.959 2.5H5.04A3 3 0 0 1 8 8z" />
				</svg>reminders</h1>
            <div>
              <input
                type="text"
                className="input"
                id="remindbox"
                onChange={handleChange}
                value={input}
                onKeyDown={handleSubmit}
                placeholder="remind me to . . ."
                ref={inputRef}
              />
            </div>
          </div>
          <div>
            <form>{todosMap}</form>
          </div>
          <div className="" id="footer"><i class="fa-solid fa-angles-right fa-beat"></i>   click on text to delete a reminder   <i class="fa-solid fa-angles-left fa-beat"></i></div>
        </div>
      </div>
    );
  };
  
  export default ToDoList;