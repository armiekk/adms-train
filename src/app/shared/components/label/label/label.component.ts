import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  
  private defaultColor: string = 'red';
  @Input() valid: boolean = false;
  @Input() required: boolean = false;
  @Input() value: string;

  constructor() { }

  ngOnInit() {
  }

}
