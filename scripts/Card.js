import {closeModalOnKey, closeModalOnOverlay, openModalWindow, modalWindowImage, popupPic, popupSubtitle} from '../scripts/script.js';
export default class Card {
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
    .addEventListener('click', function (evt){
        evt.target.classList.toggle('element__like_active');
    });
    this._element.querySelector('.element__remove')
    .addEventListener('click', function (evt){
        evt.target.parentElement.remove();
    });
    this._element.querySelector('.element__link')
    .addEventListener('click', function (evt){
      popupPic.src = evt.target.src;
      popupPic.alt = evt.target.alt;
      popupSubtitle.textContent = evt.target.alt;
      openModalWindow(modalWindowImage);
      closeModalOnKey(modalWindowImage);
      closeModalOnOverlay(modalWindowImage);
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

