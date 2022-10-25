import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductImageProductComponent } from './select-product-image-product.component';

describe('SelectProductImageProductComponent', () => {
  let component: SelectProductImageProductComponent;
  let fixture: ComponentFixture<SelectProductImageProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProductImageProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProductImageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
