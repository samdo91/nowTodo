import React from "react";
import { useAtom } from "jotai";
import { todoLists } from "../store/jotai";
import { AiFillCheckCircle, AiOutlineDownCircle } from "react-icons/ai";
function MainPageBody() {
  const [todoList, setTodoList] = useAtom(todoLists);

  const saveTodoListToLocalStorage = (updatedList) => {
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  const deleteTodolist = (item) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== item.id);
    setTodoList(updatedTodoList);
    saveTodoListToLocalStorage(updatedTodoList);
  };

  const toggleTodo = (item) => {
    console.log(item);
    const updatedTodoList = todoList.map((todo) =>
      todo.id === item.id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodoList(updatedTodoList);
  };

  return (
    <div>
      {todoList.map((item) => {
        return (
          <div key={item.id}>
            <div>
              {item.checked ? (
                <AiFillCheckCircle onClick={() => toggleTodo(item)} />
              ) : (
                <AiOutlineDownCircle onClick={() => toggleTodo(item)} />
              )}
            </div>
            <div value={item.todo}>{item.todo}</div>
            <button onClick={() => deleteTodolist(item)}>X</button>
          </div>
        );
      })}
    </div>
  );
}

export default MainPageBody;
