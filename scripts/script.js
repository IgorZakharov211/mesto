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
const titleInput = cardsForm.elements.title; //Поле ввода названия
const urlInput = cardsForm.elements.url; //Поле ввода ссылки на картинку
const elements = document.querySelector('.elements');  //Котнейнер с карточками
const placeTemplate = document.querySelector('#element').content;
const popupPic = modalWindowImage.querySelector('.popup__pic');
const popupSubtitle = modalWindowImage.querySelector('.popup__subtitle');
const closeImageButton = modalWindowImage.querySelector('.popup__button-close');
const addCardButton = cardsForm.querySelector('.popup__button-save');
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


function closeModalOnKey(modalWindow){
  document.addEventListener('keydown', function(evt){
    if(evt.key === "Escape"){
        closeModalWindow(modalWindow);
      }
  });
}

function closeModalOnOverlay(modalWindow){
  modalWindow.addEventListener('click', function(evt){
    closeModalWindow(evt.target);
  });
}



// Открытие модального окна //
function openModalWindow(modalWindow){
  modalWindow.classList.add('popup_opened');
}


// Закрытие модального окна //
function closeModalWindow(modalWindow){
  modalWindow.classList.remove('popup_opened');
}

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
}

//Передаем значение карточки для открытия модального окна с изображением
function flashValue(link, subtitle){
  popupPic.src = link;
  popupPic.alt = subtitle;
  popupSubtitle.textContent = subtitle;   
}

//Загружаем начальные карточки с фотографиями
function loadCards(){
  initialCards.forEach(function (item){
    const linkItem = item.link;
    const nameItem = item.name;
    addCard(linkItem, nameItem);
  });
}

//Создаем каротчку 
function renderCard(link, name){
  const cardsElement = placeTemplate.cloneNode(true);
  const cardsImage = cardsElement.querySelector('.element__image');
  const cardsTitle = cardsElement.querySelector('.element__title');
  const likeButton = cardsElement.querySelector('.element__like');
  const removeButton = cardsElement.querySelector('.element__remove');
  const linkImage = cardsElement.querySelector('.element__link');
  cardsImage.src = link;
  cardsImage.alt = name;
  cardsTitle.textContent = name;
  likeButton.addEventListener('click', function (evt){
    evt.target.classList.toggle('element__like_active');
  });
  removeButton.addEventListener('click', function (evt){
    evt.target.parentElement.remove();
  });
  linkImage.addEventListener('click', function (evt){
    flashValue(link, name);
    openModalWindow(modalWindowImage);
    closeModalOnKey(modalWindowImage);
    closeModalOnOverlay(modalWindowImage);
  });
  return cardsElement;
}

// Добавляем карточку
function addCard(link, name){
  elements.prepend(renderCard(link, name));
}




loadCards();
assignValue();
profileForm.addEventListener('submit', formSubmitHandler);
cardsForm.addEventListener('submit', formAddHandler);
profileButton.addEventListener('click', function (){
  assignValue();
  openModalWindow(modalWindowProfile);
  closeModalOnKey(modalWindowProfile);
  closeModalOnOverlay(modalWindowProfile);
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error'
  });
});  
profileCloseButton.addEventListener('click', function () {
  closeModalWindow(modalWindowProfile);
}); 
cardsButton.addEventListener('click', function (){
  openModalWindow(modalWindowCard);
  closeModalOnKey(modalWindowCard);
  closeModalOnOverlay(modalWindowCard);
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error'
  });
});  
cardsCloseButton.addEventListener('click', function () {
  closeModalWindow(modalWindowCard);
  cardsForm.reset();
}); 
closeImageButton.addEventListener('click', function () {
  closeModalWindow(modalWindowImage);
});





