export default class Section{
  constructor({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  rendererItems(){
    this._rendererItems.forEach(item =>{
      this._renderer(item);
    });
  };
  
  addItem(element){
    this._container.append(element);
  };
}