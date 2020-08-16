import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCriteriaComponent } from './user-criteria.component';

describe('UserCriteriaComponent', () => {
  let component: UserCriteriaComponent;
  let fixture: ComponentFixture<UserCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
