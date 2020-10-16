export default class Card {

  constructor({name, link, likesCount, ownerId, id, myLike}, cardSelector, {handleCardClick}, {removeButtonHandler}, {deleteCard}, {likeCard}){
    this._cardSelector = cardSelector;
    this._link = link;
    this._name = name;
    this._likesCount = likesCount;
    this._ownerId = ownerId;
    this._id = id;
    this._myLike = myLike;
    this._handleCardClick = handleCardClick;
    this._removeButtonHandler = removeButtonHandler;
    this._deleteCard = deleteCard;
    this._likeCard = likeCard;
  }

  _getTemplate(){
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
  }

  toggleClass(evtOut){
    evtOut.target.classList.toggle('element__like_active');
  }

  removeCard(evtOut){
    evtOut.target.parentElement.remove();
  }

  _setEventListeners(){
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
    this._element.querySelector('.element__remove').addEventListener('click', (evt) => {
      this._deleteCard(evt);
    });
    this._element.querySelector('.element__link').addEventListener('click', this._handleCardClick);
  }

  toggleRemoveButton(myId){
    const deleteButton = this._element.querySelector('.element__remove');
    if(this._ownerId !== myId){
      deleteButton.classList.add('element__remove_disabled');
    } else if (deleteButton.classList.contains('element__remove_disabled')){
      deleteButton.classList.remove('element__remove_disabled');
    }
  }

  _toggleLike(){
    const likeButton = this._element.querySelector('.element__like');
        if(this._myLike){
          likeButton.classList.add('element__like_active');
        } else if(likeButton.classList.contains('element__like_active')){
          likeButton.classList.remove('element__like_active');
    }
  }

  likeCounter(evt, res){
    evt.target.parentElement.querySelector('.element__like-count').textContent = res.likes.length;
  }
  

  generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.element__image');
    const cardTitle = this._element.querySelector('.element__title');
    const cardLikesCount = this._element.querySelector('.element__like-count');
    this._toggleLike();
    this._removeButtonHandler();
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardLikesCount.textContent = this._likesCount;
    cardTitle.textContent = this._name;
    return this._element;
  }
}

