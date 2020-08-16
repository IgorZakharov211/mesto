const modalWindowProfile = document.querySelector('.popup:nth-of-type(1n)'); //Окно с popup редактирования профиля
const modalWindowCard = document.querySelector('.popup:nth-of-type(2n)'); //Окно с popup редактирования места
const modalWindowImage = document.querySelector('.popup:nth-of-type(3n)'); //Окно с popup изображением
const profileButton = document.querySelector('.profile__edit-button'); //Кнопка открытия окна редактирования
const profileName = document.querySelector('.profile__title'); //Имя на странице в секции профиль
const profileJob = document.querySelector('.profile__subtitle'); //Должность на странице в секции профиль
const profileForm = modalWindowProfile.querySelector('.popup__form');  //Форма профиля
const nameInput = profileForm.querySelector('.popup__input:first-of-type'); //Поле ввода имени
const jobInput = profileForm.querySelector('.popup__input:last-of-type'); //Поле ввода должности
const profileCloseButton = modalWindowProfile.querySelector('.popup__button-close'); //Кнопка выхода из окна редактирования
const cardsButton = document.querySelector('.profile__add-button'); //Кнопка открытия окна добавления карточек
const cardsCloseButton = modalWindowCard.querySelector('.popup__button-close'); //Кнопка выхода из окна добавления карточек
const cardsForm = modalWindowCard.querySelector('.popup__form'); //Форма добавления карточек
const titleInput = cardsForm.querySelector('.popup__input:first-of-type'); //Поле ввода названия
const urlInput = cardsForm.querySelector('.popup__input:last-of-type'); //Поле ввода ссылки на картинку
const elements = document.querySelector('.elements');  //Котнейнер с карточками
const placeTemplate = document.querySelector('#element').content;
const popupPic = modalWindowImage.querySelector('.popup__pic');
const popupSubtitle = modalWindowImage.querySelector('.popup__subtitle');
const closeImageButton = modalWindowImage.querySelector('.popup__button-close');
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
  openModalWindow(modalWindowProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

//Обработка запроса на редактирования профиля
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
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
  renderCard(linkInput, nameInput);
  closeModalWindow(modalWindowCard);
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
    renderCard(linkItem, nameItem);
  });
}

//Создаем каротчку
function renderCard(link, name){
  const cardsElement = placeTemplate.cloneNode(true);
  const cardsImage = cardsElement.querySelector('.element__image');
  const cardsTitle = cardsElement.querySelector('.element__title');
  cardsImage.src = link;
  cardsImage.alt = name;
  cardsTitle.textContent = name;
  elements.prepend(cardsElement);
  addListener(link, name);
}


//Добавляем слушателей для каротчки
function addListener(link, name){
  const likeButton = document.querySelector('.element__like');
  const removeButton = document.querySelector('.element__remove');
  const linkImage = document.querySelector('.element__link');
  likeButton.addEventListener('click', function (evt){
    evt.target.classList.toggle('element__like_active');
  });
  removeButton.addEventListener('click', function (evt){
    evt.target.parentElement.remove();
  });
  linkImage.addEventListener('click', function (evt){
    const imageTarget = evt.target;
    flashValue(link, name);
    openModalWindow(modalWindowImage);
  })
}




loadCards();
profileForm.addEventListener('submit', formSubmitHandler);
cardsForm.addEventListener('submit', formAddHandler);
profileButton.addEventListener('click', assignValue);  
profileCloseButton.addEventListener('click', function () {closeModalWindow(modalWindowProfile)}); 
cardsButton.addEventListener('click', function (){openModalWindow(modalWindowCard)});  
cardsCloseButton.addEventListener('click', function () {closeModalWindow(modalWindowCard)}); 
closeImageButton.addEventListener('click', function () {closeModalWindow(modalWindowImage)});



