export const initialCards = [
    {
      title: 'Архыз',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      title: 'Челябинская область',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      title: 'Иваново',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      title: 'Камчатка',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      title: 'Холмогорский район',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      title: 'Байкал',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const modalWindowProfile = document.querySelector('#popup-profile'); //Окно с popup редактирования профиля
export const modalWindowCard = document.querySelector('#popup-place'); //Окно с popup редактирования места
export const modalWindowImage = document.querySelector('#popup-card'); //Окно с popup изображением
export const profileButton = document.querySelector('.profile__edit-button'); //Кнопка открытия окна редактирования
export const profileName = document.querySelector('.profile__title'); //Имя на странице в секции профиль
export const profileJob = document.querySelector('.profile__subtitle'); //Должность на странице в секции профиль
export const formProfile = document.forms.profile; //форма редактирования профиля
export const nameInput = formProfile.elements.name; //Поле ввода имени
export const jobInput = formProfile.elements.job; //Поле ввода должности
export const cardsButton = document.querySelector('.profile__add-button'); //Кнопка открытия окна добавления карточек
export const elements = '.elements';  //Котнейнер с карточками
const formCard = document.forms.place; //форма добавления карточки
export const cardSubmitButton = formCard.querySelector('.popup__button-save');