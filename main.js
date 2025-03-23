// Variables
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const fliterOption = document.querySelector(".filter-todo");

// Add Event Listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
fliterOption.addEventListener("click", filterTodo);

function addTodo(e) {
  //preventing automatic refreshing
  e.preventDefault();

  //prevent adding an empty input
  if (todoInput.value === "") return;
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //creating a new list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //add to local stoorage
  saveLocalTodos(todoInput.value);
  //creating new buttons
  const competeButton = document.createElement("button");
  competeButton.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
  competeButton.classList.add("complete-btn");
  todoDiv.appendChild(competeButton);

  //creating second buttons
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  //add newly create div to parent todo-list
  todoList.appendChild(todoDiv);

  //clears the input field
  todoInput.value = " ";
}
//delet and check task
function deleteCheck(e) {
  const item = e.target;

  //delete todo list
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodo(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "done":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
          break;
        } else {
          todo.style.display = "none";
        }
        break;

      case "undone":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
          break;
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
//add todos into the local storage

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  //update local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

//invoke local storage

//retreiving the todos from the local storage
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //running a loop on each item added
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //creating a new list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //creating new buttons
    const competeButton = document.createElement("button");
    competeButton.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
    competeButton.classList.add("complete-btn");
    todoDiv.appendChild(competeButton);

    //creating second buttons
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    //add newly create div to parent todo-list
    todoList.appendChild(todoDiv);
  });
}
//delete saved in local storage
function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
