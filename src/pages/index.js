import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {apiOptions} from '../utils/constants.js';

const modalWindowProfile = document.querySelector('#popup-profile'); //Окно с popup редактирования профиля
const modalWindowCard = document.querySelector('#popup-place'); //Окно с popup редактирования места
const modalWindowImage = document.querySelector('#popup-card'); //Окно с popup изображением
const modalWindowAvatar = document.querySelector('#popup-avatar'); //Окно с редактированием аватара
const modalWindowConfirm = document.querySelector('#popup-confirm'); //Окно подтверждения удаления карточки
const profileButton = document.querySelector('.profile__edit-button'); //Кнопка открытия окна редактирования
const profileName = document.querySelector('.profile__title'); //Имя на странице в секции профиль
const profileJob = document.querySelector('.profile__subtitle'); //Должность на странице в секции профиль
const profileAvatar = document.querySelector('.profile__image');  //Аватар
const formProfile = document.forms.profile; //форма редактирования профиля
const profileEditSave = formProfile.querySelector('.popup__button-save');
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
const user = new UserInfo({profileName: profileName, profileJob: profileJob, profileAvatar: profileAvatar});

function renderLoading(bool, buttonSelector){
  if(bool){
    buttonSelector.textContent += '...';
  } else{
    buttonSelector.textContent = buttonSelector.textContent.slice(0, -3);
  }
}

const myInfo = api.getMyInfo();
myInfo.then((data)=>{
  user.setUserInfo({nameInput: data.name, jobInput: data.about});
  user.setUserAvatar({avatarInput: data.avatar});
  const myId = data._id;
  let myLike = false;
  const cardsLoader = api.getInitialCards();
  cardsLoader.then((data)=>{
    const initCard = data.map(function (item){
      myLike = item.likes.some(function(res){ 
        return res._id === myId;
      });
      return {name: item.name,
              link: item.link,
              likesCount: item.likes.length,
              id: item._id,
              ownerId: item.owner._id,
              myLike: myLike
            };
    });
    

    

    const createCard = (item) =>{
      const card = new Card({link: item.link, name: item.name, likesCount: item.likesCount, ownerId: item.ownerId, id: item.id, myLike: item.myLike}, '#element', 
      {handleCardClick: () => {
        popupCard.open({src: item.link, alt: item.name});
      }},
      {removeButtonHandler: () =>{
        card.toggleRemoveButton(myId);
      }
      },
      {deleteCard: (evt) =>{
        const popupConfirm = new PopupWithConfirm(modalWindowConfirm, {
          formConfirmHandler: () =>{
            api.deleteCard(item.id)
            .then((res) => {
              card.removeCard(evt);
              console.log(res);
              popupConfirm.close();
            })
            .catch((err) =>{
              console.log(err);
            });
          }
        });
        popupConfirm.setEventListeners();
        popupConfirm.open();
      }

      },
      {likeCard: (evt) =>{
        if(item.myLike){
          api.deleteLike(item.id)
          .then((res) =>{
            card.likeCounter(evt, res);
            card.toggleClass(evt);
            item.myLike = false;
          })
          .catch((err) =>{
            console.log(err);
          });
        } else{
          api.putLike(item.id)
          .then((res) =>{
            card.likeCounter(evt, res);
            card.toggleClass(evt);
            item.myLike = true;
          })
          .catch((err) =>{
            console.log(err);
          });
        } 
      }});
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    };

    const cardsList = new Section({
      items: initCard,
      renderer: (item) => {
        createCard({name: item.name, link: item.link, likesCount: item.likesCount, ownerId: item.ownerId, id: item.id, myLike: item.myLike});
      },
    },elements);


    cardsList.renderItems();
    const cardsEdit = new PopupWithForm(modalWindowCard, {
      formSubmitHandler: (item) => {
        renderLoading(true, cardSubmitButton);
        api.postCard(item.title, item.url)
        .then((res) => {
          createCard({name: res.name, link: res.link, likesCount: res.likes.length, ownerId: res.owner._id, id: res._id,  myLike: false});
          cardsEdit.close();
        })
        .catch((err) =>{
          console.log(err);
        })
        .finally(()=>{
          renderLoading(false, cardSubmitButton);
        });
      }
    });


    cardsEdit.setEventListeners();
    cardsButton.addEventListener('click', function (){
      placeValidation.disableButton(cardSubmitButton);
      cardsEdit.open();
    });

    

  })
  .catch((err) =>{
    console.log(err);
  });

})
.catch((err) =>{
  console.log(err);
});

const popupCard = new PopupWithImage(modalWindowImage);
popupCard.setEventListeners();

//Добавление карточки через форму
const avatarEdit = new PopupWithForm(modalWindowAvatar, {
  formSubmitHandler: (item) => {
    renderLoading(true, avatarSubmitButton);
    api.patchMyAvatar(item.url).then((res)=>{
      user.setUserAvatar({avatarInput: res.avatar});
      avatarEdit.close();
    })
    .catch((err) =>{
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, avatarSubmitButton);
    });
  }
});
avatarEdit.setEventListeners();

const profileEdit = new PopupWithForm(modalWindowProfile, {
  formSubmitHandler: (item) => {
    renderLoading(true, profileEditSave);
    api.patchMyInfo(item.name, item.job).then((res)=> {
      user.setUserInfo({nameInput: res.name, jobInput: res.about});
      profileEdit.close();
    })
    .catch((err) =>{
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, profileEditSave);
    });
  }
});

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



avatarButton.addEventListener('click', function(){
  avatarEdit.open();
  avatarValidation.disableButton(avatarSubmitButton);
})






