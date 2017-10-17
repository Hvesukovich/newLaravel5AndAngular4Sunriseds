import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelSpecializationsComponent } from './admin-panel-specializations.component';

describe('AdminPanelSpecializationsComponent', () => {
  let component: AdminPanelSpecializationsComponent;
  let fixture: ComponentFixture<AdminPanelSpecializationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelSpecializationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelSpecializationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
