import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelAboutComponent } from './admin-panel-about.component';

describe('AdminPanelAboutComponent', () => {
  let component: AdminPanelAboutComponent;
  let fixture: ComponentFixture<AdminPanelAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
