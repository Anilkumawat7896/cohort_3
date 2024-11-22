function createTodo() {
  Event.preventDefault;

  let inputValue = document.querySelector(".todo-input");
  let todoIndex = new Date().getTime();

  //   new todo created
  let newTodo = document.createElement("div");
  newTodo.className = "todos";

  newTodo.setAttribute("data-index", todoIndex);
  newTodo.innerHTML = `<span class="todo-text-content">${
    inputValue.value
  }  </span> &nbsp;&nbsp;<span class="delete-btn" onClick='deleteTodo(${todoIndex.toString()})'>Delete</span>&nbsp;&nbsp;<span class="edit-btn" onClick='editTodo(${todoIndex.toString()})'>Edit</span>`;

  // append new todo to todo-list
  if (inputValue.value.trim() !== "") {
    let todoList = document.querySelector(".todo-list");

    todoList.appendChild(newTodo);
    inputValue.value = "";
  }
}

function deleteTodo(index) {
  let todoList = document.querySelector(".todo-list");
  let todoItem = document.querySelector(`.todos[data-index='${index}']`);
  todoList.removeChild(todoItem);
}

function editTodo(index) {
  // hide submit button
  let createButton = document.querySelector(".submit-button");
  createButton.style.display = "none";
  // display update button
  let updateButton = document.querySelector(".update-button");
  updateButton.style.display = "block";

  let parent = document.querySelector(`.todos[data-index='${index}']`);
  if (parent) {
    // set todo text to input box value
    let child = parent.querySelector(".todo-text-content");
    let formInputTag = document.querySelector(".todo-input");
    formInputTag.value = child.textContent;

    let updateButton = document.querySelector(".update-button");
    updateButton.addEventListener("click", () => {
      updateTodo(index);
    });
  } else {
    console.log("parent div not found");
  }
}

function updateTodo(index) {
  let parent = document.querySelector(`.todos[data-index='${index}']`);
  if (parent) {
    let child = parent.querySelector(".todo-text-content");
    let newTodo = document.querySelector(".todo-input");
    child.textContent = newTodo.value;

    // toggle buttons
    let createButton = document.querySelector(".submit-button");
    createButton.style.display = "block";
    // display update button
    let updateButton = document.querySelector(".update-button");
    updateButton.style.display = "none";
    newTodo.value = "";
  } else {
    console.log("parent div not found");
  }
}
