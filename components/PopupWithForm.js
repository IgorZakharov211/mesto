import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
  constructor(popupSelector, {formSubmitHandler}){
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._element = popupSelector.querySelector('.popup__form');
  }

  _getInputValues(){
    this._inputList = this._element.querySelectorAll('.popup__input');
    
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
    
  }

  close(){
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._element.reset();
  }

  setEventListeners(){
    this._closeModalOnOverlay();
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
      this.close();
    })
  };
}