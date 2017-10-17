import {Injectable} from '@angular/core';
import {RequestsService} from './requests.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class StorageService {
    public teamObservable: Observable<any>;
    public technologiesObservable: Observable<any>;
    public projectsObservable: Observable<any>;
    public contactsObservable: Observable<any>;
    public aboutObservable: Observable<any>;
    public team = [];
    public teamClone = [];
    public technologies = [];
    public technologiesClone = [];
    public projects = [];
    public projectsClone = [];
    public contacts = [];
    public contactsClone = [];
    public about = [];
    public aboutClone = [];

    constructor(private requestsService: RequestsService) {
        this.getTeam();
        this.getTechnologies();
        this.getProjects();
        this.getContacts();
        this.getAbout();
    }

    public getTechnologies() {
        this.technologiesObservable = this.requestsService.getAllTechnologies();
        this.technologiesObservable.subscribe((data: any) => {
            this.technologies = data;
            this.technologiesClone = JSON.parse(JSON.stringify(this.technologies));
        });
    }

    public saveEditTechnology(data, key) {
        return new Promise((resolve, reject) => {
            this.requestsService.saveEditTechnology(data).subscribe((resolveData: Response) => {
                if (resolveData) {
                    if (key !== null) {
                        this.technologiesClone.splice(key, 1, resolveData);
                        this.technologies = JSON.parse(JSON.stringify(this.technologiesClone));
                    }
                    else if (key === null) {
                        this.technologiesClone.push(resolveData);
                        this.technologies = JSON.parse(JSON.stringify(this.technologiesClone));
                    }
                }
                else {
                    alert('Error save!');
                }
            }, error => {
                alert('Error save!');
            });
        });
    }

    public delTechnology(id, key) {
        return new Promise((resolve, reject) => {
            this.requestsService.delTechnologyById(id).subscribe((data: Response) => {
                if (data) {
                    this.technologiesClone.splice(key, 1);
                    this.technologies = JSON.parse(JSON.stringify(this.technologiesClone));
                }
                else {
                    alert('Error delete');
                }
            }, error => {
                alert('Error delete');
            });
        });
    }

    public getContacts() {
        this.contactsObservable = this.requestsService.getAllContacts();
        this.contactsObservable.subscribe((data: any) => {
            for (const keyContact in data) {
                this.contacts[keyContact] = data[keyContact];
                const emails = data[keyContact].emails.split(';');
                this.contacts[keyContact].emails = [];
                for (const email of emails) {
                    this.contacts[keyContact].emails.push({email: email});
                }
            }
            this.contactsClone = JSON.parse(JSON.stringify(this.contacts));
        });
    }

    public saveEditContact(contact, key) {
        return new Promise((resolve, reject) => {
            this.requestsService.saveEditContact(contact).subscribe((resolveData: Response) => {
                if (resolveData) {
                    const emails = resolveData['emails'].split(';');
                    resolveData['emails'] = [];
                    for (const email of emails) {
                        resolveData['emails'].push({email: email});
                    }
                    if (key !== null) {
                        this.contactsClone.splice(key, 1, resolveData);
                        this.contacts = JSON.parse(JSON.stringify(this.contactsClone));
                    }
                    else if (key === null) {
                        this.contactsClone.push(resolveData);
                        this.contacts = JSON.parse(JSON.stringify(this.contactsClone));
                    }
                }
                else {
                    alert('Error save!');
                }
            }, error => {
                alert('Error save!');
            });
        });
    }

    public delContact(id, key) {
        return new Promise((resolve, reject) => {
            this.requestsService.delContactById(id).subscribe((data: Response) => {
                if (data) {
                    this.contactsClone.splice(key, 1);
                    this.contacts = JSON.parse(JSON.stringify(this.contactsClone));
                }
                else {
                    alert('Error delete');
                }
            }, error => {
                alert('Error delete');
            });
        });
    }

    public getAbout() {
        this.aboutObservable = this.requestsService.getAbout();
        this.aboutObservable.subscribe((data: any) => {
            if (data.length) {
                for (const keyContact in data) {
                    this.about[keyContact] = data[keyContact];
                    const images = data[keyContact].images.split(';');
                    this.about[keyContact].images = [];
                    for (const image of images) {
                        this.about[keyContact].images.push({src: image});
                    }
                }
            }
            else {
                this.about.push({
                    title: '',
                    description: '',
                    text: '',
                    images: []
                });
            }

            this.aboutClone = JSON.parse(JSON.stringify(this.about));
        });
    }

    public saveAbout(delImages) {
        const data = new FormData();
        for (const about of this.aboutClone) {
            for (const keyImage in about.images) {
                if (about.images[keyImage].file) {
                    data.append('image' + keyImage, about.images[keyImage].file);
                }
            }
        }
        data.append('about', JSON.stringify(this.aboutClone));
        if (delImages.length) {
            data.append('delImages', JSON.stringify(delImages));
        }

        return new Promise((resolve, reject) => {
            this.requestsService.saveAbout(data).subscribe((resolveData: Response) => {
                if (resolveData) {
                    this.about[0] = resolveData;
                    const images = this.about[0].images.split(';');
                    this.about[0].images = [];
                    for (const image of images) {
                        this.about[0].images.push({src: image});
                    }
                    this.aboutClone = JSON.parse(JSON.stringify(this.about));
                }
                else {
                    alert('Error save!');
                }
            }, error => {
                alert('Error save!');
            });
        });
    }

    public getTeam() {
        this.teamObservable = this.requestsService.getTeam();
        this.teamObservable.subscribe((data: any) => {
            if (data.length) {
                for (const keyContact in data) {
                    this.team[keyContact] = data[keyContact];
                    const technologies = data[keyContact].technologies.split(';');
                    const experience = data[keyContact].experience.split(';');
                    this.team[keyContact].technologies = [];
                    for (const key in technologies) {
                        this.team[keyContact].technologies.push({
                            id: Number(technologies[key]),
                            experience: experience[key]
                        });
                    }
                }
            }
            console.log(this.team);
            this.teamClone = JSON.parse(JSON.stringify(this.team));
        });
    }

    public saveEditEmployee(data, key) {
        return new Promise((resolve, reject) => {
            this.requestsService.saveEditEmployee(data).subscribe((resolveData: Response) => {
                if (resolveData) {
                    console.log(resolveData);
                    // if (key !== null) {
                    //     this.technologiesClone.splice(key, 1, resolveData);
                    //     this.technologies = JSON.parse(JSON.stringify(this.technologiesClone));
                    // }
                    // else if (key === null) {
                    //     this.technologiesClone.push(resolveData);
                    //     this.technologies = JSON.parse(JSON.stringify(this.technologiesClone));
                    // }
                }
                else {
                    alert('Error save!');
                }
            }, error => {
                alert('Error save!');
            });
        });
    }











    public getProjects() {
        this.projectsObservable = this.requestsService.getProjectsJson();
        this.projectsObservable.subscribe((data: any) => {
            this.projects = data;
            this.projectsClone = JSON.parse(JSON.stringify(this.projects));
        });
    }
    
    public saveChanges() {
        // this.requestsService.postSaveEditImage();
        this.about = JSON.parse(JSON.stringify(this.aboutClone));
        this.postSaveEditJSON('about', this.about);
    }
    
    public postSaveEditJSON(type, data) {
        this.requestsService.postSaveEditJSON(type, data);
    }
}
