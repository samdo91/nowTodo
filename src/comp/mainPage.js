import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { todoLists } from "../store/jotai";
import styled from "@emotion/styled";

import MainPageBody from "./mainPageBody";

function MainPage() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [todoList, setTodoList] = useAtom(todoLists);
  const handleCurrentToDo = (e) => {
    setCurrentTodo(e.target.value);
  };

  useEffect(() => {
    const todoListString = localStorage.getItem("todoList");

    if (todoListString) {
      const todoListArray = JSON.parse(todoListString);
      setTodoList(todoListArray);
    }
  }, []);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  const saveTodoListToLocalStorage = (newList) => {
    localStorage.setItem("todoList", JSON.stringify(newList));
  };
  const addTodoList = () => {
    const newList = [
      ...todoList,
      { todo: currentTodo, id: getCurrentDateTime(), checked: false },
    ];

    setTodoList(newList);
    saveTodoListToLocalStorage(newList);
    setCurrentTodo("");
  };

  const checkedRemoveCheckedItems = () => {
    const updatedTodoList = todoList.filter((todo) => !todo.checked);
    setTodoList(updatedTodoList);
    saveTodoListToLocalStorage(updatedTodoList);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="할일"
        value={currentTodo}
        onChange={handleCurrentToDo}
      />
      <button onClick={addTodoList}>추가</button>
      <button onClick={checkedRemoveCheckedItems}>Remove Checked Items</button>
      <MainPageBody />
    </div>
  );
}

export default MainPage;
