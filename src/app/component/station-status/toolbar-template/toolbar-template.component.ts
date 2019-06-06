import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../service/api.service';


@Component({
  selector: 'app-toolbar-template',
  templateUrl: './toolbar-template.component.html',
  styleUrls: ['./toolbar-template.component.scss']
})
export class ToolbarTemplateComponent implements OnInit {
  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }
}
