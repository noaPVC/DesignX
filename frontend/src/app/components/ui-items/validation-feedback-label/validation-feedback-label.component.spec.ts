import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationFeedbackLabelComponent } from './validation-feedback-label.component';

describe('ValidationFeedbackLabelComponent', () => {
  let component: ValidationFeedbackLabelComponent;
  let fixture: ComponentFixture<ValidationFeedbackLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationFeedbackLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationFeedbackLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
