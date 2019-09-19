import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineSessionDetailComponent } from './offline-session-detail.component';

describe('OfflineSessionDetailComponent', () => {
  let component: OfflineSessionDetailComponent;
  let fixture: ComponentFixture<OfflineSessionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineSessionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineSessionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
