export default class UserInfo{
  constructor({profileName, profileJob, profileAvatar}){
    this._profileName = profileName;
    this._profileJob = profileJob;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo(){
    return {name: this._profileName.textContent,
            job: this._profileJob.textContent}
  }
  setUserInfo({nameInput, jobInput}){
    this._profileName.textContent = nameInput;
    this._profileJob.textContent = jobInput;
  }
  setUserAvatar({avatarInput}){
    this._profileAvatar.src = avatarInput;
  }
}