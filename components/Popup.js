import { validationConfig } from "../utils/constants.js";

export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
  }
  open() {
    this._popupElement.classList.add(validationConfig.popupVisible);
    document.addEventListener("keydown", this._handleEscapeClose);
  }
  close() {
    this._popupElement.classList.remove(validationConfig.popupVisible);
    document.removeEventListener("keydown", this._handleEscapeClose);
  }
  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    this._popupElement
      .querySelector(validationConfig.closeButton)
      .addEventListener("click", () => {
        this.close();
      });
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains(validationConfig.popupVisible)) {
        this.close();
      }
    });
  }
}
