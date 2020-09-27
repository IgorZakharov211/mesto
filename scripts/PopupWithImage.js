import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
  static _popupPic = popupSelector.querySelector('.popup__pic');
  static _popupSubtitle = popupSelector.querySelector('.popup__subtitle');

  constructor(popupSelector, {src, alt}){
    super(popupSelector);
    this._src = src;
    this._alt = alt;
  }

  open(){
    this._popupSelector.classList.add('popup_opened');
    _popupPic.src = this._src;
    _popupPic.alt = this._alt;
    _popupSubtitle.textContent = this._alt;
  };
}