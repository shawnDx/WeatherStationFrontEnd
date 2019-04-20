import { Component, OnInit, Input } from '@angular/core';
import { Card } from './card.model'

@Component({
  selector: 'app-cardtemplate',
  templateUrl: './cardtemplate.component.html',
  styleUrls: ['./cardtemplate.component.scss']
})
export class CardtemplateComponent implements OnInit {

  @Input('card') card: Card;
  constructor() { }

  ngOnInit() {
  }

}
