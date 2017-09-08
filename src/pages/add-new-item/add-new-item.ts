import { Component, Input, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController  } from 'ionic-angular';

/**
 * Generated class for the AddNewItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-new-item',
  templateUrl: 'add-new-item.html',
})
export class AddNewItemPage {

  @ViewChild('input') myInput ;

  private charactersLeft: number = 27;
  private inputValue: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController) {

  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.myInput.setFocus();
    },150);
  }

  returnNewItems(){
    if(this.inputValue.length >= 4 && this.inputValue.length < 28) {
      let data = {text: this.inputValue, inList: true};
      this.viewCtrl.dismiss(data);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: 'Field name is too short. Minimum 4 characters.',
        buttons: ['OK']
      });
      alert.present();
    }
  }
  calulateChars(){
    this.charactersLeft = 27 - this.inputValue.length;
  }
  goBack(){
    this.viewCtrl.dismiss();
  }
}
