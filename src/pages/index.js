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
  nameInput,
  jobInput,
  cardsButton,
  elements,
  cardSubmitButton
} from '../utils/constants.js';

const popup = new PopupWithImage(modalWindowImage);
popup.setEventListeners();

// Создание карточки 
const createCard = (item) =>{
  const card = new Card(item.title, item.url, '#element', {handleCardClick: () => {
    popup.open({src: item.url, alt: item.title});
  }
  });
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

//Добавление 6 начальных карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item);
    },
  },
  elements
);

//Добавление карточки через форму
const cardsEdit = new PopupWithForm(modalWindowCard, {
  formSubmitHandler: (item) => {
    createCard(item);
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
});

cardsButton.addEventListener('click', function (){
  cardSubmitButton.classList.add('popup__button-save_inactive');
  cardSubmitButton.setAttribute('disabled', 'disabled');
  cardsEdit.open();
});  





