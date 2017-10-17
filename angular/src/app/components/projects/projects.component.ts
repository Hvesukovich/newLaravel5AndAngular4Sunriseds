import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

}
