export default class Popup{
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popupCloseButton = this._popupSelector.querySelector('.popup__button-close');
  }

  open(){
    this._popupSelector.classList.add('popup_opened');
  };

  close(){
    this._popupSelector.classList.remove('popup_opened');
  };

  _handleEscClose(evt){
    if(evt.key === "Escape"){
      close(document.querySelector('.popup_opened'));
    }
  };

  setEventListeners(){
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  };
}