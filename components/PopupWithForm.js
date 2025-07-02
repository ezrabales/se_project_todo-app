import { validationConfig } from "../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, callBack) {
    super(popupElement);
    this._callBack = callBack;
  }
  _getInputValues() {
    const inputList = this._popupElement.querySelectorAll(
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
    this._popupElement
      .querySelector(validationConfig.formSelector)
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._callBack(this._getInputValues());
        this.close();
      });
  }
}
