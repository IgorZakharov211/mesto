export default class Card {

  constructor({name, link}, cardSelector, {handleCardClick}){
    this._cardSelector = cardSelector;
    this._link = link;
    this._name = name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate(){
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
  }

  _toggleClass = (evt) =>{
    evt.target.classList.toggle('element__like_active');
  }

  _targetRemove = (evt) => {
    evt.target.parentElement.remove();
  }

  _setEventListeners(){
    this._element.querySelector('.element__like').addEventListener('click', this._toggleClass);
    this._element.querySelector('.element__remove').addEventListener('click', this._targetRemove);
    this._element.querySelector('.element__link').addEventListener('click', this._handleCardClick);
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

