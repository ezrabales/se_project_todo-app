import { validationConfig } from "../utils/constants.js";

export class Todo {
  constructor(data, selector, updateCompleted, updateTotal) {
    this.todoElement = document
      .querySelector(selector)
      .content.querySelector(".todo")
      .cloneNode(true);
    this._todoNameEl = this.todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this.todoElement.querySelector(
      validationConfig.todoCompleted
    );
    this._todoLabel = this.todoElement.querySelector(".todo__label");
    this._todoDate = this.todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this.todoElement.querySelector(".todo__delete-btn");
    this._dataName = data.name;
    this._dataCompleted = data.completed;
    this._dueDate = new Date(data.date);
    this._id = data.id;
    this._updateCompleted = updateCompleted;
    this._updateTotal = updateTotal;
  }
  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("click", () => {
      const isCompleted = this._todoCheckboxEl.checked;
      this._updateCompleted(isCompleted);
    });

    this._todoDeleteBtn.addEventListener("click", (evt) => {
      this.todoElement.remove();
      this._updateTotal(false);
      if (
        evt.target.parentElement.parentElement.parentElement.querySelector(
          validationConfig.todoCompleted
        ).checked
      ) {
        this._updateCompleted(false);
      }
    });
  }
  getView() {
    this._todoNameEl.textContent = this._dataName;
    this._todoCheckboxEl.checked = this._dataCompleted;
    this._todoCheckboxEl.id = this._id;
    this._todoLabel.setAttribute("for", this._id);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
    this._setEventListeners();
    return this.todoElement;
  }
}
