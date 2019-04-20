import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageEvenComponent } from './package-even.component';

describe('PackageEvenComponent', () => {
  let component: PackageEvenComponent;
  let fixture: ComponentFixture<PackageEvenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageEvenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageEvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
