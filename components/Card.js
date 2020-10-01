export default class Card {
  static _modalWindowImage = document.querySelector('#popup-card');
  static _popupPic = Card._modalWindowImage.querySelector('.popup__pic');
  static _popupSubtitle = Card._modalWindowImage.querySelector('.popup__subtitle');

  constructor(name, link, cardSelector, {handleCardClick}){
    this._cardSelector = cardSelector;
    this._link = link;
    this._name = name;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick();
      document.addEventListener('keydown', this._closeModalOnKey);
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
}
