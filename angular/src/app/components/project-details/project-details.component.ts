import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {Subscription} from 'rxjs/Rx';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
    private subscription: Subscription;
    public activeProject;
    public employeeProject = [];

    constructor(
        private storageService: StorageService,
        private activatedRoute: ActivatedRoute,
        private router:Router
    ) {
        this.subscription = activatedRoute.params.subscribe(params => {
            this.filter(params['id']);
        });
    }

    private filter(id) {
        this.storageService.projectsObservable.subscribe((data) => {
            this.activeProject = data.find((project) => project.id === id);
            this.createEmployeeArrays();
        });
    }

    private createEmployeeArrays() {
        this.storageService.teamObservable.subscribe((data) => {
           for (let activeEmployee of this.activeProject.employees) {
               for (let employee of data) {
                   if (activeEmployee.id === employee.id) {
                       this.employeeProject.push(employee);
                       break;
                   }
               }
           }
        });
    }

    ngOnInit() {
    }

}
