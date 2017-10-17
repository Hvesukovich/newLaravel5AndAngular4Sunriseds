import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelProjectsComponent } from './admin-panel-projects.component';

describe('AdminPanelProjectsComponent', () => {
  let component: AdminPanelProjectsComponent;
  let fixture: ComponentFixture<AdminPanelProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
