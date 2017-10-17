import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelTeamComponent } from './admin-panel-team.component';

describe('AdminPanelTeamComponent', () => {
  let component: AdminPanelTeamComponent;
  let fixture: ComponentFixture<AdminPanelTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
