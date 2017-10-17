import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

}
