import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { AddNewItemPage } from '../add-new-item/add-new-item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private isListMode: boolean = true;
  private isEditingMode: boolean = false;
  private cdr: any;
  private groceryList: any = [];
  private editList: any = [
    {
      id: 1,
      text: "Milk 1l",
      inList: true
    },{
      id: 2,
      text: "Eggs Medium 12 pack",
      inList: true
    },{
      id: 3,
      text: "Fresh Basil",
      inList: true
    },{
      id: 4,
      text: "Wholegrain Brea 1 pkg",
      inList: true
    },{
      id: 5,
      text: "Ground Coffee 200g",
      inList: true
    },{
      id: 6,
      text: "Red Wine",
      inList: true
    },{
      id: 7,
      text: "Mozzarella Cheese 150g",
      inList: true
    },{
      id: 8,
      text: "Orange Juice 1l",
      inList: true
    },{
      id: 9,
      text: "Tomatoes",
      inList: true
    },];
  private itemsList: any = [];

  constructor(public navCtrl: NavController,
              cdr: ChangeDetectorRef,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) {
    this.cdr = cdr;
    if(localStorage.getItem("userList")){
      this.editList = JSON.parse(localStorage.getItem("userList"));
    }
    this.initItemsList();
  }

  ionViewDidLoad(){
    this.setSwipedDirections();
  }


  initItemsList(){
    this.itemsList = this.editList;
    this.groceryList = [];
    for(let i = 0; i < this.itemsList.length; i++){
      if(!this.itemsList[i].inList){
        this.groceryList.push(this.itemsList[i]);
      }
    }
  }
  setSwipedDirections(){
    for(let i = 0; i < this.itemsList.length; i++){
      if(this.itemsList[i].inList){
        this.swipe('right', this.itemsList[i].id);
      } else {
        this.swipe('left', this.itemsList[i].id);
      }
    }
  }

  changeTab(stringItem) {
    if(stringItem == 'list') {
      this.isListMode = true;
      this.setSwipedDirections();
      this.cdr.detectChanges();
    } else {
      this.isListMode = false ;
    }
    this.saveToListToLocalStorage();
  }

  changeToEditingMode(){
    this.isListMode = true;
    this.isEditingMode = true;
  }

  changeToListMode(){
    this.isListMode = true;
    this.isEditingMode = false;
    this.saveToListToLocalStorage();
    this.initItemsList();
    this.setSwipedDirections();
  }

  openSettings(){
    let alert = this.alertCtrl.create({
      title: 'Sorry!',
      subTitle: 'This part of app is unavailable now.',
      buttons: ['OK']
    });
    alert.present();
  }

  openAddNewItemModal(){
    let modal = this.modalCtrl.create(AddNewItemPage);
    modal.onDidDismiss(data => {
      if(data) {
        data.id = Math.max.apply(Math,this.editList.map(function(obj){return obj.id;})) + 1;
        this.addToList(data, this.editList);
        this.saveToListToLocalStorage();
      }
    });
    modal.present();
  }

  addToList(item, list) {
    let obj = list.find(function(obj){return obj.id == item.id});
    if( !obj ) {
      list.push( item );
    }
    this.cdr.detectChanges();
  }

  removeFromList(item, list) {
    let obj = list.find(function(obj){return obj.id == item.id});
    if( obj ) {
      let index = list.findIndex(function(obj){return obj.id == item.id});
      list.splice(index, 1);
    }
    this.cdr.detectChanges();
  }

  onDrag(ev, item) {
    let percent = ev.getSlidingPercent();
    if (percent > 0.8) {
      // right side overscroll
      item.inList = true;
      this.removeFromList(item, this.groceryList);
    }
    if(percent < 0 ) {
      // left side overscroll
      item.inList = false;
      this.addToList(item, this.groceryList);
    }
  }

  onDragCartList(ev, item) {
    let percent = ev.getSlidingPercent();
    if (percent > 0.8) {
      // right side overscroll
      item.inList = true;
      this.removeFromList(item, this.groceryList);
    }
  }

  saveToListToLocalStorage(){
    localStorage.setItem("userList", JSON.stringify(this.editList));
  }

  public swipe(diraction, itemId) {
    // reproduce the slide on the click
    let itemSlide = document.getElementById(itemId +'-slide') ;
    let item = document.getElementById(itemId +'-item') ;
    itemSlide.classList.add("active-sliding");
    itemSlide.classList.add("active-slide");
    if(diraction == 'right') {
      itemSlide.classList.add("active-options-right");
      item.style.transform = "translate3d(-58px, 0px, 0px)";
    } else {
      itemSlide.classList.add("active-options-left");
      item.style.transform = "translate3d(58px, 0px, 0px)";
    }
  }
}
