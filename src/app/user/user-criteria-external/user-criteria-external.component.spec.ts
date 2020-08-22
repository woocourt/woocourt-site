import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCriteriaExternalComponent } from './user-criteria-external.component';

describe('UserCriteriaExternalComponent', () => {
  let component: UserCriteriaExternalComponent;
  let fixture: ComponentFixture<UserCriteriaExternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCriteriaExternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCriteriaExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
