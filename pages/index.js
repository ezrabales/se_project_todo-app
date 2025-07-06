import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos } from "../utils/constants.js";
import { validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];

export const todoCounter = new TodoCounter(
  initialTodos,
  validationConfig.counterText
);

const section = new Section({
  items: initialTodos,
  renderer: (inputValues) => {
    renderTodo(inputValues);
  },
  containerSelector: ".todos__list",
});

const todoForm = new PopupWithForm(addTodoPopup, (inputValues) => {
  todoCounter.updateTotal(true);
  const name = inputValues.name;
  const dateInput = inputValues.date;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();

  const values = { name, date, id };
  renderTodo(values);
});
todoForm.setEventListeners();

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();

const generateTodo = (data) => {
  const newTodo = new Todo(
    data,
    "#todo-template",
    todoCounter.updateCompleted,
    todoCounter.updateTotal
  );
  const newTodoElement = newTodo.getView();
  return newTodoElement;
};

addTodoButton.addEventListener("click", () => {
  todoForm.open();
});

section.renderItems();
