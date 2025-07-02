import { validationConfig } from "../utils/constants.js";
import { todoCounter } from "../pages/index.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callBack) {
    super(popupSelector);
    this._callBack = callBack;
  }
  _getInputValues() {
    const inputList = this._popupSelector.querySelectorAll(
      validationConfig.inputSelector
    );
    const inputValues = {};
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupSelector
      .querySelector(validationConfig.formSelector)
      .addEventListener("submit", (evt) => {
        todoCounter.updateTotal(true);
        this._callBack(evt);
      });
  }
}
