export default class Card {

  constructor({name, link, likesCount, ownerId, id}, cardSelector, {handleCardClick}, {toggleRemoveButton}, {deleteCard}){
    this._cardSelector = cardSelector;
    this._link = link;
    this._name = name;
    this._likesCount = likesCount;
    this._ownerId = ownerId;
    this._id = id;
    this._handleCardClick = handleCardClick;
    this._toggleRemoveButton = toggleRemoveButton;
    this._deleteCard = deleteCard;
  }

  _getTemplate(){
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
  }

  _toggleClass = (evt) =>{
    evt.target.classList.toggle('element__like_active');
  }

  removeCard(evtOut){
    evtOut.target.parentElement.remove();
  }

  _setEventListeners(){
    this._element.querySelector('.element__like').addEventListener('click', this._toggleClass);
    this._element.querySelector('.element__remove').addEventListener('click', (evt) => {
      this._deleteCard(evt);
    });
    this._element.querySelector('.element__link').addEventListener('click', this._handleCardClick);
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.element__image');
    const cardTitle = this._element.querySelector('.element__title');
    const cardLikesCount = this._element.querySelector('.element__like-count');
    this._toggleRemoveButton(this._element);
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardLikesCount.textContent = this._likesCount;
    cardTitle.textContent = this._name;
    return this._element;
  }
}

