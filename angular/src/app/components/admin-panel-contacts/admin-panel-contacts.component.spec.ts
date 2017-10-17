import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelContactsComponent } from './admin-panel-contacts.component';

describe('AdminPanelContactsComponent', () => {
  let component: AdminPanelContactsComponent;
  let fixture: ComponentFixture<AdminPanelContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
