import {Injectable} from '@angular/core';
import {RequestsService} from './requests.service';
import {Router} from '@angular/router';

@Injectable()
export class UsersService {
    public user = null;

    constructor(private requestsService:RequestsService, private router:Router) {
    }

    public getUsers(userName, userPassword) {
        this.requestsService.getUsersJson().subscribe((data:[any]) => {
            if (data && data.length) {
                this.user = data.find(((user:any) => {
                    return userName === user.email && userPassword === user.password;
                }));
                if (this.user) {
                    this.router.navigate(['/admin']);
                    this.user.password = null;
                    console.log(this.user);
                }
            }
        });
    }

}
