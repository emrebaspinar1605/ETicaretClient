import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) {   }
  message(message:string,title: string, ToastrOptions: Partial<ToastrOptions>)
  {
    this.toastr[ToastrOptions.messageType](message, title,{positionClass: ToastrOptions.position}); 
  }
}
export enum ToastrMessageType
{
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}
export class ToastrOptions {
  messageType: ToastrMessageType;
  position: ToastrPosition;
}
export enum ToastrPosition {
  TopRight = "toast-top-right",
  TopCenter = "toast-top-center",
  TopLeft = "toast-top-left",
  BottomRight = "toast-bottom-right",
  BottomCenter = "toast-bottom-center",
  BottomLeft = "toast-bottom-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width"
}
