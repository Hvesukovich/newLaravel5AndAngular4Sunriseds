import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
    selector: 'app-admin-panel-projects',
    templateUrl: './admin-panel-projects.component.html',
    styleUrls: ['./admin-panel-projects.component.scss']
})
export class AdminPanelProjectsComponent implements OnInit {
    public projectActive;
    public keyActive;

    public projectMembers = [];//Employees participating in the project
    public employees = [];//List of employees not participating in the project

    public technologiesMembers = []; // Technologies used in the project
    public technologies = []; // Technologies not used in the project

    public textDropDownListTechnologies = 'Click for select technology';
    public textDropDownListEmployees = 'Click for select employees';

    constructor(private storageService: StorageService) {}

    ngOnInit() {}
    
    public addProject() {
        this.projectActive = [];
        let id: number;
        if (this.storageService.projectsClone.length) {
            id = parseInt(this.storageService.projectsClone[this.storageService.projectsClone.length - 1].id) + 1;
        } else {
            id = 1;
        }
        this.projectActive = {
            id: id,
            name: '',
            description: '',
            text: '',
            images: [],
            employees: [],
            technologies: []
        };
        this.editingProject(this.projectActive, this.storageService.projectsClone.length);
    }

    public editingProject(project, i) {
        this.keyActive = i;
        this.projectActive = JSON.parse(JSON.stringify(project));

        this.createEmployeeArrays(project);
        this.createTechnologiesArrays(project);
    }

    private createEmployeeArrays(project) {
        this.employees = [];
        this.projectMembers = [];
        for (const employee of this.storageService.team) {
            let notProject = true;
            let description_for_project = '';
            for (const employeeProject of project.employees) {
                if (employee.id === employeeProject.id) {
                    this.projectMembers.push({
                        id: employee.id,
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        sity: employee.sity,
                        image: employee.image,
                        position: employee.position,
                        technologies: employee.technologies,
                        description_for_project: employeeProject.description
                    });
                    notProject = false;
                }
            }
            if (notProject === true) {
                this.employees.push({
                    id: employee.id,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    sity: employee.sity,
                    image: employee.image,
                    position: employee.position,
                    technologies: employee.technologies,
                    description_for_project: description_for_project
                });
            }
        }
    }

    private createTechnologiesArrays(project) {
        this.technologies = [];
        this.technologiesMembers = [];

        for (const specialization of this.storageService.technologies) {
            let notProject = true;
            for (const technologyProject of project.technologies) {
                if (specialization.id === technologyProject.id) {
                    this.technologiesMembers.push(specialization);
                    notProject = false;
                }
            }
            if (notProject === true) {
                this.technologies.push(specialization);
            }
        }
    }

    public delProject(key) {
        this.storageService.projectsClone.splice(key, 1);
        this.storageService.projects = JSON.parse(JSON.stringify(this.storageService.projectsClone));
        this.storageService.postSaveEditJSON('projects', this.storageService.projects);
    }

    public undoModalWindows() {
        this.storageService.projectsClone = JSON.parse(JSON.stringify(this.storageService.projects));
    }

    //I delete an employee from the this.projectMembers and add to the project this.employees
    public delEmployee(employee, key) {
        this.projectMembers.splice(key, 1);
        employee.description_for_project = '';
        this.employees.push(employee);
    }

    // I'm adding an employee from the this.projectMembers and delete it from the this.employees
    public addEmployeeProject(employee, key) {
        this.employees.splice(key, 1);
        this.projectMembers.push(employee);
    }

    public textDropDownListNamesEmployees() {
        if (this.textDropDownListEmployees === 'Click for select employees') {
            this.textDropDownListEmployees = 'Hide employees';
        } else if (this.textDropDownListEmployees === 'Hide employees') {
            this.textDropDownListEmployees = 'Click for select employees';
        }
    }

    public delTechnology(technology, key) {
        this.technologiesMembers.splice(key, 1);
        technology.description_for_project = '';
        this.technologies.push(technology);
    }

    public addTechnologyProject(technology, key) {
        this.technologies.splice(key, 1);
        this.technologiesMembers.push(technology);
    }

    public textDropDownListNamesTechnologies() {
        if (this.textDropDownListTechnologies === 'Click for select technology') {
            this.textDropDownListTechnologies = 'Hide technology';
        } else if (this.textDropDownListTechnologies === 'Hide technology') {
            this.textDropDownListTechnologies = 'Click for select technology';
        }
    }

    public saveChanges() {
        let mass = [];
        for (const employee of this.projectMembers) {
            mass.push({
                id: employee.id,
                description: employee.description_for_project
            });
        }
        this.projectActive.employees = mass;
        mass = [];
        for (const technology of this.technologiesMembers) {
            mass.push({
                "id": technology.id
            });
        }
        this.projectActive.technologies = mass;
        this.storageService.projectsClone.splice(this.keyActive, 1, this.projectActive);
        this.storageService.projects = JSON.parse(JSON.stringify(this.storageService.projectsClone));

        this.storageService.postSaveEditJSON('projects', this.storageService.projects);
    }

}
