export default class Card {

  constructor({name, link, likesCount, ownerId}, cardSelector, {handleCardClick}){
    this._cardSelector = cardSelector;
    this._link = link;
    this._name = name;
    this._likesCount = likesCount;
    this._ownerId = ownerId;
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

  _toggleRemoveButton(){
    const deleteButton = this._element.querySelector('.element__remove');
    if(this._ownerId !== '598d15bf796b238715b97382'){
      deleteButton.classList.add('element__remove_disabled');
    } else if (deleteButton.classList.contains('element__remove_disabled')){
      deleteButton.classList.remove('element__remove_disabled');
    }
  }


  generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.element__image');
    const cardTitle = this._element.querySelector('.element__title');
    const cardLikesCount = this._element.querySelector('.element__like-count');
    this._toggleRemoveButton();
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardLikesCount.textContent = this._likesCount;
    cardTitle.textContent = this._name;
    return this._element;
  }
}

