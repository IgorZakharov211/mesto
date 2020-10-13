import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, apiOptions} from '../utils/constants.js';

const modalWindowProfile = document.querySelector('#popup-profile'); //Окно с popup редактирования профиля
const modalWindowCard = document.querySelector('#popup-place'); //Окно с popup редактирования места
const modalWindowImage = document.querySelector('#popup-card'); //Окно с popup изображением
const modalWindowAvatar = document.querySelector('#popup-avatar'); //Окно с редактированием аватара
const profileButton = document.querySelector('.profile__edit-button'); //Кнопка открытия окна редактирования
const profileName = document.querySelector('.profile__title'); //Имя на странице в секции профиль
const profileJob = document.querySelector('.profile__subtitle'); //Должность на странице в секции профиль
const profileAvatar = document.querySelector('.profile__image');  //Аватар
const formProfile = document.forms.profile; //форма редактирования профиля
const nameInput = formProfile.elements.name; //Поле ввода имени
const jobInput = formProfile.elements.job; //Поле ввода должности
const cardsButton = document.querySelector('.profile__add-button'); //Кнопка открытия окна добавления карточек
const elements = '.elements';  //Котнейнер с карточками
const formCard = document.forms.place; //форма добавления карточки
const cardSubmitButton = formCard.querySelector('.popup__button-save');  //Кнопка создания карточки
const avatarButton = document.querySelector('.profile__avatar-edit'); //Кнопка редактирования аватара
const formAvatar = document.forms.avatar; //Форма обновления аватара
const avatarSubmitButton = formAvatar.querySelector('.popup__button-save'); //Кнопка редактирования аватара
const formData = 
{
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error'
};



const api = new Api({apiOptions});

const myInfo = api.getMyInfo();
myInfo.then((data)=>{
  profileName.textContent = data.name;
  profileJob.textContent = data.about;
  profileAvatar.src = data.avatar;
})
.catch((err) =>{
  console.log(err);
});

const cardsLoader = api.getInitialCards();
cardsLoader.then((data)=>{
  const initCard = data.map(function (item){
    return {name: item.name,
            link: item.link};
  });
  const createCard = (item) =>{
    const card = new Card({link: item.link, name: item.name}, '#element', {handleCardClick: () => {
      popupCard.open({src: item.link, alt: item.name});
    }
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
  const cardsList = new Section({
    items: initCard,
    renderer: (item) => {
      createCard({name: item.name, link: item.link});
      },
    },
    elements
  );
  cardsList.renderItems();
});




const popupCard = new PopupWithImage(modalWindowImage);
popupCard.setEventListeners();

//Добавление карточки через форму
const cardsEdit = new PopupWithForm(modalWindowCard, {
  formSubmitHandler: (item) => {
    createCard({name: item.title, link: item.url});
  }
});
cardsEdit.setEventListeners();

const avatarEdit = new PopupWithForm(modalWindowAvatar, {
  formSubmitHandler: (item) => {
    api.patchMyAvatar(item.url);
    profileAvatar.src = item.url;
  }
});
avatarEdit.setEventListeners();

const profileEdit = new PopupWithForm(modalWindowProfile, {
  formSubmitHandler: (item) => {
    user.setUserInfo({nameInput: item.name, jobInput: item.job});
    api.patchMyInfo(item.name, item.job)
  }
});
const user = new UserInfo({profileName: profileName, profileJob: profileJob});
profileEdit.setEventListeners();

//Включение валидации для формы с добавлением карточек, необходимо для метода disableButton
const placeValidation = new FormValidator(formData, formCard);
placeValidation.enableValidation();

const profileValidation = new FormValidator(formData, formProfile);
profileValidation.enableValidation();

const avatarValidation = new FormValidator(formData, formAvatar);
avatarValidation.enableValidation();



profileButton.addEventListener('click', function(){
  profileEdit.open();
  const values = user.getUserInfo();
  nameInput.value = values.name;
  jobInput.value = values.job;
});

cardsButton.addEventListener('click', function (){
  placeValidation.disableButton(cardSubmitButton);
  cardsEdit.open();
});

avatarButton.addEventListener('click', function(){
  avatarEdit.open();
  avatarValidation.disableButton(avatarSubmitButton);
})






