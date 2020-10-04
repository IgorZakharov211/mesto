export default class Popup{
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popupCloseButton = this._popupSelector.querySelector('.popup__button-close');
  }

  _handleEscClose = (evt) =>{
    if(evt.key === "Escape"){
      this.close();
    }
  };

  open(){
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close(){
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  setEventListeners(){
    this._closeModalOnOverlay();
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  };

  _closeModalOnOverlay(){
    this._popupSelector.addEventListener('click', (evt) => {
      if(this._popupSelector.classList.contains('popup_opened')){
        evt.target.classList.remove('popup_opened');
      } 
    });
  }
}

