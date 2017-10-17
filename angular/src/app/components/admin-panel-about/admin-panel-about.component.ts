import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-admin-panel-about',
    templateUrl: './admin-panel-about.component.html',
    styleUrls: ['./admin-panel-about.component.scss']
})
export class AdminPanelAboutComponent implements OnInit {
    public delImages = [];

    constructor(
        private storageService: StorageService,
        private domSanitizer: DomSanitizer
    ) {}

    ngOnInit() {}

    public delImg(about, img, key) {
        // Формирую массив с удалёнными изображениями
        if (!img.file) {
            this.delImages.push({
                src: img.src
            })
        }
        about.images.splice(key, 1);
    }

    public addImage(event, about) {
        const file = event.target.files[0];
        about.images.push(
            {
                file: file,
                name: file.name,
                src: this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
            }
        );
    }

    public cancelChanges() {
        this.storageService.aboutClone = JSON.parse(JSON.stringify(this.storageService.about));
    }

    public saveChanges() {
        this.storageService.saveAbout(this.delImages);
    }

}
