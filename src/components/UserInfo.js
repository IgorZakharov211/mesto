export default class UserInfo{
  constructor({profileName, profileJob}){
    this._profileName = profileName;
    this._profileJob = profileJob;
  }

  getUserInfo(){
    return {name: this._profileName.textContent,
            job: this._profileJob.textContent}
  }
  setUserInfo({nameInput, jobInput}){
    this._profileName.textContent = nameInput;
    this._profileJob.textContent = jobInput;
  }
}