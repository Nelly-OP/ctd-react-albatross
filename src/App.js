import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./components/Index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./components/InputWithLabel";
import AddTodoForm from "./components/AddTodoForm";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log(process.env);
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?view=Grid view&sort[0][field]=Title&sort[0][direction]=asc`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        data.records.sort((objectA, objectB) => {
          if (objectA.fields.Title < objectB.fields.Title) {
            return -1;
          } else if (objectA.fields.Title === objectB.fields.Title) {
            return 0;
          } else {
            return 1;
          }
        });

        const todos = data.records.map((todo) => {
          return { id: todo.id, title: todo.fields.Title };
        });
        setTodoList(todos);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      const json = JSON.stringify(todoList);
      localStorage.setItem("todoList", json);
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const newList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newList);
    // console.log(title);
  };

  function appSub() {
    return (
      <div>
        <h1>To Do List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        {isLoading ? (
          <span>Loading ...</span>
        ) : (
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        )}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={appSub()}></Route>
        <Route path="/new" element={<h1>New Todo List</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
