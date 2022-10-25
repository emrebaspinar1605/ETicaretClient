import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {

  constructor(private spinner: NgxSpinnerService) {  }
  
  showSpinner(spinnerType:SpinnerType){
    this.spinner.show(spinnerType);

    setTimeout(() =>  this.hideSpinner(spinnerType),2000);
  }
   hideSpinner(spinnerType: SpinnerType){
    this.spinner.hide(spinnerType);
  }
}
export enum SpinnerType{
  Pacman = "s3",
  Atom = "s2",
  Clock = "s1"
}
