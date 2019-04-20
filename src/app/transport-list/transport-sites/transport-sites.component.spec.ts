import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportSitesComponent } from './transport-sites.component';

describe('TransportSitesComponent', () => {
  let component: TransportSitesComponent;
  let fixture: ComponentFixture<TransportSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
