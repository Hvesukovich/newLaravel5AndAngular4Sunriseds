import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class RequestsService {
    private adress = 'http://sunrisapi/';//Local страый адресс для теста
    // private adress = 'http://sunsite.datadizz.com/storage/';//Prodaction

    constructor(private httpClient:HttpClient) {
    }

    public getAllTechnologies() {
        return this.httpClient.get('http://sunrise.loc/get-all-technologies');
    }

    public saveEditTechnology(data) {
        const url:string = 'http://sunrise.loc/api/save-technology';
        return this.httpClient.post(url, data);
    }

    public delTechnologyById(id) {
        const url:string = 'http://sunrise.loc/api/delete-technology';
        return this.httpClient.post(url, id);
    }

    public getAllContacts() {
        const url:string = 'http://sunrise.loc/get-all-contacts';
        return this.httpClient.get(url);
    }

    public saveEditContact(data) {
        const url:string = 'http://sunrise.loc/api/save-contact';
        return this.httpClient.post(url, data);
    }

    public delContactById(id) {
        const url:string = 'http://sunrise.loc/api/delete-contact';
        return this.httpClient.post(url, id);
    }

    public getAbout() {
        const url:string = 'http://sunrise.loc/get-about';
        return this.httpClient.get(url);
    }

    public saveAbout(data) {
        const url:string = 'http://sunrise.loc/api/save-about';
        return this.httpClient.post(url, data);
    }

    public getTeam() {
        const url:string = 'http://sunrise.loc/get-team';
        return this.httpClient.get(url);
    }

    public saveEditEmployee(data) {
        const url:string = 'http://sunrise.loc/api/save-employee';
        return this.httpClient.post(url, data);
    }








    public getUsersJson() {
        return this.httpClient.get(this.adress + '?type=users&action=get');
    }

    public getProjectsJson() {
        return this.httpClient.get(this.adress + '?type=projects&action=get');
    }
    
    public postSaveEditJSON(type, data) {
        const url:string = this.adress;
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        this.httpClient.post(url, {type: type, data: data}, {headers})
            .subscribe(
                (data) => {
                    console.log('server returned data:');
                    console.log(data);
                },
                (err) => {
                    console.log('server error:');
                    console.log(err);
                }
            );
    }

}
