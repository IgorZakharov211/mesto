import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._popupPic = popupSelector.querySelector('.popup__pic');
    this._popupSubtitle = popupSelector.querySelector('.popup__subtitle');
  }
  

  open({src, alt}){
    super.open();
    this._src = src;
    this._alt = alt;
    this._popupPic.src = this._src;
    this._popupPic.alt = this._alt;
    this._popupSubtitle.textContent = this._alt;
  };
}