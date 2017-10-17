import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    constructor(private storageService: StorageService) {
    }

    ngOnInit() {
    }

}
