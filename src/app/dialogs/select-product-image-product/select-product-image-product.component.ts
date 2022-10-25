import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductsService } from 'src/app/services/common/models/products.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any;

@Component({
  selector: 'app-select-product-image-product',
  templateUrl: './select-product-image-product.component.html',
  styleUrls: ['./select-product-image-product.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductsService,
    private spinner: NgxSpinnerService,
    private dialogService:DialogService
    ) {
    super(dialogRef)
   }
   
   @Output() options: Partial<FileUploadOptions> ={
    accept: ".png, .jpg, .jpeg, .gif",
    controller:"products",
    isAdminPage:true,
    action:"upload",
    explanation: "Ürüne resim ekleyiniz...",
    queryString: `id=${this.data}`
   }


   images: List_Product_Image[];
  async ngOnInit()  {
    this.spinner.show(SpinnerType.Atom);
    this.images = await this.productService.readImages(this.data as string, () =>this.spinner.hide(SpinnerType.Atom));
  
  }
   async deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.Atom)
        await this.productService.deleteImage(this.data as string, imageId,() =>{
           this.spinner.hide(SpinnerType.Atom) 
          var card = $(event.srcElement).parent().parent();
          card.fadeOut(500);
        });
      }
    })
   
  }
}
export enum SelectProductImageState
{
  Close
}