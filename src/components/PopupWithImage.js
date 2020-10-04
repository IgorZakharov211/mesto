import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
  constructor(popupSelector, {src, alt}){
    super(popupSelector);
    this._src = src;
    this._alt = alt;
    this._popupPic = popupSelector.querySelector('.popup__pic');
    this._popupSubtitle = popupSelector.querySelector('.popup__subtitle');
  }
  

  open(){
    this._popupSelector.classList.add('popup_opened');
    this._popupPic.src = this._src;
    this._popupPic.alt = this._alt;
    this._popupSubtitle.textContent = this._alt;
    document.addEventListener('keydown', this._handleEscClose);
  };
}