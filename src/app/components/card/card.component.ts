import { Component, Input } from '@angular/core';
import { IGlobal } from '../../global';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() dataGlobal: IGlobal;

  constructor() {}
}
