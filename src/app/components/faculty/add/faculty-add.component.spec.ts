import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAddComponent } from './faculty-add.component';

describe('FacultyAddComponent', () => {
  let component: FacultyAddComponent;
  let fixture: ComponentFixture<FacultyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
