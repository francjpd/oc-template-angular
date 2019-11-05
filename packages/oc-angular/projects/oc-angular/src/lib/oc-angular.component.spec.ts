import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcAngularComponent } from './oc-angular.component';

describe('OcAngularComponent', () => {
  let component: OcAngularComponent;
  let fixture: ComponentFixture<OcAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
