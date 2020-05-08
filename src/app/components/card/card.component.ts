import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input('TotalConfirmed')
  totalConfirmed;
  @Input('TotalDeaths')
  totalDeaths;
  @Input('TotalRecovered')
  totalRecovered;
  constructor() {}
}
