import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderPageComponent } from './preloader-page.component';

describe('PreloaderPageComponent', () => {
  let component: PreloaderPageComponent;
  let fixture: ComponentFixture<PreloaderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloaderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
