import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePresenterComponent } from './profile-presenter.component';

describe('ProfilePresenterComponent', () => {
  let component: ProfilePresenterComponent;
  let fixture: ComponentFixture<ProfilePresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePresenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
