import Popup from './Popup.js';
export default class PopupWithConfirm extends Popup{
  constructor(popupSelector, {formConfirmHandler}){
    super(popupSelector);
    this._formConfirmHandler = formConfirmHandler;
    this._element = popupSelector.querySelector('.popup__form');
  }

  setEventListeners(){
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formConfirmHandler();
    })
  }

}