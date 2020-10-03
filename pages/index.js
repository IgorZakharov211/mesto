import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import {initialCards} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';

const popups = document.querySelectorAll('.popup');
const modalWindowProfile = document.querySelector('.popup:nth-of-type(1n)'); //Окно с popup редактирования профиля
const modalWindowCard = document.querySelector('.popup:nth-of-type(2n)'); //Окно с popup редактирования места
const modalWindowImage = document.querySelector('.popup:nth-of-type(3n)'); //Окно с popup изображением
const profileButton = document.querySelector('.profile__edit-button'); //Кнопка открытия окна редактирования
const profileName = document.querySelector('.profile__title'); //Имя на странице в секции профиль
const profileJob = document.querySelector('.profile__subtitle'); //Должность на странице в секции профиль
const profileForm = modalWindowProfile.querySelector('.popup__form');  //Форма профиля
const nameInput = profileForm.elements.name; //Поле ввода имени
const jobInput = profileForm.elements.job; //Поле ввода должности
const profileCloseButton = modalWindowProfile.querySelector('.popup__button-close'); //Кнопка выхода из окна редактирования
const cardsButton = document.querySelector('.profile__add-button'); //Кнопка открытия окна добавления карточек
const cardsCloseButton = modalWindowCard.querySelector('.popup__button-close'); //Кнопка выхода из окна добавления карточек
const cardsForm = modalWindowCard.querySelector('.popup__form'); //Форма добавления карточек
const submitCardButton = cardsForm.querySelector('.popup__button-save');
const titleInput = cardsForm.elements.title; //Поле ввода названия
const urlInput = cardsForm.elements.url; //Поле ввода ссылки на картинку
const elements = '.elements';  //Котнейнер с карточками
const closeImageButton = modalWindowImage.querySelector('.popup__button-close');

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '#element', {handleCardClick: () => {
      const popup = new PopupWithImage(modalWindowImage, {src: item.link, alt: item.name});
      popup.open();
      popup.setEventListeners();
    }
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    },
  },
  elements
);

const cardsEdit = new PopupWithForm(modalWindowCard, {
  formSubmitHandler: (item) => {
    const card = new Card(item.title, item.url, '#element', {handleCardClick: () => {
      const popup = new PopupWithImage(modalWindowImage, {src: item.url, alt: item.title});
      popup.open();
      popup.setEventListeners();
    }
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
});
cardsEdit.setEventListeners();
cardsList.renderItems();


const profileEdit = new PopupWithForm(modalWindowProfile, {
  formSubmitHandler: (item) => {
    user.setUserInfo({nameInput: item.name, jobInput: item.job});
  }
});
const user = new UserInfo({profileName: profileName, profileJob: profileJob});
profileEdit.setEventListeners();




function addValidation(formConfig){
  const formList = Array.from(document.querySelectorAll(formConfig.formSelector));  
  formList.forEach((formElement) => {
      const validation = new FormValidator(formConfig, formElement);
      validation.enableValidation();
  });
}

addValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error'
});




profileButton.addEventListener('click', function(){
  profileEdit.open();
  const values = user.getUserInfo();
  nameInput.value = values.name;
  jobInput.value = values.job;
})

cardsButton.addEventListener('click', function (){
  cardsEdit.open();
});  





