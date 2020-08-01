let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let exitButton = document.querySelector('.popup__button-reset');
let formElement = document.querySelector('.popup__form');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let nameInput = formElement.querySelector('.popup__input:first-of-type');
let jobInput = formElement.querySelector('.popup__input:last-of-type');


editButton.addEventListener('click', openEdit);
exitButton.addEventListener('click', exitEdit);


function openEdit(){
	popup.classList.add('popup_opened');
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileSubtitle.textContent;
}


function exitEdit(){
	popup.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
    // Воспользуйтесь инструментом .querySelector()
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
    profileTitle.textContent = nameValue;
    profileSubtitle.textContent = jobValue;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);