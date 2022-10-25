import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService{

  constructor(private dialog: MatDialog) { }
  openDialog(dialogParameters:Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: dialogParameters.opt?.width,
      height: dialogParameters.opt?.height,
      position:dialogParameters.opt?.position,
      data: dialogParameters.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == dialogParameters.data)
        dialogParameters.afterClosed();
      
    });
  }
}
export class DialogParameters {
  componentType: ComponentType<any>;
  data: any;
  afterClosed: () => void;
  opt?: Partial<DialogOpt> = new DialogOpt();
}
export class DialogOpt {
  width?: string = "250px";
  height?: string = "250px";
  position?:DialogPosition;
}