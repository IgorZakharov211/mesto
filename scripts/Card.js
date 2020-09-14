export default class Card {
  static _modalWindowImage = document.querySelector('.popup:nth-of-type(3n)');
  static _popupPic = Card._modalWindowImage.querySelector('.popup__pic');
  static _popupSubtitle = Card._modalWindowImage.querySelector('.popup__subtitle');

  constructor(link, name, cardSelector){
    this._cardSelector = cardSelector;
    this._link = link;
    this._name = name;
  }

  _getTemplate(){
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
  }

  _setEventListeners(){
    this._element.querySelector('.element__like')
    .addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
    });
    this._element.querySelector('.element__remove')
    .addEventListener('click', (evt) => {
        evt.target.parentElement.remove();
    });
    this._element.querySelector('.element__link')
    .addEventListener('click', (evt) => {
      Card._popupPic.src = evt.target.src;
      Card._popupPic.alt = evt.target.alt;
      Card._popupSubtitle.textContent = evt.target.alt;
      this._openModalWindow(Card._modalWindowImage);
      this._closeModalOnKey(Card._modalWindowImage);
      this._closeModalOnOverlay(Card._modalWindowImage);
    });
  }
  
  generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.element__image');
    const cardTitle = this._element.querySelector('.element__title');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    return this._element;
  }

  _closeModalOnKey = (modalWindow) => {
    modalWindow.addEventListener('click', (evt) => {
      if(modalWindow.classList.contains('popup_opened')){
        this._closeModalWindow(evt.target);
      } 
    });
  }

  _openModalWindow = (modalWindow) => {
    modalWindow.classList.add('popup_opened');
  }
  
  
  _closeModalWindow = (modalWindow) => {
    modalWindow.classList.remove('popup_opened');
  }

  _closeModalOnOverlay = (modalWindow) => {
    modalWindow.addEventListener('click', (evt) => {
      if(modalWindow.classList.contains('popup_opened')){
        this._closeModalWindow(evt.target);
      } 
    });
  }
}

