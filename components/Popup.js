import { validationConfig } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  open() {
    this._popupSelector.classList.add(validationConfig.popupVisible);
  }
  close() {
    this._popupSelector.classList.remove(validationConfig.popupVisible);
  }
  _handleEscapeClose() {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }
  setEventListeners() {
    this._handleEscapeClose();
    this._popupSelector
      .querySelector(validationConfig.closeButton)
      .addEventListener("click", () => {
        this.close();
      });
    this._popupSelector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains(validationConfig.popupVisible)) {
        this.close();
      }
    });
  }
}
