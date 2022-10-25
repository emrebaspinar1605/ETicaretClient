import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePageEvent,  } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Products } from 'src/app/contracts/list_products';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-product/select-product-image-product.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductsService } from 'src/app/services/common/models/products.service';

declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  
  constructor(
    spinner: NgxSpinnerService,
    private productsService : ProductsService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner);
  }
  
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate','photos','edit','delete'];
  dataSource : MatTableDataSource<List_Products> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  async getProducts(){
    this.showSpinner(SpinnerType.Pacman);
   
    const allProducts: { totalCount : number; products: List_Products[] } = await this.productsService.read(this.paginator ? this.paginator.pageIndex : 0,this.paginator ? this.paginator.pageSize : 5 ,() => this.hideSpinner(SpinnerType.Pacman),errorMessage => this.alertifyService.message(errorMessage,{
       dismissOthers: true,
       position: Position.TopLeft,
       messageType: MessageType.Error
     }))
     
     this.dataSource = new MatTableDataSource<List_Products>(allProducts.products);
     this.paginator.length = allProducts.totalCount;
   
  }
  addProductImages(id:string)
  {
    this.dialogService.openDialog({
      componentType:SelectProductImageDialogComponent,
      data: id,
      opt:{
        width:"1400px"
      }
    });
  }
  async pageChanged(){
    await this.getProducts();

  }
  async ngOnInit() {
    await this.getProducts();
    }


  

 

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
