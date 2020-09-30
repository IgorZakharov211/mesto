import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import {initialCards} from '../utils/constants.js';

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
const elements = document.querySelector('.elements');  //Котнейнер с карточками
const closeImageButton = modalWindowImage.querySelector('.popup__button-close');


/*
function closeModalOnKey(evt){
  if(evt.key === "Escape"){
    closeModalWindow(document.querySelector('.popup_opened'));
  }
};


function closeModalOnOverlay(){
  popups.forEach(function (item){
    item.addEventListener('click', function(evt){
      if(evt.currentTarget.classList.contains('popup_opened')){
        closeModalWindow(evt.target);
      } 
    });
  });
}


// Открытие модального окна //
function openModalWindow(modalWindow){
  modalWindow.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalOnKey);
}


// Закрытие модального окна //
function closeModalWindow(modalWindow){
  modalWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalOnKey);
}
*/
//Присваиваем значения для инпутов
function assignValue(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

//Обработка запроса на редактирования профиля
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;  //Сверяю значения на странице с полем ввода для имени
  profileJob.textContent = jobValue; //Сверяю значения на странице с полем ввода для должности
  closeModalWindow(modalWindowProfile);
}

//Обработка запроса на добавление карточки
function formAddHandler(evt){
  evt.preventDefault();
  const linkInput = urlInput.value;
  const nameInput = titleInput.value;
  addCard(linkInput, nameInput);
  closeModalWindow(modalWindowCard);
  cardsForm.reset();
  submitCardButton.classList.add('popup__button-save_inactive');
  submitCardButton.setAttribute('disabled', 'disabled'); 
}

//Загружаем начальные карточки с фотографиями
function loadCards(){
  initialCards.forEach(function (item){
    const linkItem = item.link;
    const nameItem = item.name;
    addCard(linkItem, nameItem);
  });
}

// Добавляем карточку
function addCard(link, name){
  const card = new Card(link, name, '#element');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
}



function addValidation(formConfig){
  const formList = Array.from(document.querySelectorAll(formConfig.formSelector));  
  formList.forEach((formElement) => {
      const validation = new FormValidator(formConfig, formElement);
      validation.enableValidation();
  });
}

loadCards();
assignValue();
closeModalOnOverlay();
addValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error'
});
profileForm.addEventListener('submit', formSubmitHandler);
cardsForm.addEventListener('submit', formAddHandler);
profileButton.addEventListener('click', () => {
  openModalWindow(modalWindowProfile);
});  
profileCloseButton.addEventListener('click', function () {
  closeModalWindow(modalWindowProfile);
}); 
cardsButton.addEventListener('click', function (){
  openModalWindow(modalWindowCard);
});  
cardsCloseButton.addEventListener('click', function () {
  closeModalWindow(modalWindowCard);
  cardsForm.reset();
}); 
closeImageButton.addEventListener('click', function () {
  closeModalWindow(modalWindowImage);
});





