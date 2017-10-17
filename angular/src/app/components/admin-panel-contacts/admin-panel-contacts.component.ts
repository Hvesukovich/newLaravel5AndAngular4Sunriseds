import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
    selector: 'app-admin-panel-contacts',
    templateUrl: './admin-panel-contacts.component.html',
    styleUrls: ['./admin-panel-contacts.component.scss']
})
export class AdminPanelContactsComponent implements OnInit {
    public contactActive;
    public keyActive;

    constructor( private storageService: StorageService ) {}

    ngOnInit() {}

    public addContact() {
        this.contactActive = [];

        this.contactActive ={
            country: '',
            longitude: '',
            latitude: '',
            address: '',
            emails: []
        };
        this.editingContact(this.contactActive, null);
    }

    public editingContact(contact, i) {
        this.keyActive = i;
        this.contactActive = JSON.parse(JSON.stringify(contact));
    }

    public delContact(id, key) {
        this.storageService.delContact(id, key);
    }
    
    public undoModalWindows() {
        this.storageService.contactsClone = JSON.parse(JSON.stringify(this.storageService.contacts));
    }

    public delEmail(emails, i) {
        emails.splice(i, 1);
    }
    
    public addEmail(emails) {
        emails.push({
            email: ''
        });
    }

    public saveChanges() {
        let emails = '';
        for (const keyEmail in this.contactActive.emails) {
            if (((parseInt(keyEmail) + 1) === this.contactActive.emails.length) &&
                (this.contactActive.emails[keyEmail].email !== '')) {
                emails += this.contactActive.emails[keyEmail].email;
            }
            else if ((parseInt(keyEmail) < this.contactActive.emails.length) &&
                (this.contactActive.emails[keyEmail].email !== '')) {
                emails += this.contactActive.emails[keyEmail].email + ';';
            }
        }
        const contact = JSON.parse(JSON.stringify(this.contactActive));
        contact.emails = emails;
        this.storageService.saveEditContact(contact, this.keyActive);
    }

}
