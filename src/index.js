import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");
const todos = [
  {
    text: "je suis une todo",
    done: false,
    editMode: true,
  },
  {
    text: "faire du javascript",
    done: true,
    editMode: false,
  },
];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  buttonDelete.innerText = "Supprimer";
  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "Edit";
  buttonEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  li.innerHTML = `
  <span class="todo ${todo.done ? "done" : ""}"></span>
  <p>${todo.text}</p>
  `;
  li.append(buttonEdit, buttonDelete);
  li.addEventListener("click", (event) => {
    toggleTodo(index);
  });
  return li;
};

const createTodoEditElement = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  const buttonSave = document.createElement("button");
  buttonSave.innerHTML = "Save";
  buttonSave.addEventListener("click", (event) => {
    event.stopPropagation();
    editTodo(index, input);
  });
  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Cancel";
  buttonCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  li.append(input, buttonCancel, buttonSave);

  return li;
};

const addTodo = (text) => {
  text = text.trim();
  if (text) {
    todos.push({
      text: text[0].toUpperCase() + text.slice(1),
      done: false,
    });
    displayTodo();
  }
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const editTodo = (index, input) => {
  todos[index].text = input.value;
  todos[index].editMode = false;
  displayTodo();
};

displayTodo();
