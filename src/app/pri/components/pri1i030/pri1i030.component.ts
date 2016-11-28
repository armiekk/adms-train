import { Component, OnInit } from '@angular/core';
import { Pri1i030Service } from '../../services/pri1i030/pri1i030.service';

@Component({
  selector: 'app-pri1i030',
  templateUrl: './pri1i030.component.html',
  styleUrls: ['./pri1i030.component.css'],
  providers: [Pri1i030Service]
})
export class Pri1i030Component implements OnInit {

  constructor(private pri1i030Service: Pri1i030Service) { }

  ngOnInit() {
  }

}
