import {NgModule} from '@angular/core';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {AdminPanelTeamComponent} from './components/admin-panel-team/admin-panel-team.component';
import {AdminPanelSpecializationsComponent} from './components/admin-panel-specializations/admin-panel-specializations.component';
import {AdminPanelProjectsComponent} from './components/admin-panel-projects/admin-panel-projects.component';
import {AdminPanelContactsComponent} from './components/admin-panel-contacts/admin-panel-contacts.component';
import {AdminPanelAboutComponent} from './components/admin-panel-about/admin-panel-about.component';

const ROUTES = [
    {path: '', component: AdminPanelComponent, children: [
        {path: 'team', component: AdminPanelTeamComponent},
        {path: 'specializations', component: AdminPanelSpecializationsComponent},
        {path: 'projects', component: AdminPanelProjectsComponent},
        {path: 'contacts', component: AdminPanelContactsComponent},
        {path: 'about', component: AdminPanelAboutComponent}
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
    providers: []
})
export class AdminRoutingModule {
}


