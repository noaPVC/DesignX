import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentItemComponent } from './recent-item.component';

describe('RecentItemComponent', () => {
  let component: RecentItemComponent;
  let fixture: ComponentFixture<RecentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
