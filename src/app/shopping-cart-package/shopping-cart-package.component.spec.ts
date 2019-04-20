import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartPackageComponent } from './shopping-cart-package.component';

describe('ShoppingCartPackageComponent', () => {
  let component: ShoppingCartPackageComponent;
  let fixture: ComponentFixture<ShoppingCartPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
