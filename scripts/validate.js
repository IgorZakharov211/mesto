//Включение валидации для формы
const enableValidation = (formObject) => {
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));  
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault(); //Сброс настроек валидации по умолчанию
  });
  setEventListeners(formElement, formObject);
 });
};

//Задаем слушатель, срабатывающий при изменения поля инпут
const setEventListeners = (formElement, formObject) => {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonElement = formElement.querySelector(formObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formObject);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formObject);
      toggleButtonState(inputList, buttonElement, formObject);
    });
  });
};

//Управление состоянием кнопки "Сохранить"
const toggleButtonState = (inputList, buttonElement, formObject) => {
  if(hasInvalidInput(inputList, formObject)){
    buttonElement.classList.add(formObject.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else{
    buttonElement.classList.remove(formObject.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

//Проверка формы на валидность
const hasInvalidInput = (inputList, formObject) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


//Проверка поля ввода, если оно не прошло - вывести ошибку, иначе спрятать
const checkInputValidity = (formElement, inputElement, formObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formObject);
  } else {
    hideInputError(formElement, inputElement, formObject);
  }
};


//Показать сообщение об ошибки 
const showInputError = (formElement, inputElement, errorMessage, formObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formObject.inactiveButtonClass);
};

//Скрыть сообщение об ошибки
const hideInputError = (formElement, inputElement, formObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObject.inputErrorClass);
  errorElement.classList.remove(formObject.inactiveButtonClass);
  errorElement.textContent = '';
};



//Передаем настройки для валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error'
});


