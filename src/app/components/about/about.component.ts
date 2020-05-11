import { Component } from '@angular/core';
import { preventionsImport, symptomsImport } from '../../helper';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  preventions = [...preventionsImport];
  symptoms = [...symptomsImport];
}
