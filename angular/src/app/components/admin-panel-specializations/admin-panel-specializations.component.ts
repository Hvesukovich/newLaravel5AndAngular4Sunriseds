import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-admin-panel-specializations',
    templateUrl: './admin-panel-specializations.component.html',
    styleUrls: ['./admin-panel-specializations.component.scss']
})
export class AdminPanelSpecializationsComponent implements OnInit {
    public technologyActive;
    public keyActive;
    public file;

    constructor(
        private storageService: StorageService,
        public domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {}

    public choiceLogo(bool){
        this.technologyActive.ico_or_img = bool;
    }

    public getFileName(event) {
        this.file = event.target.files[0];
        this.technologyActive.img = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));
    }

    public addTechnology() {
        this.technologyActive = [];

        this.technologyActive = {
            name: '',
            ico: '',
            color: '',
            img: 'http://sunrise.loc/images/technologies/holder_technology.png',
            ico_or_img: 1,
            display: false
        };
        this.editingTechnology(this.technologyActive, null);
    }

    public editingTechnology(technology, i) {
        this.keyActive = i;
        this.technologyActive = JSON.parse(JSON.stringify(technology));
    }

    public delTechnology(id, key) {
        this.storageService.delTechnology(id, key);
    }

    public undoModalWindows() {
        this.storageService.technologiesClone = JSON.parse(JSON.stringify(this.storageService.technologies));
    }

    public saveChanges() {
        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("data", JSON.stringify(this.technologyActive));
        this.storageService.saveEditTechnology(formData, this.keyActive);
    }

}