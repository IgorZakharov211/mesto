const popup = document.querySelector('.popup:first-of-type'); //Окно с popup редактирования профиля
const editButton = document.querySelector('.profile__edit-button'); //Кнопка открытия окна редактирования
const closeEditButton = popup.querySelector('.popup__button-close'); //Кнопка выхода из окна редактирования
const formElement = popup.querySelector('.popup__form');  //Форма
const profileTitle = document.querySelector('.profile__title'); //Имя на странице в секции профиль
const profileSubtitle = document.querySelector('.profile__subtitle'); //Должность на странице в секции профиль
const nameInput = formElement.querySelector('.popup__input:first-of-type'); //Поле ввода имени
const jobInput = formElement.querySelector('.popup__input:last-of-type'); //Поле ввода должности
const popupPlaces = document.querySelector('.popup:last-of-type'); //Окно с popup редактирования места
const addButton = document.querySelector('.profile__add-button'); //Кнопка открытия окна добавления карточек
const closeAddButton = popupPlaces.querySelector('.popup__button-close'); //Кнопка выхода из окна добавления карточек
const addElement = popupPlaces.querySelector('.popup__form'); //Форма добавления карточек
const titleInput = addElement.querySelector('.popup__input:first-of-type'); //Поле ввода названия
const urlInput = addElement.querySelector('.popup__input:last-of-type'); //Поле ввода ссылки на картинку
const elements = document.querySelector('.elements');
const placeTemplate = document.querySelector('#element').content;
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function loadCards(){
  initialCards.forEach(function (item){
    const cardsElement = placeTemplate.cloneNode(true);
    cardsElement.querySelector('.element__image').src = item.link;
    cardsElement.querySelector('.element__title').textContent = item.name;
    elements.prepend(cardsElement);
  });
}






//Функции для открытия/закрытия модального окна, через класс popup_opened
function controlEdit(){
  popup.classList.toggle('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function controlAdd(){
  popupPlaces.classList.toggle('popup_opened');
}


function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileTitle.textContent = nameValue;  //Сверяю значения на странице с полем ввода для имени
  profileSubtitle.textContent = jobValue; //Сверяю значения на странице с полем ввода для должности
  controlEdit();  //Закрываю окно
}

function formAddHandler (evt) {
  evt.preventDefault();
  const placeElement = placeTemplate.cloneNode(true);
  const titleValue = titleInput.value;
  const urlValue = urlInput.value;
  placeElement.querySelector('.element__image').src = urlValue;
  placeElement.querySelector('.element__title').textContent = titleValue;
  elements.prepend(placeElement);
  controlAdd();  //Закрываю окно
}



formElement.addEventListener('submit', formSubmitHandler);
addElement.addEventListener('submit', formAddHandler);
editButton.addEventListener('click', controlEdit);  //Вход в окно редактирования 
closeEditButton.addEventListener('click', controlEdit);  //Выход из окна редактирования
addButton.addEventListener('click', controlAdd);  //Вход в окно добавления
closeAddButton.addEventListener('click', controlAdd); //Выход из окна добавления карточек
loadCards();