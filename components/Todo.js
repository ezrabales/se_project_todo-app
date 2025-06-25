export class Todo {
  constructor(data, selector, uniqueID) {
    this.todoElement = document
      .querySelector(selector)
      .content.querySelector(".todo")
      .cloneNode(true);
    this.todoNameEl = this.todoElement.querySelector(".todo__name");
    this.todoCheckboxEl = this.todoElement.querySelector(".todo__completed");
    this.todoLabel = this.todoElement.querySelector(".todo__label");
    this.todoDate = this.todoElement.querySelector(".todo__date");
    this.todoDeleteBtn = this.todoElement.querySelector(".todo__delete-btn");
    this.dataName = data.name;
    this.dataCompleted = data.completed;
    this.dataId = data.id;
    this.dueDate = new Date(data.date);
    this.id = uniqueID;
  }
  _setEventListeners() {
    this.todoDeleteBtn.addEventListener("click", () => {
      this.todoElement.remove();
    });
  }
  getView() {
    this.todoNameEl.textContent = this.dataName;
    this.todoCheckboxEl.checked = this.dataCompleted;
    this.todoCheckboxEl.id = this.id;
    this.todoLabel.setAttribute("for", this.id);
    if (!isNaN(this.dueDate)) {
      this.todoDate.textContent = `Due: ${this.dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
    this._setEventListeners();
    return this.todoElement;
  }
}
