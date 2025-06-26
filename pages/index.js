import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos } from "../utils/constants.js";
import { validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();

const generateTodo = (data) => {
  const newTodo = new Todo(data, "#todo-template");
  const newTodoElement = newTodo.getView();
  return newTodoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const uniqueId = uuidv4();

  const values = { name, date, uniqueId };
  renderTodo(values);
  closeModal(addTodoPopup);
  newFormValidator.resetValidation();
});

initialTodos.forEach((item) => {
  renderTodo(item);
});
