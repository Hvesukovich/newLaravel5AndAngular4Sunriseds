import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {DomSanitizer} from '@angular/platform-browser';
import {RequestsService} from '../../services/requests.service';

@Component({
    selector: 'app-admin-panel-team',
    templateUrl: './admin-panel-team.component.html',
    styleUrls: ['./admin-panel-team.component.scss']
})
export class AdminPanelTeamComponent implements OnInit {
    public employeeActive;
    public keyActive;
    public file;

    public technologiesEmployee = []; // Technologies used in the employee
    public technologies = []; // Technologies not used in the employee

    public textDropDownListTechnologies = 'Click for select technology';

    constructor(
        private storageService: StorageService,
        private requestsService: RequestsService,
        public domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {}

    public addEmployee() {
        this.employeeActive = [];
        const employeeActive = {
            firstName: '',
            lastName: '',
            sity: '',
            image: 'http://sunrise.loc/images/team/holder_man.png',
            position: '',
            technologies: []
        };
        this.editingEmployee(employeeActive, null);
    }

    public editingEmployee(employee, i) {
        this.keyActive = i;
        this.employeeActive = JSON.parse(JSON.stringify(employee));
        this.createTechnologiesArrays(employee);
    }

    public createTechnologiesArrays(employee) {
        this.technologies = [];
        this.technologiesEmployee = [];

        for (const technology of this.storageService.technologies) {
            let notEmployee = true;
            for (const employeeTechnology of employee.technologies) {
                if (technology.id === employeeTechnology.id) {
                    for (const employeeTechnology of employee.technologies) {
                        if (employeeTechnology.id === employeeTechnology.id) {
                            this.technologiesEmployee.push({
                                id: technology.id,
                                name: technology.name,
                                ico: technology.ico,
                                color: technology.color,
                                img: technology.img,
                                ico_or_img: technology.ico_or_img,
                                display: technology.display,
                                experience: employeeTechnology.experience
                            });
                            break;
                        }
                    }
                    notEmployee = false;
                }
            }
            if (notEmployee === true) {
                this.technologies.push({
                    id: technology.id,
                    name: technology.name,
                    ico: technology.ico,
                    color: technology.color,
                    img: technology.img,
                    ico_or_img: technology.ico_or_img,
                    display: technology.display,
                    experience: ''
                });
            }
        }
    }

    public delEmployee(key) {
        this.storageService.teamClone.splice(key, 1);
        this.storageService.team = JSON.parse(JSON.stringify(this.storageService.teamClone));
        this.storageService.postSaveEditJSON('team', this.storageService.team);
    }

    public undoModalWindows() {
        this.storageService.teamClone = JSON.parse(JSON.stringify(this.storageService.team));
    }

    public getFileName(event) {
        this.file = event.target.files[0];
        this.employeeActive.image = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));
    }

    public delTechnology(technology, key) {
        this.technologiesEmployee.splice(key, 1);
        technology.experience = '';
        this.technologies.push(technology);
    }

    public addTechnologyProject(technology, key) {
        this.technologies.splice(key, 1);
        this.technologiesEmployee.push(technology);
    }

    public textDropDownListNamesTechnologies() {
        if (this.textDropDownListTechnologies === 'Click for select technology') {
            this.textDropDownListTechnologies = 'Hide technology';
        } else if (this.textDropDownListTechnologies === 'Hide technology') {
            this.textDropDownListTechnologies = 'Click for select technology';
        }
    }
    
    public saveChanges() {
        // let technologies = [];
        // for (const technologyEmployee of this.technologiesEmployee) {
        //     for (const technology of this.storageService.technologies) {
        //         if (technologyEmployee.name === technology.name) {
        //             technologies.push({
        //                 id: technology.id,
        //                 experience: technologyEmployee.experience
        //             });
        //         }
        //     }
        // }
        // this.employeeActive.technologies = technologies;

        // this.storageService.teamClone.splice(this.keyActive, 1, this.employeeActive);
        // this.storageService.team = JSON.parse(JSON.stringify(this.storageService.teamClone));
        //
        // this.storageService.postSaveEditJSON('team', this.storageService.team);

        let technologies = '';
        let experience = '';
        for (const technologyEmployee of this.technologiesEmployee) {
            for (const technology of this.storageService.technologies) {
                if (technologyEmployee.name === technology.name) {
                    technologies += technology.id + ';';
                    experience += technologyEmployee.experience + ';';
                }
            }
        }
        this.employeeActive.technologies = technologies;
        this.employeeActive.experience = experience;
        console.log(this.employeeActive);
        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("data", JSON.stringify(this.employeeActive));
        this.storageService.saveEditEmployee(formData, this.keyActive);
    }

}
