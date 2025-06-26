export class Todo {
  constructor(data, selector) {
    this.todoElement = document
      .querySelector(selector)
      .content.querySelector(".todo")
      .cloneNode(true);
    this._todoNameEl = this.todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this.todoElement.querySelector(".todo__completed");
    this._todoLabel = this.todoElement.querySelector(".todo__label");
    this._todoDate = this.todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this.todoElement.querySelector(".todo__delete-btn");
    this._dataName = data.name;
    this._dataCompleted = data.completed;
    this._dueDate = new Date(data.date);
    this._id = data.uniqueId;
  }
  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this.todoElement.remove();
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
