import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public userName:string = 'sergei@gmail.ru';
    public userPassword:string = '123';


    constructor(private usersService:UsersService) {
    }

    ngOnInit() {
    }

    public SignIn(userName, userPassword) {
        this.usersService.getUsers(userName, userPassword);
        this.userPassword = null;
    }



}
