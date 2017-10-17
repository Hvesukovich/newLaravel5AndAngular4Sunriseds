import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {Subscription} from 'rxjs/Rx';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-team-details',
    templateUrl: './team-details.component.html',
    styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {
    private subscription: Subscription;
    public activeEmployee = [];

    constructor(
        private storageService: StorageService,
        private activatedRoute: ActivatedRoute,
        private router:Router
    ) {
        this.subscription = activatedRoute.params.subscribe(params => {
            this.filter(params['id']);
        });
    }

    ngOnInit() {
    }

    private filter(id) {
        this.storageService.teamObservable.subscribe((data) => {
            this.activeEmployee = data.find((item) => item.id === id);
        });
    }

}
