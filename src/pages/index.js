import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards, 
  modalWindowProfile, 
  modalWindowCard,
  modalWindowImage,
  profileButton,
  profileName,
  profileJob,
  formProfile,
  nameInput,
  jobInput,
  cardsButton,
  elements,
  formCard
} from '../utils/constants.js';

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

profileButton.addEventListener('click', function(){
  profileEdit.open();
  const values = user.getUserInfo();
  nameInput.value = values.name;
  jobInput.value = values.job;
  const profileValidation = new FormValidator(
    {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button-save',
      inactiveButtonClass: 'popup__button-save_inactive',
      inputErrorClass: 'popup__input_type_error'
    }, formProfile);
    profileValidation.enableValidation();
});

cardsButton.addEventListener('click', function (){
  cardsEdit.open();
  const cardValidation = new FormValidator(
    {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button-save',
      inactiveButtonClass: 'popup__button-save_inactive',
      inputErrorClass: 'popup__input_type_error'
    }, formCard);
    cardValidation.enableValidation();
});  





