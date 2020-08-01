let popup = document.querySelector('.popup'); //Окно с popup
let editButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования
let exitButton = document.querySelector('.popup__button-reset'); //Кнопка выхода
let formElement = document.querySelector('.popup__form');  //Форма
let profileTitle = document.querySelector('.profile__title'); //Имя на странице в секции профиль
let profileSubtitle = document.querySelector('.profile__subtitle'); //Должность на странице в секции профиль
let nameInput = formElement.querySelector('.popup__input:first-of-type'); //Поле ввода имени
let jobInput = formElement.querySelector('.popup__input:last-of-type'); //Поле ввода должности

//Функция для открытия/закрытия модального окна, через класс popup_opened
function controlEdit(){
  if(popup.classList.contains('popup_opened') == true){
    popup.classList.remove('popup_opened');
  } else{
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  profileTitle.textContent = nameValue;  //Сверяю значения на странице с полем ввода для имени
  profileSubtitle.textContent = jobValue; //Сверяю значения на странице с полем ввода для должности
  controlEdit();  //Закрываю окно
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', controlEdit);  //Вход в окно редактирования 
exitButton.addEventListener('click', controlEdit);  //Выход из окна редактирования